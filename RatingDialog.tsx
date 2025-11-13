import { useState } from 'react';
import { Star } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';

interface RatingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: any;
  currentUser: any;
}

export function RatingDialog({ open, onOpenChange, session, currentUser }: RatingDialogProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    toast.success('Thank you for your feedback!', {
      description: 'Your rating has been submitted successfully',
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Rate Your Session</DialogTitle>
          <DialogDescription>
            Share your experience and help other students make informed decisions
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">
              How was your session with {session.tutor.name}?
            </p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-10 h-10 ${
                      star <= (hoveredRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-muted-foreground">
                {rating === 5 && 'Excellent!'}
                {rating === 4 && 'Very Good'}
                {rating === 3 && 'Good'}
                {rating === 2 && 'Fair'}
                {rating === 1 && 'Needs Improvement'}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Feedback (Optional)</Label>
            <Textarea
              placeholder="Share your experience with this session..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
            />
            <p className="text-muted-foreground">
              Your feedback helps tutors improve and helps other students make informed decisions.
            </p>
          </div>

          <div className="bg-violet-50 border border-violet-200 rounded-lg p-4 space-y-2">
            <h4>What made this session helpful?</h4>
            <ul className="text-muted-foreground list-disc list-inside space-y-1">
              <li>Clear explanations</li>
              <li>Patience and understanding</li>
              <li>Relevant examples</li>
              <li>Good time management</li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Skip
          </Button>
          <Button 
            className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
            onClick={handleSubmit}
            disabled={rating === 0}
          >
            Submit Rating
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}