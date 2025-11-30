import { UserPlus, MessageSquare, BarChart3, Smile } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Account",
    description: "Sign up in seconds with complete privacy and security."
  },
  {
    icon: MessageSquare,
    title: "Start Conversing",
    description: "Share your thoughts and feelings with our AI companion."
  },
  {
    icon: BarChart3,
    title: "Track Progress",
    description: "Monitor your mood patterns and mental health journey."
  },
  {
    icon: Smile,
    title: "Feel Better",
    description: "Develop healthy coping strategies and improve wellbeing."
  }
];

export function HowItWorks() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Getting started with AI mental health support is simple and straightforward
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute top-8 -right-4 hidden lg:block">
                    {index < steps.length - 1 && (
                      <div className="w-8 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300"></div>
                    )}
                  </div>
                  <h3 className="mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
