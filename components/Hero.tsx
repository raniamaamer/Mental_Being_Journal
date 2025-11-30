import { Button } from "./ui/button";
import { Brain, Sparkles } from "lucide-react";

export function Hero() {
  const scrollToChat = () => {
    document.getElementById('chat-demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-50 opacity-60"></div>
      
      <div className="relative mx-auto max-w-7xl">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Brain className="w-12 h-12 text-blue-600" />
          <Sparkles className="w-6 h-6 text-purple-500" />
        </div>
        
        <div className="text-center">
          <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI-Powered Mental Health Support
          </h1>
          
          <p className="mx-auto mb-8 max-w-2xl text-gray-600">
            Experience compassionate, 24/7 mental health support powered by advanced AI technology. 
            Get personalized guidance, mood tracking, and evidence-based coping strategies whenever you need them.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={scrollToChat}>
              Start Free Session
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>24/7 Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Private & Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Evidence-Based</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
