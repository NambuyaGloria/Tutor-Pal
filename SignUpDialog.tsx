import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';
import { GraduationCap, UserCircle } from 'lucide-react';

interface SignUpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSignUpSuccess: (user: any) => void;
}

export function SignUpDialog({ open, onOpenChange, onSignUpSuccess }: SignUpDialogProps) {
  const [activeTab, setActiveTab] = useState('student');
  
  // Student form state
  const [studentForm, setStudentForm] = useState({
    name: '',
    email: '',
    password: '',
    year: '',
    major: '',
    faculty: '',
    bio: '',
  });

  // Tutor form state
  const [tutorForm, setTutorForm] = useState({
    name: '',
    email: '',
    password: '',
    cgpa: '',
    year: '',
    major: '',
    faculty: '',
    specializations: '',
    bio: '',
  });

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!studentForm.name || !studentForm.email || !studentForm.password || !studentForm.year || !studentForm.major || !studentForm.faculty) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (studentForm.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    // Check if email already exists
    const existingUsers = JSON.parse(localStorage.getItem('tutorpal_users') || '[]');
    if (existingUsers.some((u: any) => u.email === studentForm.email)) {
      toast.error('Email already registered');
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      ...studentForm,
      role: 'student',
      avatar: `https://images.unsplash.com/photo-1${Math.floor(Math.random() * 1000000000000)}?w=400&h=400&fit=crop`,
      rating: 0,
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    existingUsers.push(newUser);
    localStorage.setItem('tutorpal_users', JSON.stringify(existingUsers));
    localStorage.setItem('tutorpal_currentUser', JSON.stringify(newUser));

    toast.success('Account created successfully! Welcome to Tutor Pal!');
    onSignUpSuccess(newUser);
    onOpenChange(false);
    
    // Reset form
    setStudentForm({
      name: '',
      email: '',
      password: '',
      year: '',
      major: '',
      faculty: '',
      bio: '',
    });
  };

  const handleTutorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!tutorForm.name || !tutorForm.email || !tutorForm.password || !tutorForm.cgpa || 
        !tutorForm.year || !tutorForm.major || !tutorForm.faculty || !tutorForm.specializations) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (tutorForm.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    const cgpaValue = parseFloat(tutorForm.cgpa);
    if (isNaN(cgpaValue) || cgpaValue < 4.5 || cgpaValue > 5.0) {
      toast.error('CGPA must be between 4.5 and 5.0 to become a tutor');
      return;
    }

    // Check if email already exists
    const existingUsers = JSON.parse(localStorage.getItem('tutorpal_users') || '[]');
    if (existingUsers.some((u: any) => u.email === tutorForm.email)) {
      toast.error('Email already registered');
      return;
    }

    // Create new tutor
    const newTutor = {
      id: Date.now().toString(),
      ...tutorForm,
      cgpa: cgpaValue,
      role: 'tutor',
      avatar: `https://images.unsplash.com/photo-1${Math.floor(Math.random() * 1000000000000)}?w=400&h=400&fit=crop`,
      rating: 0,
      totalReviews: 0,
      sessionsCompleted: 0,
      specializations: tutorForm.specializations.split(',').map(s => s.trim()),
      availability: ['Monday 2-4 PM', 'Wednesday 10 AM-12 PM', 'Friday 3-5 PM'],
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    existingUsers.push(newTutor);
    localStorage.setItem('tutorpal_users', JSON.stringify(existingUsers));
    localStorage.setItem('tutorpal_currentUser', JSON.stringify(newTutor));

    toast.success('Tutor account created successfully! Welcome to Tutor Pal!');
    onSignUpSuccess(newTutor);
    onOpenChange(false);
    
    // Reset form
    setTutorForm({
      name: '',
      email: '',
      password: '',
      cgpa: '',
      year: '',
      major: '',
      faculty: '',
      specializations: '',
      bio: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Your Tutor Pal Account</DialogTitle>
          <DialogDescription>
            Join our community of learners and tutors at Uganda Christian University
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="student" className="gap-2">
              <UserCircle className="w-4 h-4" />
              Student
            </TabsTrigger>
            <TabsTrigger value="tutor" className="gap-2">
              <GraduationCap className="w-4 h-4" />
              Tutor
            </TabsTrigger>
          </TabsList>

          {/* Student Sign Up */}
          <TabsContent value="student">
            <form onSubmit={handleStudentSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="student-name">Full Name *</Label>
                  <Input
                    id="student-name"
                    placeholder="e.g., Amara Okafor"
                    value={studentForm.name}
                    onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-email">Email *</Label>
                  <Input
                    id="student-email"
                    type="email"
                    placeholder="your.name@ucu.ac.ug"
                    value={studentForm.email}
                    onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="student-password">Password *</Label>
                <Input
                  id="student-password"
                  type="password"
                  placeholder="At least 6 characters"
                  value={studentForm.password}
                  onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="student-year">Year *</Label>
                  <Select
                    value={studentForm.year}
                    onValueChange={(value) => setStudentForm({ ...studentForm, year: value })}
                  >
                    <SelectTrigger id="student-year">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Year 1</SelectItem>
                      <SelectItem value="2">Year 2</SelectItem>
                      <SelectItem value="3">Year 3</SelectItem>
                      <SelectItem value="4">Year 4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="student-faculty">Faculty *</Label>
                  <Select
                    value={studentForm.faculty}
                    onValueChange={(value) => setStudentForm({ ...studentForm, faculty: value })}
                  >
                    <SelectTrigger id="student-faculty">
                      <SelectValue placeholder="Select faculty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Engineering and Computing">Engineering and Computing</SelectItem>
                      <SelectItem value="Business and Management">Business and Management</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="student-major">Major/Program *</Label>
                <Input
                  id="student-major"
                  placeholder="e.g., Software Engineering, Business Administration"
                  value={studentForm.major}
                  onChange={(e) => setStudentForm({ ...studentForm, major: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="student-bio">Bio (Optional)</Label>
                <Textarea
                  id="student-bio"
                  placeholder="Tell us about yourself and your learning goals..."
                  value={studentForm.bio}
                  onChange={(e) => setStudentForm({ ...studentForm, bio: e.target.value })}
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-violet-600 to-purple-600">
                Create Student Account
              </Button>
            </form>
          </TabsContent>

          {/* Tutor Sign Up */}
          <TabsContent value="tutor">
            <form onSubmit={handleTutorSubmit} className="space-y-4">
              <div className="bg-violet-50 border border-violet-200 rounded-lg p-3 mb-4">
                <p className="text-violet-800">
                  <strong>Tutor Requirements:</strong> CGPA 4.5+ required. You'll help fellow students succeed!
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tutor-name">Full Name *</Label>
                  <Input
                    id="tutor-name"
                    placeholder="e.g., Chinwe Adebayo"
                    value={tutorForm.name}
                    onChange={(e) => setTutorForm({ ...tutorForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tutor-email">Email *</Label>
                  <Input
                    id="tutor-email"
                    type="email"
                    placeholder="your.name@ucu.ac.ug"
                    value={tutorForm.email}
                    onChange={(e) => setTutorForm({ ...tutorForm, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tutor-password">Password *</Label>
                <Input
                  id="tutor-password"
                  type="password"
                  placeholder="At least 6 characters"
                  value={tutorForm.password}
                  onChange={(e) => setTutorForm({ ...tutorForm, password: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tutor-cgpa">CGPA *</Label>
                  <Input
                    id="tutor-cgpa"
                    type="number"
                    step="0.01"
                    min="4.5"
                    max="5.0"
                    placeholder="4.5 - 5.0"
                    value={tutorForm.cgpa}
                    onChange={(e) => setTutorForm({ ...tutorForm, cgpa: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tutor-year">Year *</Label>
                  <Select
                    value={tutorForm.year}
                    onValueChange={(value) => setTutorForm({ ...tutorForm, year: value })}
                  >
                    <SelectTrigger id="tutor-year">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">Year 2</SelectItem>
                      <SelectItem value="3">Year 3</SelectItem>
                      <SelectItem value="4">Year 4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tutor-faculty">Faculty *</Label>
                  <Select
                    value={tutorForm.faculty}
                    onValueChange={(value) => setTutorForm({ ...tutorForm, faculty: value })}
                  >
                    <SelectTrigger id="tutor-faculty">
                      <SelectValue placeholder="Faculty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Engineering and Computing">Engineering</SelectItem>
                      <SelectItem value="Business and Management">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tutor-major">Major/Program *</Label>
                <Input
                  id="tutor-major"
                  placeholder="e.g., Computer Science, Accounting"
                  value={tutorForm.major}
                  onChange={(e) => setTutorForm({ ...tutorForm, major: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tutor-specializations">Specializations *</Label>
                <Input
                  id="tutor-specializations"
                  placeholder="e.g., Data Structures, Algorithms, Web Development (comma-separated)"
                  value={tutorForm.specializations}
                  onChange={(e) => setTutorForm({ ...tutorForm, specializations: e.target.value })}
                  required
                />
                <p className="text-muted-foreground">Separate multiple specializations with commas</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tutor-bio">Bio (Optional)</Label>
                <Textarea
                  id="tutor-bio"
                  placeholder="Tell us about your teaching experience and approach..."
                  value={tutorForm.bio}
                  onChange={(e) => setTutorForm({ ...tutorForm, bio: e.target.value })}
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-violet-600 to-purple-600">
                Create Tutor Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
