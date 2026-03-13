import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Plus, Trash2, Star } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";

/**
 * Admin Page - Testimonials Management
 * 
 * Restricted to admin users only.
 * Allows adding, editing, and managing guest testimonials.
 */

export default function Admin() {
  const { user, loading } = useAuth();
  const [formData, setFormData] = useState({
    guestName: "",
    rating: 5,
    review: "",
  });

  // Fetch testimonials
  const { data: testimonials = [], refetch } = trpc.testimonials.list.useQuery();

  // Add testimonial mutation
  const addTestimonial = trpc.testimonials.add.useMutation({
    onSuccess: () => {
      toast.success("Testimonial added successfully!");
      setFormData({
        guestName: "",
        rating: 5,
        review: "",
      });
      refetch();
    },
    onError: (error: any) => {
      toast.error(`Failed to add testimonial: ${error?.message || 'Unknown error'}`);
    },
  });

  // Delete testimonial mutation
  const deleteTestimonial = trpc.testimonials.delete.useMutation({
    onSuccess: () => {
      toast.success("Testimonial deleted successfully!");
      refetch();
    },
    onError: (error: any) => {
      toast.error(`Failed to delete testimonial: ${error?.message || 'Unknown error'}`);
    },
  });

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">You must be logged in to access this page.</p>
          <Button onClick={() => window.location.href = getLoginUrl()}>
            Login
          </Button>
        </div>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground">Only administrators can access this page.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.guestName || !formData.review) {
      toast.error("Please fill in all fields");
      return;
    }

    await addTestimonial.mutateAsync({
      guestName: formData.guestName,
      rating: formData.rating,
      review: formData.review,
    });
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      await deleteTestimonial.mutateAsync({ id });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-12">Testimonials Management</h1>

        {/* Add Testimonial Form */}
        <div className="bg-card border border-border rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-6">Add New Testimonial</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Guest Name</label>
              <input
                type="text"
                value={formData.guestName}
                onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                placeholder="e.g., Sarah & Michael"
                className="w-full px-4 py-2 border border-border rounded-md bg-background"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating })}
                    className={`p-2 rounded transition-colors ${
                      formData.rating === rating
                        ? "bg-foreground text-background"
                        : "bg-secondary hover:bg-secondary/80"
                    }`}
                  >
                    <Star className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Review</label>
              <textarea
                value={formData.review}
                onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                placeholder="Write the guest's review..."
                rows={5}
                className="w-full px-4 py-2 border border-border rounded-md bg-background resize-none"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={addTestimonial.isPending}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Testimonial
            </Button>
          </form>
        </div>

        {/* Testimonials List */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Current Testimonials ({testimonials.length})</h2>
          <div className="space-y-4">
            {testimonials.length === 0 ? (
              <p className="text-muted-foreground">No testimonials yet. Add your first one above!</p>
            ) : (
              testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-card border border-border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{testimonial.guestName}</h3>
                      <div className="flex gap-1 mt-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-foreground text-foreground" />
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      disabled={deleteTestimonial.isPending}
                      className="p-2 hover:bg-destructive/10 rounded transition-colors"
                      title="Delete testimonial"
                    >
                      <Trash2 className="w-5 h-5 text-destructive" />
                    </button>
                  </div>
                  <p className="text-muted-foreground">{testimonial.review}</p>
                  <p className="text-xs text-muted-foreground mt-4">
                    Added: {new Date(testimonial.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
