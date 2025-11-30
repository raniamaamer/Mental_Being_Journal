import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Input } from "./ui/input";
import { Send, Bot, User } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hello! I'm here to support you. How are you feeling today?",
    sender: 'ai',
    timestamp: new Date()
  }
];

const aiResponses = [
  "I hear you. It's completely valid to feel that way. Would you like to talk more about what's on your mind?",
  "Thank you for sharing that with me. Remember, it's okay to not be okay sometimes. What do you think might help you feel a bit better right now?",
  "That sounds challenging. I'm here to listen without judgment. Have you noticed any patterns in when these feelings arise?",
  "Your feelings are important and deserve attention. Would you like to try a quick breathing exercise together, or would you prefer to keep talking?",
  "I appreciate you opening up about this. Taking the first step to talk about our feelings takes courage. What kind of support would be most helpful for you right now?"
];

export function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      const aiMessage: Message = {
        id: messages.length + 2,
        text: randomResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <section id="chat-demo" className="px-4 py-20 sm:px-6 lg:px-8 bg-blue-50">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="mb-4">Try Our AI Companion</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience a safe, judgment-free conversation. This is a demo to show how our AI can support you.
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-6 h-6" />
              AI Mental Health Companion
            </CardTitle>
            <CardDescription className="text-blue-100">
              Private and confidential conversation
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px] p-6">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'ai' 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-purple-100 text-purple-600'
                    }`}>
                      {message.sender === 'ai' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                    </div>
                    <div
                      className={`px-4 py-3 rounded-2xl max-w-[80%] ${
                        message.sender === 'ai'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-blue-600 text-white'
                      }`}
                    >
                      <p>{message.text}</p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl bg-gray-100">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message here..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={handleSend} className="bg-blue-600 hover:bg-blue-700">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-gray-500 mt-2">
                This is a demo. For real support, please sign up or consult a licensed professional for serious concerns.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
