import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext'; // Import useUser
import { Theme, Language } from '../types';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import PlusIcon from './icons/PlusIcon';
import GlobeAltIcon from './icons/GlobeAltIcon';
import Modal from './Modal';
import CommunityGuidelines from './CommunityGuidelines';
const Navbar = ({ onNewPostClick }) => {
    const { theme, toggleTheme } = useTheme();
    const { language, setLanguage, translate } = useLanguage();
    const { currentUser, setCurrentUser: saveUser, isLoadingUser } = useUser(); // Use UserContext
    const [isGuidelinesModalOpen, setIsGuidelinesModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); // For editing name
    const [tempName, setTempName] = useState('');
    useEffect(() => {
        if (currentUser) {
            setTempName(currentUser.name);
        }
    }, [currentUser]);
    const handleLanguageChange = (lang) => {
        setLanguage(lang);
    };
    const handleSaveName = () => {
        if (tempName.trim() && currentUser) {
            const updatedUser = { ...currentUser, name: tempName.trim() };
            saveUser(updatedUser); // This will save to localStorage via UserContext
            setIsProfileModalOpen(false);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx("nav", { className: "bg-card shadow-md sticky top-0 z-40 py-3 px-4 md:px-6", children: _jsxs("div", { className: "container mx-auto flex items-center justify-between", children: [_jsx(Link, { to: "/", className: `text-2xl font-bold text-primary ${language === Language.NEPALI ? 'font-nepali' : ''}`, children: translate('appName') }), _jsxs("div", { className: "flex items-center space-x-2 sm:space-x-3", children: [_jsxs("button", { onClick: onNewPostClick, className: "flex items-center bg-primary text-white px-3 py-2 rounded-lg hover:bg-primary-dark transition-colors text-sm", title: translate('newPost'), disabled: isLoadingUser || !currentUser, children: [_jsx(PlusIcon, { className: "w-5 h-5 sm:mr-1" }), _jsx("span", { className: "hidden sm:inline", children: translate('newPost') })] }), _jsxs("div", { className: "relative group", children: [_jsx("button", { className: "p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-text-muted", title: translate('language'), children: _jsx(GlobeAltIcon, { className: "w-6 h-6" }) }), _jsxs("div", { className: "absolute right-0 mt-2 w-36 bg-card border border-border rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 invisible group-hover:visible py-1 z-50", children: [_jsx("a", { href: "#", onClick: (e) => { e.preventDefault(); handleLanguageChange(Language.ENGLISH); }, className: `block px-4 py-2 text-sm ${language === Language.ENGLISH ? 'font-semibold text-primary' : 'text-text-muted'} hover:bg-gray-100 dark:hover:bg-gray-700`, children: translate('english') }), _jsx("a", { href: "#", onClick: (e) => { e.preventDefault(); handleLanguageChange(Language.NEPALI); }, className: `block px-4 py-2 text-sm ${language === Language.NEPALI ? 'font-semibold text-primary font-nepali' : 'text-text-muted font-nepali'} hover:bg-gray-100 dark:hover:bg-gray-700`, children: translate('nepali') })] })] }), _jsx("button", { onClick: toggleTheme, className: "p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-text-muted", title: theme === Theme.LIGHT ? translate('darkMode') : translate('lightMode'), children: theme === Theme.LIGHT ? _jsx(MoonIcon, { className: "w-6 h-6" }) : _jsx(SunIcon, { className: "w-6 h-6" }) }), _jsx("button", { onClick: () => setIsGuidelinesModalOpen(true), className: "hidden sm:inline-block text-sm text-text-muted hover:text-primary transition-colors", children: translate('communityGuidelines') }), currentUser && !isLoadingUser && (_jsxs("div", { className: "relative group", children: [_jsx(Link, { to: "/profile", className: "text-sm text-text-muted hover:text-primary transition-colors truncate max-w-[100px] hidden sm:inline-block", title: translate('myProfile'), children: currentUser.name }), _jsxs("div", { className: "absolute right-0 mt-2 w-40 bg-card border border-border rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 invisible group-hover:visible py-1 z-50", children: [_jsx(Link, { to: "/profile", className: `block px-4 py-2 text-sm text-text-muted hover:bg-gray-100 dark:hover:bg-gray-700`, children: translate('myProfile') }), _jsx("button", { onClick: () => { setTempName(currentUser.name); setIsProfileModalOpen(true); }, className: `block w-full text-left px-4 py-2 text-sm text-text-muted hover:bg-gray-100 dark:hover:bg-gray-700`, children: translate('changeNickname') })] })] }))] })] }) }), _jsx(Modal, { isOpen: isGuidelinesModalOpen, onClose: () => setIsGuidelinesModalOpen(false), title: translate('guidelinesTitle'), size: "lg", children: _jsx(CommunityGuidelines, {}) }), _jsx(Modal, { isOpen: isProfileModalOpen, onClose: () => setIsProfileModalOpen(false), title: translate('editProfile'), children: _jsxs("div", { className: "space-y-4", children: [_jsx("label", { htmlFor: "profileName", className: "block text-sm font-medium text-text-muted", children: translate('nickname') }), _jsx("input", { id: "profileName", type: "text", value: tempName, onChange: (e) => setTempName(e.target.value), placeholder: translate('nickname'), className: "w-full p-2 border border-border rounded-lg bg-background dark:bg-gray-700 focus:ring-1 focus:ring-primary focus:border-transparent outline-none" }), _jsx("button", { onClick: handleSaveName, className: "w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors", children: translate('saveNickname') })] }) })] }));
};
export default Navbar;
