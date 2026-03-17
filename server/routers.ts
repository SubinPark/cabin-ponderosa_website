import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import { getTestimonials, addTestimonial, deleteTestimonial } from "./db";
import { Resend } from "resend";
import type { TRPCError } from "@trpc/server";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Contact form for guest inquiries
  contact: router({
    submitInquiry: publicProcedure
      .input((data: unknown) => {
        const obj = data as Record<string, unknown>;
        return {
          name: String(obj.name || ''),
          email: String(obj.email || ''),
          phone: String(obj.phone || ''),
          subject: String(obj.subject || ''),
          message: String(obj.message || ''),
        };
      })
      .mutation(async ({ input }) => {
        // Validate required fields
        if (!input.name || !input.email || !input.message) {
          throw new Error('Missing required fields');
        }

        // Send email via Resend
        try {
          const apiKey = process.env.RESEND_API_KEY;
          if (!apiKey) {
            throw new Error('Resend API key not configured');
          }

          const resend = new Resend(apiKey);
          
          await resend.emails.send({
            from: 'noreply@resend.dev',
            to: 'thecabinponderosa@gmail.com',
            subject: `New Inquiry from ${input.name}${input.subject ? ` - ${input.subject}` : ''}`,
            html: `
              <h2>New Cabin Inquiry</h2>
              <p><strong>Name:</strong> ${input.name}</p>
              <p><strong>Email:</strong> ${input.email}</p>
              <p><strong>Phone:</strong> ${input.phone || 'Not provided'}</p>
              ${input.subject ? `<p><strong>Subject:</strong> ${input.subject}</p>` : ''}
              <p><strong>Message:</strong></p>
              <p>${input.message.replace(/\n/g, '<br>')}</p>
            `,
          });
        } catch (error) {
          console.error('Failed to send email:', error);
          throw new Error('Failed to send inquiry email');
        }

        // Also send notification to owner in Manus dashboard
        try {
          await notifyOwner({
            title: `New Inquiry from ${input.name}`,
            content: `
              Email: ${input.email}
              Phone: ${input.phone || 'Not provided'}
              Subject: ${input.subject || 'General Inquiry'}
              
              Message:
              ${input.message}
            `,
          });
        } catch (error) {
          console.error('Failed to send owner notification:', error);
        }

        return {
          success: true,
          message: 'Thank you for your inquiry. We will respond within 24 hours.',
        };
      }),
  }),

  // Testimonials for guest reviews
  testimonials: router({
    list: publicProcedure.query(async () => {
      return await getTestimonials();
    }),
    add: publicProcedure
      .input((data: unknown) => {
        const obj = data as Record<string, unknown>;
        return {
          guestName: String(obj.guestName || ''),
          rating: Number(obj.rating || 5),
          review: String(obj.review || ''),
        };
      })
      .mutation(async ({ input }) => {
        if (!input.guestName || !input.review) {
          throw new Error('Guest name and review are required');
        }

        if (input.rating < 1 || input.rating > 5) {
          throw new Error('Rating must be between 1 and 5');
        }

        return await addTestimonial({
          guestName: input.guestName,
          rating: input.rating,
          review: input.review,
        });
      }),
    delete: publicProcedure
      .input((data: unknown) => {
        const obj = data as Record<string, unknown>;
        return {
          id: Number(obj.id || 0),
        };
      })
      .mutation(async ({ input }) => {
        if (!input.id) {
          throw new Error('Testimonial ID is required');
        }

        return await deleteTestimonial(input.id);
      }),
  }),
});

export type AppRouter = typeof appRouter;
