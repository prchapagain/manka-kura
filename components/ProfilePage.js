import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { useLanguage } from '../contexts/LanguageContext';
import { postService } from '../services/postService';
import PostCard from './PostCard';
import { Link } from 'react-router-dom';
const ProfilePage = () => {
    const { currentUser } = useUser();
    const { translate, language } = useLanguage();
    const [userPosts, setUserPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchUserPosts = async () => {
            if (currentUser) {
                setIsLoading(true);
                try {
                    const posts = await postService.getPostsByAuthorId(currentUser.id);
                    setUserPosts(posts);
                }
                catch (error) {
                    console.error("Failed to fetch user posts:", error);
                }
                finally {
                    setIsLoading(false);
                }
            }
            else {
                setIsLoading(false);
                setUserPosts([]); // Clear posts if no user
            }
        };
        fetchUserPosts();
    }, [currentUser]);
    const handlePostUpdate = (updatedPost) => {
        setUserPosts(currentPosts => currentPosts.map(p => (p.id === updatedPost.id ? updatedPost : p)));
        // Also update the main post list if needed, or rely on Feed's separate fetch
    };
    if (!currentUser) {
        return (_jsxs("div", { className: `container mx-auto px-4 py-8 text-center ${language === 'ne' ? 'font-nepali' : ''}`, children: [_jsxs("p", { className: "text-xl text-text-muted", children: [translate('setNickname'), " ", translate('appName'), "."] }), _jsx(Link, { to: "/", className: "mt-4 inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark", children: language === 'ne' ? 'गृहपृष्ठमा फर्कनुहोस्' : 'Back to Home' })] }));
    }
    return (_jsxs("div", { className: `container mx-auto px-2 sm:px-4 py-8 max-w-2xl ${language === 'ne' ? 'font-nepali' : ''}`, children: [_jsxs("div", { className: "bg-card shadow-lg rounded-xl p-6 mb-8 text-center", children: [_jsx("div", { className: "w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-4xl font-semibold mx-auto mb-4", children: currentUser.name.substring(0, 1).toUpperCase() }), _jsx("h1", { className: "text-3xl font-bold text-primary mb-1", children: currentUser.name }), _jsxs("p", { className: "text-text-muted", children: [translate('thoughtsBy'), " ", currentUser.name] })] }), _jsx("h2", { className: "text-2xl font-semibold text-text mb-6", children: translate('myKuras') }), isLoading ? (_jsxs("div", { className: "text-center py-10", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" }), _jsx("p", { className: "mt-3 text-text-muted", children: "Loading your Kuras..." })] })) : userPosts.length === 0 ? (_jsxs("div", { className: "text-center py-10 px-4 text-text-muted", children: [_jsx("p", { className: "text-xl mb-2", children: "\uD83D\uDCDD" }), _jsx("p", { children: translate('noKurasYet') })] })) : (_jsx("div", { className: "space-y-1", children: userPosts.map(post => (_jsx(PostCard, { post: post, onPostUpdate: handlePostUpdate }, post.id))) }))] }));
};
export default ProfilePage;
