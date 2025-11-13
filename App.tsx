import { useState, useEffect } from 'react';
import { HomePage } from './components/HomePage';
import { FindTutorsPage } from './components/FindTutorsPage';
import { SessionsPage } from './components/SessionsPage';
import { ProfilePage } from './components/ProfilePage';
import { MessagesPage } from './components/MessagesPage';
import { Header } from './components/Header';
import { Toaster } from './components/Toaster';
import { SignUpDialog } from './components/SignUpDialog';
import { LoginDialog } from './components/LoginDialog';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Load current user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('tutorpal_currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('tutorpal_currentUser');
    setCurrentUser(null);
    setCurrentPage('home');
  };

  const handleLoginSuccess = (user: any) => {
    setCurrentUser(user);
  };

  const handleSignUpSuccess = (user: any) => {
    setCurrentUser(user);
  };

  const renderPage = () => {
    // If not logged in, show only home page
    if (!currentUser) {
      return (
        <HomePage 
          onNavigate={setCurrentPage}
          currentUser={currentUser}
          onShowLogin={() => setShowLogin(true)}
          onShowSignUp={() => setShowSignUp(true)}
        />
      );
    }

    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            onNavigate={setCurrentPage}
            currentUser={currentUser}
            onShowLogin={() => setShowLogin(true)}
            onShowSignUp={() => setShowSignUp(true)}
          />
        );
      case 'tutors':
        return <FindTutorsPage currentUser={currentUser} />;
      case 'sessions':
        return <SessionsPage currentUser={currentUser} />;
      case 'messages':
        return <MessagesPage currentUser={currentUser} />;
      case 'profile':
        return <ProfilePage currentUser={currentUser} />;
      default:
        return (
          <HomePage 
            onNavigate={setCurrentPage}
            currentUser={currentUser}
            onShowLogin={() => setShowLogin(true)}
            onShowSignUp={() => setShowSignUp(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-purple-100">
      <Header 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        currentUser={currentUser}
        onShowLogin={() => setShowLogin(true)}
        onShowSignUp={() => setShowSignUp(true)}
        onLogout={handleLogout}
      />
      <main className="pb-8">
        {renderPage()}
      </main>
      <Toaster />
      
      <SignUpDialog
        open={showSignUp}
        onOpenChange={setShowSignUp}
        onSignUpSuccess={handleSignUpSuccess}
      />
      
      <LoginDialog
        open={showLogin}
        onOpenChange={setShowLogin}
        onLoginSuccess={handleLoginSuccess}
        onSwitchToSignUp={() => {
          setShowLogin(false);
          setShowSignUp(true);
        }}
      />
    </div>
  );
}
