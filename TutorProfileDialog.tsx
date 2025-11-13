import { Star, Calendar, Video, MapPin, Award, BookOpen } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';

interface TutorProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tutor: any;
  onBookSession: (tutor: any) => void;
}

export function TutorProfileDialog({ open, onOpenChange, tutor, onBookSession }: TutorProfileDialogProps) {
  if (!tutor) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tutor Profile</DialogTitle>
          <DialogDescription>
            View detailed information about this tutor
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Header */}
          <div className="flex gap-6 items-start">
            <Avatar className="w-24 h-24 border-4 border-violet-200">
              <AvatarImage src={tutor.avatar} alt={tutor.name} />
              <AvatarFallback>{tutor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2>{tutor.name}</h2>
              <p className="text-muted-foreground">Year {tutor.year} • CGPA: {tutor.cgpa}</p>
              <Badge variant="secondary" className="mt-2 bg-violet-100 text-violet-700">
                {tutor.faculty}
              </Badge>
              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span>{tutor.rating}</span>
                </div>
                <span className="text-muted-foreground">({tutor.reviews} reviews)</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <h3 className="flex items-center gap-2">
              <Award className="w-5 h-5 text-violet-600" />
              About
            </h3>
            <p className="text-muted-foreground">{tutor.bio}</p>
          </div>

          {/* Courses */}
          <div className="space-y-2">
            <h3 className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-violet-600" />
              Courses Taught
            </h3>
            <div className="flex flex-wrap gap-2">
              {tutor.courses.map((course: string) => (
                <Badge key={course} variant="secondary" className="bg-violet-100 text-violet-700">
                  {course}
                </Badge>
              ))}
            </div>
          </div>

          {/* Subjects */}
          <div className="space-y-2">
            <h3>Specializations</h3>
            <div className="grid md:grid-cols-2 gap-2">
              {tutor.subjects.map((subject: string) => (
                <div key={subject} className="flex items-center gap-2 p-2 bg-violet-50 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-violet-600"></div>
                  <span className="text-muted-foreground">{subject}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="space-y-2">
            <h3 className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-violet-600" />
              Availability
            </h3>
            <p className="text-muted-foreground">{tutor.availability}</p>
          </div>

          {/* Session Types */}
          <div className="space-y-2">
            <h3>Session Types</h3>
            <div className="flex gap-4">
              {tutor.sessionTypes.includes('online') && (
                <div className="flex items-center gap-2 text-violet-600">
                  <Video className="w-5 h-5" />
                  <span>Online Sessions</span>
                </div>
              )}
              {tutor.sessionTypes.includes('in-person') && (
                <div className="flex items-center gap-2 text-purple-600">
                  <MapPin className="w-5 h-5" />
                  <span>In-Person Sessions</span>
                </div>
              )}
            </div>
          </div>

          {/* Reviews Summary */}
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-lg p-4 border border-violet-200">
            <h3 className="mb-3">Student Feedback</h3>
            <div className="space-y-2 text-muted-foreground">
              <p>"Excellent tutor! Very patient and explains concepts clearly."</p>
              <p>"Helped me improve my grade from C to A. Highly recommended!"</p>
              <p>"Best tutor I've had at UCU. Really knows the material."</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button 
              className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
              onClick={() => {
                onBookSession(tutor);
                onOpenChange(false);
              }}
            >
              Book Session
            </Button>
            <Button variant="outline" className="border-violet-300 hover:bg-violet-50">
              Message Tutor
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
