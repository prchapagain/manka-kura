import React, { useState, useCallback, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { UserProvider, useUser } from './contexts/UserContext';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import Modal from './components/Modal'; // For create user modal
import { DEFAULT_USER_NAME } from './constants';
import ProfilePage from './components/ProfilePage'; // Import ProfilePage

const CreateUserModalContent: React.FC<{ onUserCreated: (name: string) => void }> = ({ onUserCreated }) => {
  const [name, setName] = useState('');
  const { translate } = useLanguage();

  const handleSubmit = () => {
    if (name.trim()) {
      onUserCreated(name.trim());
    } else {
      onUserCreated(DEFAULT_USER_NAME); // Use default if empty
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-center text-text-muted">{translate('welcomeToManKaKura')}</p>
      <div>
        <label htmlFor="userName" className="block text-sm font-medium text-text-muted">
          {translate('whatsYourName')}
        </label>
        <input
          id="userName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={DEFAULT_USER_NAME}
          className="mt-1 w-full p-2 border border-border rounded-lg bg-background dark:bg-gray-700 focus:ring-1 focus:ring-primary focus:border-transparent outline-none"
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
      >
        {translate('saveAndStart')}
      </button>
    </div>
  );
};


const AppContent: React.FC = () => {
  const [isPostFormModalOpen, setIsPostFormModalOpen] = useState(false);
  const { translate } = useLanguage();
  const { currentUser, setCurrentUser, isLoadingUser } = useUser();
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const location = useLocation();


  useEffect(() => {
    document.title = translate('appName');
  }, [translate]);

  useEffect(() => {
    if (!isLoadingUser && !currentUser) {
      setShowCreateUserModal(true);
    } else if (currentUser) {
      setShowCreateUserModal(false);
    }
  }, [currentUser, isLoadingUser]);

  const openPostFormModal = useCallback(() => {
    if (currentUser) { // Only allow opening if user is set
        setIsPostFormModalOpen(true);
    } else {
        setShowCreateUserModal(true); // Prompt to create user first
    }
  }, [currentUser]);

  const closePostFormModal = useCallback(() => {
    setIsPostFormModalOpen(false);
  }, []);
  
  const handlePostCreatedInModal = useCallback(() => {
    setIsPostFormModalOpen(false);
  }, []);

  const handleUserCreated = (name: string) => {
    const newId = Date.now().toString(); // Simple unique ID
    setCurrentUser({ id: newId, name });
    setShowCreateUserModal(false);
  };
  
  if (isLoadingUser) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary"></div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-background text-text flex flex-col">
      <Navbar onNewPostClick={openPostFormModal} />
      <main className="flex-grow">
        {showCreateUserModal && !currentUser ? (
          <Modal isOpen={showCreateUserModal} onClose={() => handleUserCreated(DEFAULT_USER_NAME)} title={translate('setNickname')} size="sm">
            <CreateUserModalContent onUserCreated={handleUserCreated} />
          </Modal>
        ) : (
          <Routes>
            <Route path="/" element={
              <Feed 
                isPostFormOpen={isPostFormModalOpen} 
                onClosePostForm={closePostFormModal}
                onPostCreatedInModal={handlePostCreatedInModal}
              />} 
            />
            <Route path="/profile" element={<ProfilePage />} /> 
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </main>
      <footer className="py-4 text-center text-xs text-text-muted border-t border-border">
        &copy; {new Date().getFullYear()} {translate('appName')}. {translate('tagline')}
      </footer>
    </div>
  );
}

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <UserProvider> {/* UserProvider wraps router and AppContent */}
          <HashRouter>
            <AppContent />
          </HashRouter>
        </UserProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
