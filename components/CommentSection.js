import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { Language } from '../types';
import { postService } from '../services/postService';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext'; // Import useUser
import PaperAirplaneIcon from './icons/PaperAirplaneIcon';
const CommentSection = ({ postId, comments, onCommentAdded, postLanguage }) => {
    const [newComment, setNewComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { translate, language: currentAppLanguage } = useLanguage();
    const { currentUser } = useUser(); // Get currentUser from context
    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim() || !currentUser) {
            // Do not allow anonymous comments for simplicity, or handle explicitly if needed
            if (!currentUser) {
                alert(translate('setNickname')); // Or a more specific message
                return;
            }
            return;
        }
        setIsSubmitting(true);
        try {
            // Comments are always by the logged-in user (not anonymous in this simplified version)
            const commentAuthor = currentUser;
            const addedComment = await postService.addCommentToPost(postId, newComment, commentAuthor);
            if (addedComment) {
                onCommentAdded(addedComment);
                setNewComment('');
            }
        }
        catch (error) {
            console.error("Failed to add comment:", error);
            // Handle error UI if needed
        }
        finally {
            setIsSubmitting(false);
        }
    };
    return (_jsxs("div", { className: `mt-4 pt-4 border-t border-border ${postLanguage === Language.NEPALI ? 'font-nepali' : ''}`, children: [_jsxs("h4", { className: "text-md font-semibold mb-2 text-text", children: [translate('comments'), " (", comments.length, ")"] }), _jsxs("form", { onSubmit: handleSubmitComment, className: "flex items-center space-x-2 mb-4", children: [_jsx("input", { type: "text", value: newComment, onChange: (e) => setNewComment(e.target.value), placeholder: currentUser ? translate('addComment') : translate('setNickname') + ' to comment', className: "flex-grow p-2 border border-border rounded-lg bg-background dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow text-sm", disabled: isSubmitting || !currentUser }), _jsx("button", { type: "submit", disabled: isSubmitting || !newComment.trim() || !currentUser, className: "p-2 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light disabled:opacity-50 transition-colors", "aria-label": translate('postComment'), children: _jsx(PaperAirplaneIcon, { className: "w-5 h-5" }) })] }), _jsxs("div", { className: "space-y-3 max-h-60 overflow-y-auto pr-1", children: [comments.length === 0 && (_jsx("p", { className: "text-sm text-text-muted" })), comments.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((comment) => (_jsxs("div", { className: "p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm", children: [_jsx("p", { className: "font-semibold text-primary-dark dark:text-primary-light", children: comment.author.name }), _jsx("p", { className: "text-text dark:text-gray-200 whitespace-pre-wrap", children: comment.content }), _jsx("p", { className: "text-xs text-text-muted mt-1", children: new Date(comment.createdAt).toLocaleString(currentAppLanguage, { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }) })] }, comment.id)))] })] }));
};
export default CommentSection;
