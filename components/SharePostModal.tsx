
import React from 'react';
import { Post, ReactionType } from '../types';
import Modal from './Modal';
import { useLanguage } from '../contexts/LanguageContext';
import { AVAILABLE_REACTIONS, TRANSLATIONS } from '../constants';
import HeartIcon from './icons/HeartIcon';
import SadIcon from './icons/SadIcon';
import ThinkingIcon from './icons/ThinkingIcon';
import GrowthIcon from './icons/GrowthIcon';


interface SharePostModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
}

const ReactionIconMini: React.FC<{ type: ReactionType; className?: string }> = ({ type, className }) => {
  const iconProps = { className: className || "w-4 h-4" };
  switch (type) {
    case ReactionType.HEART: return <HeartIcon {...iconProps} />;
    case ReactionType.SAD: return <SadIcon {...iconProps} />;
    case ReactionType.THINKING: return <ThinkingIcon {...iconProps} />;
    case ReactionType.GROWTH: return <GrowthIcon {...iconProps} />;
    default: return <span>{type}</span>;
  }
};

const SharePostModal: React.FC<SharePostModalProps> = ({ post, isOpen, onClose }) => {
  const { translate, language: currentAppLanguage } = useLanguage();

  if (!post) return null;

  const postLanguageClass = post.language === 'ne' ? 'font-nepali' : '';
  const appNameDisplay = TRANSLATIONS.appName[currentAppLanguage] || TRANSLATIONS.appName.en;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={translate('shareAsImage')} size="md">
      <div className="p-2 bg-gradient-to-br from-primary-light via-accent to-secondary dark:from-primary-dark dark:via-accent dark:to-secondary rounded-lg">
        <div id="shareable-content" className={`bg-card text-text p-6 rounded shadow-lg ${postLanguageClass}`}>
          {post.imageUrl && (
            <img src={post.imageUrl} alt="Post image" className="rounded-md mb-3 max-h-48 w-full object-cover" />
          )}
          <p className="text-lg mb-4 whitespace-pre-wrap">{post.content}</p>
          
          {post.voiceNoteUrl && (
            <div className="my-3 p-2 bg-gray-100 dark:bg-gray-700 rounded">
              <p className="text-sm text-text-muted">🎤 Voice Note</p>
              {/* In a real shareable image, audio can't play. This is for visual representation. */}
            </div>
          )}

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs bg-primary-light dark:bg-primary-dark text-primary-dark dark:text-primary-light px-2 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          )}
          <div className="flex justify-between items-center text-xs text-text-muted border-t border-border pt-3 mt-3">
            <span>
              {post.isAnonymous ? translate('anonymousUser') : post.author.name}
            </span>
            <span>{appNameDisplay}</span>
          </div>
           <div className="flex items-center space-x-2 mt-2">
            {AVAILABLE_REACTIONS.map(reactionType => {
              if (post.reactions[reactionType] > 0) {
                return (
                  <div key={reactionType} className="flex items-center text-xs text-text-muted">
                    <ReactionIconMini type={reactionType} className="w-3 h-3 mr-0.5" />
                    <span>{post.reactions[reactionType]}</span>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
      <p className="text-xs text-center mt-4 text-text-muted">
        {currentAppLanguage === 'ne' ? 'यो सामग्री स्क्रिनसट गर्नुहोस् र साझा गर्नुहोस्!' : 'Screenshot this content to share!'}
      </p>
    </Modal>
  );
};

export default SharePostModal;
