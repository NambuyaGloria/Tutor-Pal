import { useState, useEffect } from 'react';
import { Search, Filter, Star, Video, MapPin, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { BookSessionDialog } from './BookSessionDialog';
import { TutorProfileDialog } from './TutorProfileDialog';

interface FindTutorsPageProps {
  currentUser: any;
}

export function FindTutorsPage({ currentUser }: FindTutorsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedTutor, setSelectedTutor] = useState<any>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [dynamicTutors, setDynamicTutors] = useState<any[]>([]);

  // Load tutors from localStorage on mount
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('tutorpal_users') || '[]');
    const tutorsFromStorage = savedUsers.filter((user: any) => user.role === 'tutor');
    setDynamicTutors(tutorsFromStorage);
  }, []);

  const staticTutors = [
    {
      id: '1',
      name: 'Chinwe Adebayo',
      avatar: 'https://images.unsplash.com/photo-1573496358961-3c82861ab8f4?w=400&h=400&fit=crop',
      subjects: ['Software Engineering', 'Data Structures'],
      courses: ['ENG201', 'ENG305', 'CS401'],
      year: 4,
      cgpa: 4.8,
      faculty: 'Engineering and Computing',
      rating: 4.9,
      reviews: 127,
      bio: 'First Class Honours student with 4.8 CGPA at UCU, specializing in algorithms and software architecture',
      availability: 'Mon, Wed, Fri',
      sessionTypes: ['online', 'in-person'],
    },
    {
      id: '2',
      name: 'Kwame Mensah',
      avatar: 'https://images.unsplash.com/photo-1656313826909-1f89d1702a81?w=400&h=400&fit=crop',
      subjects: ['Mechanical Engineering', 'Thermodynamics'],
      courses: ['ENG101', 'ENG202', 'MECH301'],
      year: 3,
      cgpa: 4.6,
      faculty: 'Engineering and Computing',
      rating: 4.8,
      reviews: 94,
      bio: 'Top Engineering student with 4.6 CGPA, passionate about making complex concepts simple',
      availability: 'Tue, Thu, Sat',
      sessionTypes: ['online', 'in-person'],
    },
    {
      id: '3',
      name: 'Zainab Kamara',
      avatar: 'https://images.unsplash.com/photo-1638727295415-286409421143?w=400&h=400&fit=crop',
      subjects: ['Financial Management', 'Accounting'],
      courses: ['BUS201', 'BUS305', 'ACC301'],
      year: 4,
      cgpa: 4.9,
      faculty: 'Business',
      rating: 5.0,
      reviews: 156,
      bio: 'Outstanding First Class Honours student with 4.9 CGPA at UCU, expertise in finance and accounting',
      availability: 'Mon, Tue, Thu',
      sessionTypes: ['online'],
    },
    {
      id: '4',
      name: 'Tunde Okonkwo',
      avatar: 'https://images.unsplash.com/photo-1656313836297-0cd072f08f43?w=400&h=400&fit=crop',
      subjects: ['Marketing', 'Business Strategy'],
      courses: ['BUS101', 'BUS201', 'MKT301'],
      year: 3,
      cgpa: 4.5,
      faculty: 'Business',
      rating: 4.7,
      reviews: 83,
      bio: 'High-achieving Business student with 4.5 CGPA, helping peers excel in marketing and strategy',
      availability: 'Mon, Wed, Fri, Sat',
      sessionTypes: ['online', 'in-person'],
    },
    {
      id: '5',
      name: 'Amina Diop',
      avatar: 'https://images.unsplash.com/photo-1685539527395-4417cebc39aa?w=400&h=400&fit=crop',
      subjects: ['Computer Networks', 'Cybersecurity'],
      courses: ['CS301', 'CS405', 'NET201'],
      year: 4,
      cgpa: 4.7,
      faculty: 'Engineering and Computing',
      rating: 4.9,
      reviews: 112,
      bio: 'Elite Computing student with 4.7 CGPA, specializing in network security and ethical hacking',
      availability: 'Tue, Wed, Fri',
      sessionTypes: ['online', 'in-person'],
    },
    {
      id: '6',
      name: 'Oluwatobi Adeleke',
      avatar: 'https://images.unsplash.com/photo-1631131431211-4f768d89087d?w=400&h=400&fit=crop',
      subjects: ['Economics', 'Statistics'],
      courses: ['ECON201', 'STAT301', 'BUS202'],
      year: 3,
      cgpa: 4.6,
      faculty: 'Business',
      rating: 4.8,
      reviews: 98,
      bio: 'Economics major with 4.6 CGPA at UCU, excellent at simplifying statistical and econometric concepts',
      availability: 'Mon, Thu, Sat',
      sessionTypes: ['online', 'in-person'],
    },
  ];

  const handleBookSession = (tutor: any) => {
    setSelectedTutor(tutor);
    setBookingDialogOpen(true);
  };

  const handleViewProfile = (tutor: any) => {
    setSelectedTutor(tutor);
    setProfileDialogOpen(true);
  };

  // Combine static and dynamic tutors
  const allTutors = [...staticTutors, ...dynamicTutors];

  // Filter tutors based on search and filters
  const tutors = allTutors.filter((tutor) => {
    const matchesSearch = searchTerm === '' || 
      tutor.subjects?.some((subject: string) => subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
      tutor.courses?.some((course: string) => course.toLowerCase().includes(searchTerm.toLowerCase())) ||
      tutor.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesYear = selectedYear === 'all' || tutor.year?.toString() === selectedYear;

    const matchesFaculty = selectedSubject === 'all' || 
      (selectedSubject === 'engineering' && tutor.faculty?.toLowerCase().includes('engineering')) ||
      (selectedSubject === 'business' && tutor.faculty?.toLowerCase().includes('business'));

    return matchesSearch && matchesYear && matchesFaculty;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1>Find Your Perfect Tutor</h1>
          <p className="text-muted-foreground">
            Browse tutors by subject, course code, or availability
          </p>
        </div>

        {/* Filters */}
        <Card className="border-violet-200">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by course code or subject..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Year Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="1">Year 1</SelectItem>
                  <SelectItem value="2">Year 2</SelectItem>
                  <SelectItem value="3">Year 3</SelectItem>
                  <SelectItem value="4">Year 4</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Faculty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Faculties</SelectItem>
                  <SelectItem value="engineering">Engineering & Computing</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tutors Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {tutors.map((tutor) => (
            <Card key={tutor.id} className="hover:shadow-xl transition-all border-violet-200 hover:border-violet-400">
              <CardHeader>
                <div className="flex gap-4">
                  <Avatar className="w-16 h-16 border-2 border-violet-200">
                    <AvatarImage src={tutor.avatar} alt={tutor.name} />
                    <AvatarFallback>{tutor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3>{tutor.name}</h3>
                    <p className="text-muted-foreground">Year {tutor.year} • CGPA: {tutor.cgpa}</p>
                    <Badge variant="secondary" className="mt-1 bg-violet-100 text-violet-700">{tutor.faculty}</Badge>
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{tutor.rating}</span>
                      <span className="text-muted-foreground">({tutor.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{tutor.bio}</p>
                
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {tutor.courses.map((course) => (
                      <Badge key={course} variant="secondary" className="bg-violet-100 text-violet-700">
                        {course}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{tutor.availability}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {tutor.sessionTypes.includes('online') && (
                        <Video className="w-4 h-4 text-violet-600" />
                      )}
                      {tutor.sessionTypes.includes('in-person') && (
                        <MapPin className="w-4 h-4 text-purple-600" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                    onClick={() => handleBookSession(tutor)}
                  >
                    Book Session
                  </Button>
                  <Button variant="outline" className="border-violet-300 hover:bg-violet-50" onClick={() => handleViewProfile(tutor)}>View Profile</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedTutor && (
        <BookSessionDialog
          open={bookingDialogOpen}
          onOpenChange={setBookingDialogOpen}
          tutor={selectedTutor}
          currentUser={currentUser}
        />
      )}

      {selectedTutor && (
        <TutorProfileDialog
          open={profileDialogOpen}
          onOpenChange={setProfileDialogOpen}
          tutor={selectedTutor}
          onBookSession={handleBookSession}
        />
      )}
    </div>
  );
}