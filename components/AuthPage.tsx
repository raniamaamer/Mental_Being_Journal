import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Brain, ArrowLeft, Mail, Lock, User } from "lucide-react";
import { toast } from "sonner";

interface AuthPageProps {
  mode: "login" | "signup" | "reset";
  onModeChange: (mode: "login" | "signup" | "reset") => void;
  onLogin: (email: string, password: string) => void;
  onSignup: (name: string, email: string, password: string) => void;
  onBack: () => void;
}

export function AuthPage({ mode, onModeChange, onLogin, onSignup, onBack }: AuthPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === "login") {
      if (!email || !password) {
        toast.error("Please fill in all fields");
        return;
      }
      toast.success("Welcome back!");
      onLogin(email, password);
    } else if (mode === "signup") {
      if (!name || !email || !password || !confirmPassword) {
        toast.error("Please fill in all fields");
        return;
      }
      if (password !== confirmPassword) {
        toast.error("Passwords don't match");
        return;
      }
      toast.success("Account created successfully!");
      onSignup(name, email, password);
    } else if (mode === "reset") {
      if (!email) {
        toast.error("Please enter your email");
        return;
      }
      toast.success("Password reset link sent to your email!");
      onModeChange("login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="border-2 shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <Brain className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <CardTitle>
              {mode === "login" && "Welcome Back"}
              {mode === "signup" && "Create Your Account"}
              {mode === "reset" && "Reset Password"}
            </CardTitle>
            <CardDescription>
              {mode === "login" && "Sign in to continue your wellness journey"}
              {mode === "signup" && "Start tracking your mental well-being today"}
              {mode === "reset" && "Enter your email to receive a reset link"}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {mode !== "reset" && (
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              )}

              {mode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                {mode === "login" && "Sign In"}
                {mode === "signup" && "Create Account"}
                {mode === "reset" && "Send Reset Link"}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              {mode === "login" && (
                <>
                  <button
                    onClick={() => onModeChange("reset")}
                    className="text-purple-600 hover:underline"
                  >
                    Forgot password?
                  </button>
                  <p className="text-gray-600">
                    Don't have an account?{" "}
                    <button
                      onClick={() => onModeChange("signup")}
                      className="text-purple-600 hover:underline"
                    >
                      Sign up
                    </button>
                  </p>
                </>
              )}
              
              {mode === "signup" && (
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <button
                    onClick={() => onModeChange("login")}
                    className="text-purple-600 hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              )}
              
              {mode === "reset" && (
                <p className="text-gray-600">
                  Remember your password?{" "}
                  <button
                    onClick={() => onModeChange("login")}
                    className="text-purple-600 hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>

            <p className="mt-6 text-gray-500 text-center">
              🔒 Your data is encrypted and private
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
