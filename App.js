import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { UserProvider, useUser } from './contexts/UserContext';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import Modal from './components/Modal'; // For create user modal
import { DEFAULT_USER_NAME } from './constants';
import ProfilePage from './components/ProfilePage'; // Import ProfilePage
const CreateUserModalContent = ({ onUserCreated }) => {
    const [name, setName] = useState('');
    const { translate } = useLanguage();
    const handleSubmit = () => {
        if (name.trim()) {
            onUserCreated(name.trim());
        }
        else {
            onUserCreated(DEFAULT_USER_NAME); // Use default if empty
        }
    };
    return (_jsxs("div", { className: "space-y-4", children: [_jsx("p", { className: "text-center text-text-muted", children: translate('welcomeToManKaKura') }), _jsxs("div", { children: [_jsx("label", { htmlFor: "userName", className: "block text-sm font-medium text-text-muted", children: translate('whatsYourName') }), _jsx("input", { id: "userName", type: "text", value: name, onChange: (e) => setName(e.target.value), placeholder: DEFAULT_USER_NAME, className: "mt-1 w-full p-2 border border-border rounded-lg bg-background dark:bg-gray-700 focus:ring-1 focus:ring-primary focus:border-transparent outline-none", onKeyPress: (e) => e.key === 'Enter' && handleSubmit() })] }), _jsx("button", { onClick: handleSubmit, className: "w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors", children: translate('saveAndStart') })] }));
};
const AppContent = () => {
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
        }
        else if (currentUser) {
            setShowCreateUserModal(false);
        }
    }, [currentUser, isLoadingUser]);
    const openPostFormModal = useCallback(() => {
        if (currentUser) { // Only allow opening if user is set
            setIsPostFormModalOpen(true);
        }
        else {
            setShowCreateUserModal(true); // Prompt to create user first
        }
    }, [currentUser]);
    const closePostFormModal = useCallback(() => {
        setIsPostFormModalOpen(false);
    }, []);
    const handlePostCreatedInModal = useCallback(() => {
        setIsPostFormModalOpen(false);
    }, []);
    const handleUserCreated = (name) => {
        const newId = Date.now().toString(); // Simple unique ID
        setCurrentUser({ id: newId, name });
        setShowCreateUserModal(false);
    };
    if (isLoadingUser) {
        return (_jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: _jsx("div", { className: "animate-spin rounded-full h-16 w-16 border-b-4 border-primary" }) }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-background text-text flex flex-col", children: [_jsx(Navbar, { onNewPostClick: openPostFormModal }), _jsx("main", { className: "flex-grow", children: showCreateUserModal && !currentUser ? (_jsx(Modal, { isOpen: showCreateUserModal, onClose: () => handleUserCreated(DEFAULT_USER_NAME), title: translate('setNickname'), size: "sm", children: _jsx(CreateUserModalContent, { onUserCreated: handleUserCreated }) })) : (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Feed, { isPostFormOpen: isPostFormModalOpen, onClosePostForm: closePostFormModal, onPostCreatedInModal: handlePostCreatedInModal }) }), _jsx(Route, { path: "/profile", element: _jsx(ProfilePage, {}) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/" }) })] })) }), _jsxs("footer", { className: "py-4 text-center text-xs text-text-muted border-t border-border", children: ["\u00A9 ", new Date().getFullYear(), " ", translate('appName'), ". ", translate('tagline')] })] }));
};
const App = () => {
    return (_jsx(ThemeProvider, { children: _jsx(LanguageProvider, { children: _jsxs(UserProvider, { children: [" ", _jsx(HashRouter, { children: _jsx(AppContent, {}) })] }) }) }));
};
export default App;
