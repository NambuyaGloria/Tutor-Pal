import { useState } from 'react';
import { Award, GraduationCap, BookOpen, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';

interface BecomeTutorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BecomeTutorDialog({ open, onOpenChange }: BecomeTutorDialogProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    studentId: '',
    cgpa: '',
    faculty: '',
    year: '',
    courses: '',
    motivation: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate CGPA
    const cgpaValue = parseFloat(formData.cgpa);
    if (cgpaValue < 4.5) {
      toast.error('CGPA requirement not met', {
        description: 'Tutors must have a minimum CGPA of 4.5 to qualify.',
      });
      return;
    }

    toast.success('Application submitted successfully!', {
      description: 'Our team will review your application and contact you within 3-5 business days.',
    });

    // Reset form
    setFormData({
      fullName: '',
      email: '',
      studentId: '',
      cgpa: '',
      faculty: '',
      year: '',
      courses: '',
      motivation: '',
    });

    onOpenChange(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value.trim() !== '');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="w-6 h-6 text-violet-600" />
            Become a Tutor at UCU
          </DialogTitle>
          <DialogDescription>
            Join our elite team of peer tutors and help fellow students excel in their studies
          </DialogDescription>
        </DialogHeader>

        {/* Requirements Section */}
        <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-lg p-4 border border-violet-200 space-y-3">
          <h3 className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-violet-600" />
            Requirements
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-violet-600 mt-1">•</span>
              <span>Minimum CGPA of 4.5 (First Class Honours)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-violet-600 mt-1">•</span>
              <span>Currently enrolled in Faculty of Engineering & Computing or Faculty of Business</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-violet-600 mt-1">•</span>
              <span>Strong communication skills and passion for teaching</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-violet-600 mt-1">•</span>
              <span>Commitment to helping fellow students succeed</span>
            </li>
          </ul>
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-violet-600" />
              Personal Information
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">UCU Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.name@ucu.ac.ug"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID *</Label>
                <Input
                  id="studentId"
                  placeholder="e.g., 2021/CS/001"
                  value={formData.studentId}
                  onChange={(e) => handleInputChange('studentId', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cgpa">Current CGPA *</Label>
                <Input
                  id="cgpa"
                  type="number"
                  step="0.01"
                  min="0"
                  max="5"
                  placeholder="e.g., 4.8"
                  value={formData.cgpa}
                  onChange={(e) => handleInputChange('cgpa', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="faculty">Faculty *</Label>
                <Select value={formData.faculty} onValueChange={(value) => handleInputChange('faculty', value)}>
                  <SelectTrigger id="faculty">
                    <SelectValue placeholder="Select your faculty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Engineering and Computing</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Current Year *</Label>
                <Select value={formData.year} onValueChange={(value) => handleInputChange('year', value)}>
                  <SelectTrigger id="year">
                    <SelectValue placeholder="Select your year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">Year 2</SelectItem>
                    <SelectItem value="3">Year 3</SelectItem>
                    <SelectItem value="4">Year 4</SelectItem>
                    <SelectItem value="5">Year 5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Teaching Information */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-violet-600" />
              Teaching Information
            </h3>

            <div className="space-y-2">
              <Label htmlFor="courses">Courses You Can Teach *</Label>
              <Textarea
                id="courses"
                placeholder="List the course codes you excel in (e.g., ENG201, ENG305, CS401, BUS305)"
                value={formData.courses}
                onChange={(e) => handleInputChange('courses', e.target.value)}
                rows={3}
                required
              />
              <p className="text-xs text-muted-foreground">
                Include course codes and subjects where you have achieved excellent grades
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="motivation">Why do you want to become a tutor? *</Label>
              <Textarea
                id="motivation"
                placeholder="Tell us about your passion for teaching and helping fellow students..."
                value={formData.motivation}
                onChange={(e) => handleInputChange('motivation', e.target.value)}
                rows={4}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
              disabled={!isFormValid()}
            >
              Submit Application
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}