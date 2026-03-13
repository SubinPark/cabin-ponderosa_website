import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import { getTestimonials } from "./db";

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

        // Send email notification to owner
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
  }),
});

export type AppRouter = typeof appRouter;
