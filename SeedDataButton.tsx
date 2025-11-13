import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';
import { Database } from 'lucide-react';

export function SeedDataButton() {
  const seedDemoData = () => {
    const demoUsers = [
      // Demo Students
      {
        id: 'demo-student-1',
        name: 'Amara Okafor',
        email: 'amara@ucu.ac.ug',
        password: 'password',
        role: 'student',
        year: '3',
        major: 'Software Engineering',
        faculty: 'Engineering and Computing',
        avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop',
        bio: 'Third-year Software Engineering student passionate about algorithms and data structures',
        rating: 4.8,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'demo-student-2',
        name: 'Kwesi Mensah',
        email: 'kwesi@ucu.ac.ug',
        password: 'password',
        role: 'student',
        year: '2',
        major: 'Business Administration',
        faculty: 'Business and Management',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        bio: 'Business student focused on entrepreneurship and financial management',
        rating: 4.5,
        createdAt: new Date().toISOString(),
      },
      // Demo Tutors
      {
        id: 'demo-tutor-1',
        name: 'Chinwe Adebayo',
        email: 'chinwe@ucu.ac.ug',
        password: 'password',
        role: 'tutor',
        cgpa: 4.85,
        year: '4',
        major: 'Computer Science',
        faculty: 'Engineering and Computing',
        specializations: ['Data Structures', 'Algorithms', 'Web Development'],
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
        bio: 'Senior CS student with a passion for teaching. Specialized in algorithms and data structures.',
        rating: 4.9,
        totalReviews: 45,
        sessionsCompleted: 67,
        availability: ['Monday 2-4 PM', 'Wednesday 10 AM-12 PM', 'Friday 3-5 PM'],
        createdAt: new Date().toISOString(),
      },
      {
        id: 'demo-tutor-2',
        name: 'Kofi Asante',
        email: 'kofi@ucu.ac.ug',
        password: 'password',
        role: 'tutor',
        cgpa: 4.75,
        year: '4',
        major: 'Accounting',
        faculty: 'Business and Management',
        specializations: ['Financial Accounting', 'Cost Accounting', 'Auditing'],
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
        bio: 'Experienced accounting tutor helping students master financial concepts and excel in exams.',
        rating: 4.8,
        totalReviews: 38,
        sessionsCompleted: 52,
        availability: ['Tuesday 3-5 PM', 'Thursday 11 AM-1 PM', 'Saturday 2-4 PM'],
        createdAt: new Date().toISOString(),
      },
      {
        id: 'demo-tutor-3',
        name: 'Zara Nkosi',
        email: 'zara@ucu.ac.ug',
        password: 'password',
        role: 'tutor',
        cgpa: 4.92,
        year: '3',
        major: 'Software Engineering',
        faculty: 'Engineering and Computing',
        specializations: ['Object-Oriented Programming', 'Database Systems', 'Mobile Development'],
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
        bio: 'Top-performing engineering student dedicated to helping peers understand complex programming concepts.',
        rating: 5.0,
        totalReviews: 29,
        sessionsCompleted: 42,
        availability: ['Monday 1-3 PM', 'Wednesday 2-4 PM', 'Friday 10 AM-12 PM'],
        createdAt: new Date().toISOString(),
      },
    ];

    localStorage.setItem('tutorpal_users', JSON.stringify(demoUsers));
    toast.success('Demo accounts created! You can now login with any email (password: "password")');
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={seedDemoData}
      className="border-violet-300"
    >
      <Database className="w-4 h-4 mr-2" />
      Create Demo Accounts
    </Button>
  );
}
