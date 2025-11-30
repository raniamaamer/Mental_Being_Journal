import { Card, CardContent } from "./ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    role: "User for 3 months",
    content: "This AI companion has been a lifeline during difficult times. Having someone to talk to at 3 AM when anxiety hits has made a real difference.",
    rating: 5
  },
  {
    name: "James T.",
    role: "User for 6 months",
    content: "The mood tracking feature helped me identify patterns I never noticed before. It's like having a therapist's insights available 24/7.",
    rating: 5
  },
  {
    name: "Emily R.",
    role: "User for 4 months",
    content: "I was skeptical at first, but the AI's responses are genuinely helpful and compassionate. It's been a great complement to my therapy sessions.",
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="mb-4">What Our Users Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real stories from people who found support through AI mental health care
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-2">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                <div>
                  <p>{testimonial.name}</p>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
