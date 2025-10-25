import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { setCurrentUser } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication
    if (email && password) {
      const mockUser = {
        user_id: 1,
        full_name: "John Doe",
        email: email,
        phone_number: "1234567890",
        password_hash: "hashed_password",
        created_at: new Date().toISOString()
      };
      
      setCurrentUser(mockUser);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in",
      });
      navigate('/');
    } else {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="max-w-md mx-auto">
          <Card className="p-8 bg-card/80 backdrop-blur-sm border-border">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">Login to book your next event</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background/50"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-background/50"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90" size="lg">
                Login
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary hover:underline font-medium">
                Register here
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
