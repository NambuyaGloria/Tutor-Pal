import { Edit, Star, Award, BookOpen, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface ProfilePageProps {
  currentUser: any;
}

export function ProfilePage({ currentUser }: ProfilePageProps) {
  const isTutor = currentUser.role === 'tutor';
  
  const stats = isTutor ? [
    { label: 'Sessions Taught', value: currentUser.sessionsCompleted || 0, icon: BookOpen },
    { label: 'Hours Taught', value: (currentUser.sessionsCompleted || 0) * 1.5, icon: Clock },
    { label: 'Average Rating', value: currentUser.rating || 0, icon: Star },
    { label: 'Total Reviews', value: currentUser.totalReviews || 0, icon: Award },
  ] : [
    { label: 'Sessions Completed', value: 24, icon: BookOpen },
    { label: 'Hours Learned', value: 36, icon: Clock },
    { label: 'Average Rating', value: currentUser.rating || 0, icon: Star },
    { label: 'Achievements', value: 5, icon: Award },
  ];

  const achievements = [
    { name: 'First Session', description: 'Completed your first tutoring session', unlocked: true },
    { name: 'Quick Learner', description: 'Completed 10 sessions', unlocked: true },
    { name: 'Dedicated Student', description: 'Completed 25 sessions', unlocked: false },
    { name: 'Perfect Rating', description: 'Received 10 five-star ratings', unlocked: true },
    { name: 'Subject Master', description: 'Completed 5 sessions in one subject', unlocked: true },
  ];

  const courses = [
    { code: 'ENG305', name: 'Data Structures & Algorithms', progress: 75, sessions: 8 },
    { code: 'ENG201', name: 'Object Oriented Programming', progress: 45, sessions: 6 },
    { code: 'CS401', name: 'Software Architecture', progress: 90, sessions: 10 },
  ];

  const reviews = [
    {
      tutor: 'Chinwe Adebayo',
      course: 'ENG305',
      rating: 5,
      comment: 'Excellent tutor! Very clear explanations of complex algorithms.',
      date: '2025-10-20',
    },
    {
      tutor: 'Kwame Mensah',
      course: 'MECH301',
      rating: 5,
      comment: 'Made thermodynamics concepts easy to understand.',
      date: '2025-10-18',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card className="border-violet-200">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h2>{currentUser.name}</h2>
                    <p className="text-muted-foreground">{currentUser.email}</p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <Badge variant="secondary" className="capitalize">{currentUser.role}</Badge>
                      <Badge variant="secondary">Year {currentUser.year}</Badge>
                      <Badge variant="secondary">{currentUser.major}</Badge>
                      {isTutor && currentUser.cgpa && (
                        <Badge className="bg-gradient-to-r from-violet-600 to-purple-600">
                          CGPA: {currentUser.cgpa.toFixed(2)}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
                <p className="text-muted-foreground">
                  {currentUser.bio || (isTutor ? 'Passionate tutor helping students achieve their academic goals.' : 'Eager learner seeking to excel in academics.')}
                </p>
                {isTutor && currentUser.specializations && currentUser.specializations.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-muted-foreground">Specializations:</p>
                    <div className="flex flex-wrap gap-2">
                      {currentUser.specializations.map((spec: string) => (
                        <Badge key={spec} variant="outline" className="border-violet-300">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center space-y-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center mx-auto">
                      <Icon className="w-5 h-5 text-violet-600" />
                    </div>
                    <div className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="reviews">My Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-4">
            {courses.map((course) => (
              <Card key={course.code} className="border-violet-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3>{course.code}</h3>
                      <p className="text-muted-foreground">{course.name}</p>
                    </div>
                    <Badge variant="secondary">{course.sessions} sessions</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            {achievements.map((achievement) => (
              <Card
                key={achievement.name}
                className={`border-violet-200 ${!achievement.unlocked && 'opacity-50'}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        achievement.unlocked
                          ? 'bg-gradient-to-br from-violet-100 to-purple-100'
                          : 'bg-gray-100'
                      }`}
                    >
                      <Award
                        className={`w-6 h-6 ${
                          achievement.unlocked ? 'text-violet-600' : 'text-gray-400'
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <h4>{achievement.name}</h4>
                      <p className="text-muted-foreground">{achievement.description}</p>
                    </div>
                    {achievement.unlocked && (
                      <Badge className="bg-green-100 text-green-700">Unlocked</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            {reviews.map((review, index) => (
              <Card key={index} className="border-violet-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4>{review.tutor}</h4>
                      <p className="text-muted-foreground">{review.course}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">"{review.comment}"</p>
                  <p className="text-muted-foreground">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
