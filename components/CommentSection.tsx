import React, { useState } from 'react';
import { Comment, User, Language } from '../types';
import { postService } from '../services/postService';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext'; // Import useUser
import PaperAirplaneIcon from './icons/PaperAirplaneIcon';


interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  onCommentAdded: (newComment: Comment) => void;
  postLanguage: Language;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId, comments, onCommentAdded, postLanguage }) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { translate, language: currentAppLanguage } = useLanguage();
  const { currentUser } = useUser(); // Get currentUser from context
  
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser) {
        // Do not allow anonymous comments for simplicity, or handle explicitly if needed
        if(!currentUser) {
            alert(translate('setNickname')); // Or a more specific message
            return;
        }
      return;
    }

    setIsSubmitting(true);
    try {
      // Comments are always by the logged-in user (not anonymous in this simplified version)
      const commentAuthor: User = currentUser;
      const addedComment = await postService.addCommentToPost(postId, newComment, commentAuthor);
      if (addedComment) {
        onCommentAdded(addedComment);
        setNewComment('');
      }
    } catch (error) {
      console.error("Failed to add comment:", error);
      // Handle error UI if needed
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`mt-4 pt-4 border-t border-border ${postLanguage === Language.NEPALI ? 'font-nepali' : ''}`}>
      <h4 className="text-md font-semibold mb-2 text-text">{translate('comments')} ({comments.length})</h4>
      <form onSubmit={handleSubmitComment} className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={currentUser ? translate('addComment') : translate('setNickname') + ' to comment'}
          className="flex-grow p-2 border border-border rounded-lg bg-background dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow text-sm"
          disabled={isSubmitting || !currentUser}
        />
        <button
          type="submit"
          disabled={isSubmitting || !newComment.trim() || !currentUser}
          className="p-2 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light disabled:opacity-50 transition-colors"
          aria-label={translate('postComment')}
        >
          <PaperAirplaneIcon className="w-5 h-5"/>
        </button>
      </form>
      <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
        {comments.length === 0 && (
          <p className="text-sm text-text-muted">{/* No comments yet. Be the first to share your thoughts! */}</p>
        )}
        {comments.slice().sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((comment) => (
          <div key={comment.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm">
            <p className="font-semibold text-primary-dark dark:text-primary-light">
              {comment.author.name}
            </p>
            <p className="text-text dark:text-gray-200 whitespace-pre-wrap">{comment.content}</p>
            <p className="text-xs text-text-muted mt-1">
              {new Date(comment.createdAt).toLocaleString(currentAppLanguage, { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
