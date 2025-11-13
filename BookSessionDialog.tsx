import { useState } from 'react';
import { Calendar, Clock, MapPin, Video } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Calendar as CalendarComponent } from './ui/calendar';
import { toast } from 'sonner@2.0.3';

interface BookSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tutor: any;
  currentUser: any;
}

export function BookSessionDialog({ open, onOpenChange, tutor, currentUser }: BookSessionDialogProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [sessionType, setSessionType] = useState('online');
  const [timeSlot, setTimeSlot] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [notes, setNotes] = useState('');

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM',
  ];

  const handleBooking = () => {
    const sessionTypeText = sessionType === 'online' ? 'Online' : 'In-Person';
    const dateText = date?.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
    
    toast.success('Session booked successfully!', {
      description: `${sessionTypeText} session with ${tutor.name} on ${dateText} at ${timeSlot} for ${courseCode}`,
    });
    
    // Reset form
    setDate(new Date());
    setSessionType('online');
    setTimeSlot('');
    setCourseCode('');
    setNotes('');
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book a Session with {tutor.name}</DialogTitle>
          <DialogDescription>
            Select your preferred date, time, and session type for your tutoring session
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Session Type */}
          <div className="space-y-2">
            <Label>Session Type</Label>
            <RadioGroup value={sessionType} onValueChange={setSessionType}>
              {tutor.sessionTypes.includes('online') && (
                <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-accent">
                  <RadioGroupItem value="online" id="online" />
                  <label htmlFor="online" className="flex items-center gap-2 flex-1 cursor-pointer">
                    <Video className="w-4 h-4 text-violet-600" />
                    <div>
                      <div>Online Session</div>
                      <div className="text-muted-foreground">Video call via integrated platform</div>
                    </div>
                  </label>
                </div>
              )}
              {tutor.sessionTypes.includes('in-person') && (
                <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-accent">
                  <RadioGroupItem value="in-person" id="in-person" />
                  <label htmlFor="in-person" className="flex items-center gap-2 flex-1 cursor-pointer">
                    <MapPin className="w-4 h-4 text-purple-600" />
                    <div>
                      <div>In-Person Session</div>
                      <div className="text-muted-foreground">Meet at campus library</div>
                    </div>
                  </label>
                </div>
              )}
            </RadioGroup>
          </div>

          {/* Course Selection */}
          <div className="space-y-2">
            <Label>Course/Subject</Label>
            <Select value={courseCode} onValueChange={setCourseCode}>
              <SelectTrigger>
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {tutor.courses.map((course: string) => (
                  <SelectItem key={course} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <Label>Select Date</Label>
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              disabled={(date) => date < new Date()}
            />
          </div>

          {/* Time Slot */}
          <div className="space-y-2">
            <Label>Time Slot</Label>
            <Select value={timeSlot} onValueChange={setTimeSlot}>
              <SelectTrigger>
                <SelectValue placeholder="Select a time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label>Additional Notes</Label>
            <Textarea
              placeholder="What would you like to focus on in this session?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Booking Summary - Only show when all required fields are filled */}
          {date && timeSlot && courseCode && (
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-lg p-4 border border-violet-200 space-y-3">
              <h3 className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-violet-600" />
                Booking Summary
              </h3>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex justify-between">
                  <span>Session Type:</span>
                  <span className="flex items-center gap-2">
                    {sessionType === 'online' ? (
                      <>
                        <Video className="w-4 h-4 text-violet-600" />
                        Online Session
                      </>
                    ) : (
                      <>
                        <MapPin className="w-4 h-4 text-purple-600" />
                        In-Person at Campus Library
                      </>
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Course:</span>
                  <span className="font-medium text-violet-700">{courseCode}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-medium text-violet-700">
                    {date.toLocaleDateString('en-US', { 
                      weekday: 'short',
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span className="font-medium text-violet-700">{timeSlot}</span>
                </div>
                <div className="flex justify-between border-t pt-2 border-violet-200">
                  <span>Duration:</span>
                  <span className="font-medium text-violet-700">1 hour</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
            onClick={handleBooking}
            disabled={!date || !timeSlot || !courseCode}
          >
            Confirm Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}