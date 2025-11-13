import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';
import { LogIn } from 'lucide-react';
import { SeedDataButton } from './SeedDataButton';

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginSuccess: (user: any) => void;
  onSwitchToSignUp: () => void;
}

export function LoginDialog({ open, onOpenChange, onLoginSuccess, onSwitchToSignUp }: LoginDialogProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }

    // Get users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('tutorpal_users') || '[]');
    
    // Find user with matching email and password
    const user = existingUsers.find((u: any) => u.email === email && u.password === password);

    if (!user) {
      toast.error('Invalid email or password');
      return;
    }

    // Save current user
    localStorage.setItem('tutorpal_currentUser', JSON.stringify(user));
    
    toast.success(`Welcome back, ${user.name}!`);
    onLoginSuccess(user);
    onOpenChange(false);
    
    // Reset form
    setEmail('');
    setPassword('');
  };

  const handleSwitchToSignUp = () => {
    onOpenChange(false);
    onSwitchToSignUp();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome Back to Tutor Pal</DialogTitle>
          <DialogDescription>
            Sign in to continue your learning journey
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              type="email"
              placeholder="your.name@ucu.ac.ug"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="login-password">Password</Label>
            <Input
              id="login-password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full bg-gradient-to-r from-violet-600 to-purple-600">
            <LogIn className="w-4 h-4 mr-2" />
            Sign In
          </Button>
        </form>

        <div className="text-center pt-4 border-t">
          <p className="text-muted-foreground">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={handleSwitchToSignUp}
              className="text-violet-600 hover:text-violet-700 hover:underline"
            >
              Sign up here
            </button>
          </p>
        </div>

        <div className="bg-violet-50 border border-violet-200 rounded-lg p-4 mt-4 space-y-3">
          <p className="text-violet-800">
            <strong>Quick Test:</strong> Create demo accounts with one click
          </p>
          <SeedDataButton />
          <p className="text-violet-700 text-xs">
            Demo emails: amara@ucu.ac.ug, chinwe@ucu.ac.ug, kofi@ucu.ac.ug (password: "password")
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
