import { useState } from 'react';
import { Calendar, Clock, Video, MapPin, MessageSquare, Star } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { RatingDialog } from './RatingDialog';
import { toast } from 'sonner@2.0.3';

interface SessionsPageProps {
  currentUser: any;
}

export function SessionsPage({ currentUser }: SessionsPageProps) {
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<any>(null);

  const upcomingSessions = [
    {
      id: '1',
      tutor: {
        name: 'Chinwe Adebayo',
        avatar: 'https://images.unsplash.com/photo-1573496358961-3c82861ab8f4?w=400&h=400&fit=crop',
      },
      course: 'ENG305 - Data Structures & Algorithms',
      date: '2025-10-25',
      time: '02:00 PM',
      duration: 60,
      type: 'online',
      status: 'confirmed',
      meetingLink: 'https://meet.tutorpal.com/abc123',
    },
    {
      id: '2',
      tutor: {
        name: 'Kwame Mensah',
        avatar: 'https://images.unsplash.com/photo-1656313826909-1f89d1702a81?w=400&h=400&fit=crop',
      },
      course: 'MECH301 - Thermodynamics',
      date: '2025-10-27',
      time: '10:00 AM',
      duration: 60,
      type: 'in-person',
      status: 'confirmed',
      location: 'Engineering Library, Room 204',
    },
  ];

  const pastSessions = [
    {
      id: '3',
      tutor: {
        name: 'Zainab Kamara',
        avatar: 'https://images.unsplash.com/photo-1638727295415-286409421143?w=400&h=400&fit=crop',
      },
      course: 'BUS305 - Financial Management',
      date: '2025-10-20',
      time: '03:00 PM',
      duration: 60,
      type: 'online',
      status: 'completed',
      rated: false,
    },
    {
      id: '4',
      tutor: {
        name: 'Oluwatobi Adeleke',
        avatar: 'https://images.unsplash.com/photo-1631131431211-4f768d89087d?w=400&h=400&fit=crop',
      },
      course: 'ECON201 - Microeconomics',
      date: '2025-10-18',
      time: '11:00 AM',
      duration: 60,
      type: 'in-person',
      status: 'completed',
      rated: true,
      rating: 5,
    },
  ];

  const handleRateSession = (session: any) => {
    setSelectedSession(session);
    setRatingDialogOpen(true);
  };

  const handleJoinSession = (session: any) => {
    toast.success('Launching video session...', {
      description: `Connecting you to ${session.tutor.name}`,
    });
    // In a real app, this would open the video call interface
    window.open(session.meetingLink, '_blank');
  };

  const handleMessageTutor = (session: any) => {
    toast.info('Opening messages...', {
      description: `Start a conversation with ${session.tutor.name}`,
    });
    // In a real app, this would navigate to messages page or open a chat dialog
  };

  const handleReschedule = (session: any) => {
    toast.info('Rescheduling session...', {
      description: 'This feature allows you to select a new date and time',
    });
    // In a real app, this would open a rescheduling dialog
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1>My Sessions</h1>
          <p className="text-muted-foreground">
            Manage your tutoring sessions and track your progress
          </p>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past Sessions</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingSessions.map((session) => (
              <Card key={session.id} className="border-violet-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={session.tutor.avatar} alt={session.tutor.name} />
                        <AvatarFallback>{session.tutor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3>{session.course}</h3>
                        <p className="text-muted-foreground">with {session.tutor.name}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700">
                      {session.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(session.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{session.time} ({session.duration} min)</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      {session.type === 'online' ? (
                        <>
                          <Video className="w-4 h-4 text-violet-600" />
                          <span>Online Session</span>
                        </>
                      ) : (
                        <>
                          <MapPin className="w-4 h-4 text-violet-600" />
                          <span>{session.location}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {session.type === 'online' && (
                      <Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700" onClick={() => handleJoinSession(session)}>
                        <Video className="w-4 h-4 mr-2" />
                        Join Session
                      </Button>
                    )}
                    <Button variant="outline" className="border-violet-300 hover:bg-violet-50" onClick={() => handleMessageTutor(session)}>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message Tutor
                    </Button>
                    <Button variant="outline" className="border-violet-300 hover:bg-violet-50" onClick={() => handleReschedule(session)}>
                      Reschedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastSessions.map((session) => (
              <Card key={session.id} className="border-violet-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={session.tutor.avatar} alt={session.tutor.name} />
                        <AvatarFallback>{session.tutor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3>{session.course}</h3>
                        <p className="text-muted-foreground">with {session.tutor.name}</p>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      {session.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(session.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{session.time} ({session.duration} min)</span>
                    </div>
                  </div>

                  {session.rated ? (
                    <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 p-3 rounded-lg">
                      <Star className="w-4 h-4 fill-yellow-600" />
                      <span>You rated this session {session.rating} stars</span>
                    </div>
                  ) : (
                    <Button 
                      variant="outline"
                      onClick={() => handleRateSession(session)}
                      className="w-full border-violet-300 hover:bg-violet-50"
                    >
                      <Star className="w-4 h-4 mr-2" />
                      Rate this session
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {selectedSession && (
        <RatingDialog
          open={ratingDialogOpen}
          onOpenChange={setRatingDialogOpen}
          session={selectedSession}
          currentUser={currentUser}
        />
      )}
    </div>
  );
}