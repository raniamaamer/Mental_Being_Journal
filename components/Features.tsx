import { MessageCircle, TrendingUp, Shield, Clock, Heart, Lightbulb } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const features = [
  {
    icon: MessageCircle,
    title: "Empathetic Conversations",
    description: "AI trained on therapeutic techniques to provide supportive, non-judgmental conversations."
  },
  {
    icon: TrendingUp,
    title: "Mood Tracking",
    description: "Monitor your emotional wellbeing over time with intelligent mood analysis and insights."
  },
  {
    icon: Shield,
    title: "Complete Privacy",
    description: "Your conversations are encrypted and confidential. Your mental health, your data."
  },
  {
    icon: Clock,
    title: "Always Available",
    description: "Get support whenever you need it, day or night. No appointments necessary."
  },
  {
    icon: Heart,
    title: "Personalized Care",
    description: "AI adapts to your unique needs and provides tailored coping strategies."
  },
  {
    icon: Lightbulb,
    title: "CBT & Mindfulness",
    description: "Evidence-based techniques including Cognitive Behavioral Therapy and mindfulness exercises."
  }
];

export function Features() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="mb-4">Why Choose AI Mental Health Support</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Combining cutting-edge AI technology with proven therapeutic methods to support your mental wellbeing
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-2 hover:border-blue-200 transition-colors">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
