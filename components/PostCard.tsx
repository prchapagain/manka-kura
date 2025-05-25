
import React, { useState } from 'react';
import { Post, ReactionType, Comment as CommentType } from '../types';
import { AVAILABLE_REACTIONS, MOCK_SYSTEM_USER_ID, TRANSLATIONS } from '../constants'; // Changed MOCK_USER_ID to MOCK_SYSTEM_USER_ID
import { postService } from '../services/postService';
import ReactionButton from './ReactionButton';
import CommentSection from './CommentSection';
import { useLanguage } from '../contexts/LanguageContext';
import ShareIcon from './icons/ShareIcon';
import SharePostModal from './SharePostModal';

interface PostCardProps {
  post: Post;
  onPostUpdate: (updatedPost: Post) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onPostUpdate }) => {
  const [showComments, setShowComments] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { language: currentAppLanguage, translate } = useLanguage();

  const handleReaction = async (reactionType: ReactionType) => {
    // In a real app, you'd check if the user already reacted with this type to toggle it.
    // For simplicity, this just increments.
    // Using MOCK_SYSTEM_USER_ID as a placeholder since individual user tracking for reactions is not fully implemented.
    const updatedPost = await postService.toggleReactionToPost(post.id, reactionType, MOCK_SYSTEM_USER_ID); // Changed MOCK_USER_ID
    if (updatedPost) {
      onPostUpdate(updatedPost);
    }
  };

  const handleCommentAdded = (newComment: CommentType) => {
    const updatedPost = { ...post, comments: [...post.comments, newComment] };
    onPostUpdate(updatedPost); // This updates the local state in Feed.tsx
                               // The postService already saved it to localStorage
  };
  
  const postLanguageClass = post.language === 'ne' ? 'font-nepali' : '';
  const authorName = post.isAnonymous ? translate('anonymousUser') : post.author.name;

  const timeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);

    const rtf = new Intl.RelativeTimeFormat(currentAppLanguage, { numeric: 'auto' });

    if (seconds < 60) return rtf.format(-seconds, 'second');
    if (minutes < 60) return rtf.format(-minutes, 'minute');
    if (hours < 24) return rtf.format(-hours, 'hour');
    return rtf.format(-days, 'day');
  };


  return (
    <div className={`bg-card shadow-lg rounded-xl p-5 my-4 hover:shadow-xl transition-shadow duration-300 ${postLanguageClass}`}>
      <div className="flex items-center mb-3">
        {/* Avatar placeholder */}
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold mr-3">
          {authorName.substring(0, 1).toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-text">{authorName}</p>
          <p className="text-xs text-text-muted">{timeAgo(post.createdAt)}</p>
        </div>
      </div>

      {post.imageUrl && (
        <img src={post.imageUrl} alt="Post image" className="rounded-lg my-3 max-h-96 w-full object-contain" />
      )}

      <p className="text-text-main dark:text-gray-200 mb-3 whitespace-pre-wrap text-base leading-relaxed">
        {post.content}
      </p>
      
      {post.voiceNoteUrl && (
        <div className="my-3">
          <audio controls src={post.voiceNoteUrl} className="w-full">
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs bg-primary-light dark:bg-primary-dark text-primary-dark dark:text-primary-light px-2.5 py-1 rounded-full cursor-pointer hover:opacity-80 transition-opacity">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center border-t border-b border-border py-2 my-2">
        <div className="flex space-x-1">
          {AVAILABLE_REACTIONS.map(reactionType => (
            <ReactionButton
              key={reactionType}
              type={reactionType}
              count={post.reactions[reactionType] || 0}
              onClick={() => handleReaction(reactionType)}
              // reacted={post.userReaction === reactionType} // Simplified, not tracking individual user reactions
            />
          ))}
        </div>
        <button 
          onClick={() => setIsShareModalOpen(true)}
          className="p-2 text-text-muted hover:text-accent transition-colors"
          title={translate('share')}
        >
          <ShareIcon className="w-5 h-5" />
        </button>
      </div>
      
      <button onClick={() => setShowComments(!showComments)} className="text-sm text-primary hover:underline">
        {showComments ? (currentAppLanguage === 'ne' ? 'टिप्पणीहरू लुकाउनुहोस्' : 'Hide Comments') : `${translate('comments')} (${post.comments.length})`}
      </button>

      {showComments && <CommentSection postId={post.id} comments={post.comments} onCommentAdded={handleCommentAdded} postLanguage={post.language} />}
      
      <SharePostModal post={post} isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
    </div>
  );
};

export default PostCard;
