import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { AVAILABLE_REACTIONS, MOCK_SYSTEM_USER_ID } from '../constants'; // Changed MOCK_USER_ID to MOCK_SYSTEM_USER_ID
import { postService } from '../services/postService';
import ReactionButton from './ReactionButton';
import CommentSection from './CommentSection';
import { useLanguage } from '../contexts/LanguageContext';
import ShareIcon from './icons/ShareIcon';
import SharePostModal from './SharePostModal';
const PostCard = ({ post, onPostUpdate }) => {
    const [showComments, setShowComments] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const { language: currentAppLanguage, translate } = useLanguage();
    const handleReaction = async (reactionType) => {
        // In a real app, you'd check if the user already reacted with this type to toggle it.
        // For simplicity, this just increments.
        // Using MOCK_SYSTEM_USER_ID as a placeholder since individual user tracking for reactions is not fully implemented.
        const updatedPost = await postService.toggleReactionToPost(post.id, reactionType, MOCK_SYSTEM_USER_ID); // Changed MOCK_USER_ID
        if (updatedPost) {
            onPostUpdate(updatedPost);
        }
    };
    const handleCommentAdded = (newComment) => {
        const updatedPost = { ...post, comments: [...post.comments, newComment] };
        onPostUpdate(updatedPost); // This updates the local state in Feed.tsx
        // The postService already saved it to localStorage
    };
    const postLanguageClass = post.language === 'ne' ? 'font-nepali' : '';
    const authorName = post.isAnonymous ? translate('anonymousUser') : post.author.name;
    const timeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
        const minutes = Math.round(seconds / 60);
        const hours = Math.round(minutes / 60);
        const days = Math.round(hours / 24);
        const rtf = new Intl.RelativeTimeFormat(currentAppLanguage, { numeric: 'auto' });
        if (seconds < 60)
            return rtf.format(-seconds, 'second');
        if (minutes < 60)
            return rtf.format(-minutes, 'minute');
        if (hours < 24)
            return rtf.format(-hours, 'hour');
        return rtf.format(-days, 'day');
    };
    return (_jsxs("div", { className: `bg-card shadow-lg rounded-xl p-5 my-4 hover:shadow-xl transition-shadow duration-300 ${postLanguageClass}`, children: [_jsxs("div", { className: "flex items-center mb-3", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold mr-3", children: authorName.substring(0, 1).toUpperCase() }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold text-text", children: authorName }), _jsx("p", { className: "text-xs text-text-muted", children: timeAgo(post.createdAt) })] })] }), post.imageUrl && (_jsx("img", { src: post.imageUrl, alt: "Post image", className: "rounded-lg my-3 max-h-96 w-full object-contain" })), _jsx("p", { className: "text-text-main dark:text-gray-200 mb-3 whitespace-pre-wrap text-base leading-relaxed", children: post.content }), post.voiceNoteUrl && (_jsx("div", { className: "my-3", children: _jsx("audio", { controls: true, src: post.voiceNoteUrl, className: "w-full", children: "Your browser does not support the audio element." }) })), post.tags.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-2 mb-3", children: post.tags.map(tag => (_jsxs("span", { className: "text-xs bg-primary-light dark:bg-primary-dark text-primary-dark dark:text-primary-light px-2.5 py-1 rounded-full cursor-pointer hover:opacity-80 transition-opacity", children: ["#", tag] }, tag))) })), _jsxs("div", { className: "flex justify-between items-center border-t border-b border-border py-2 my-2", children: [_jsx("div", { className: "flex space-x-1", children: AVAILABLE_REACTIONS.map(reactionType => (_jsx(ReactionButton, { type: reactionType, count: post.reactions[reactionType] || 0, onClick: () => handleReaction(reactionType) }, reactionType))) }), _jsx("button", { onClick: () => setIsShareModalOpen(true), className: "p-2 text-text-muted hover:text-accent transition-colors", title: translate('share'), children: _jsx(ShareIcon, { className: "w-5 h-5" }) })] }), _jsx("button", { onClick: () => setShowComments(!showComments), className: "text-sm text-primary hover:underline", children: showComments ? (currentAppLanguage === 'ne' ? 'टिप्पणीहरू लुकाउनुहोस्' : 'Hide Comments') : `${translate('comments')} (${post.comments.length})` }), showComments && _jsx(CommentSection, { postId: post.id, comments: post.comments, onCommentAdded: handleCommentAdded, postLanguage: post.language }), _jsx(SharePostModal, { post: post, isOpen: isShareModalOpen, onClose: () => setIsShareModalOpen(false) })] }));
};
export default PostCard;
