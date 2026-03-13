import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Trash2, Plus } from "lucide-react";

export default function ReviewManagement() {
  const [formData, setFormData] = useState({
    guestName: "",
    rating: 5,
    review: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch testimonials
  const { data: testimonials = [] } = trpc.testimonials.list.useQuery();

  // Add testimonial mutation
  const addTestimonial = trpc.testimonials.add.useMutation({
    onSuccess: () => {
      toast.success("Review added successfully!");
      setFormData({
        guestName: "",
        rating: 5,
        review: "",
      });
      // Refetch testimonials
      trpc.useUtils().testimonials.list.invalidate();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add review");
    },
  });

  // Delete testimonial mutation
  const deleteTestimonial = trpc.testimonials.delete.useMutation({
    onSuccess: () => {
      toast.success("Review deleted");
      trpc.useUtils().testimonials.list.invalidate();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete review");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.guestName.trim() || !formData.review.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await addTestimonial.mutateAsync({
        guestName: formData.guestName,
        rating: formData.rating,
        review: formData.review,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this review?")) {
      deleteTestimonial.mutate({ id });
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Manage Reviews</h1>

        {/* Add Review Form */}
        <div className="bg-card border border-border rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-6">Add New Review</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Guest Name */}
            <div>
              <label htmlFor="guestName" className="block text-sm font-medium mb-2">
                Guest Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                id="guestName"
                value={formData.guestName}
                onChange={(e) =>
                  setFormData({ ...formData, guestName: e.target.value })
                }
                placeholder="e.g., Sarah M."
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Rating */}
            <div>
              <label htmlFor="rating" className="block text-sm font-medium mb-2">
                Rating
              </label>
              <select
                id="rating"
                value={formData.rating}
                onChange={(e) =>
                  setFormData({ ...formData, rating: parseInt(e.target.value) })
                }
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value={5}>⭐⭐⭐⭐⭐ 5 Stars</option>
                <option value={4}>⭐⭐⭐⭐ 4 Stars</option>
                <option value={3}>⭐⭐⭐ 3 Stars</option>
              </select>
            </div>

            {/* Review Text */}
            <div>
              <label htmlFor="review" className="block text-sm font-medium mb-2">
                Review <span className="text-destructive">*</span>
              </label>
              <textarea
                id="review"
                value={formData.review}
                onChange={(e) =>
                  setFormData({ ...formData, review: e.target.value })
                }
                placeholder="What did the guest love about the cabin?"
                rows={5}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || addTestimonial.isPending}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              {isSubmitting ? "Adding..." : "Add Review"}
            </Button>
          </form>
        </div>

        {/* Reviews List */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Current Reviews ({testimonials.length})</h2>

          {testimonials.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No reviews yet. Add your first review above!
            </p>
          ) : (
            <div className="space-y-4">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">{testimonial.guestName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {"⭐".repeat(testimonial.rating)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      disabled={deleteTestimonial.isPending}
                      className="text-destructive hover:text-destructive/80 disabled:opacity-50"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-foreground">{testimonial.review}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
