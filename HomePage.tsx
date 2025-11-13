import { Search, Users, Star, Video, MessageCircle, Calendar, Award, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { BecomeTutorDialog } from './BecomeTutorDialog';

interface HomePageProps {
  onNavigate: (page: string) => void;
  currentUser?: any;
  onShowLogin?: () => void;
  onShowSignUp?: () => void;
}

export function HomePage({ onNavigate, currentUser, onShowLogin, onShowSignUp }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [becomeTutorDialogOpen, setBecomeTutorDialogOpen] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Navigate to tutors page with search query
      onNavigate('tutors');
    }
  };

  const handleBecomeTutor = () => {
    setBecomeTutorDialogOpen(true);
  };
  
  const features = [
    {
      icon: Award,
      title: 'Elite UCU Tutors',
      description: 'Learn from students with 4.5+ CGPA who excel in their fields',
    },
    {
      icon: Calendar,
      title: 'Flexible Booking',
      description: 'Book sessions online or in-person based on your schedule',
    },
    {
      icon: Video,
      title: 'Video & Chat',
      description: 'Connect via video calls or instant messaging',
    },
    {
      icon: Star,
      title: 'Peer Feedback',
      description: 'Get ratings and feedback from both tutors and students',
    },
  ];

  const stats = [
    { label: 'Top-Tier Tutors', value: '150+' },
    { label: 'Minimum CGPA', value: '4.5' },
    { label: 'Sessions Completed', value: '3,500+' },
    { label: 'Student Satisfaction', value: '98%' },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-block px-4 py-2 bg-violet-100 rounded-full text-violet-700 mb-4">
              <span className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                Learn from High-CGPA Students
              </span>
            </div>
            <h1 className="bg-gradient-to-r from-violet-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">
              Excel with Tutor Pal at UCU
            </h1>
            <p className="text-muted-foreground text-lg">
              Connect with elite peer tutors at Uganda Christian University with CGPAs of 4.5 and above. 
              Learn from top-performing students in Engineering & Computing and Business faculties who've mastered your courses.
            </p>
          
            <div className="flex gap-4 justify-center lg:justify-start pt-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg"
                onClick={() => currentUser ? onNavigate('tutors') : onShowLogin?.()}
              >
                Find a Tutor
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-violet-300 hover:bg-violet-50" 
                onClick={currentUser ? handleBecomeTutor : onShowSignUp}
              >
                Become a Tutor
              </Button>
            </div>

            {/* Search Bar */}
            <Card className="mt-8 border-violet-200 shadow-md">
              <CardContent className="p-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search by course code (e.g., ENG201, BUS301)" 
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button className="bg-gradient-to-r from-violet-600 to-purple-600" onClick={handleSearch}>Search</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1716654716581-3c92ba53de10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwc3R1ZGVudHMlMjB0dXRvcmluZyUyMHVuaXZlcnNpdHl8ZW58MXx8fHwxNzYxODU2MTI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="African students in tutoring session at Uganda Christian University"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-violet-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">3,500+</div>
                  <p className="text-muted-foreground">Success Stories</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white/70 backdrop-blur-sm py-16 border-y border-violet-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="mb-4">Why Choose Tutor Pal?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with Uganda Christian University's highest-achieving peer tutors (CGPA 4.5+) across Engineering & Computing and Business faculties
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="border-violet-200 hover:border-violet-400 hover:shadow-lg transition-all">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center mx-auto">
                    <Icon className="w-7 h-7 text-violet-600" />
                  </div>
                  <h3>{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 pb-12">
        <Card className="max-w-4xl mx-auto bg-gradient-to-r from-violet-600 to-purple-600 border-0 text-white shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10"></div>
          <CardContent className="p-12 text-center space-y-4 relative">
            <h2 className="text-white">Ready to Excel in Your Studies?</h2>
            <p className="text-violet-50 max-w-2xl mx-auto">
              Join fellow UCU students improving their grades with personalized peer tutoring from elite mentors (CGPA 4.5+)
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => currentUser ? onNavigate('tutors') : onShowSignUp?.()}
              className="shadow-lg"
            >
              Get Started Now
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Become Tutor Dialog */}
      <BecomeTutorDialog 
        open={becomeTutorDialogOpen} 
        onOpenChange={setBecomeTutorDialogOpen} 
      />
    </div>
  );
}