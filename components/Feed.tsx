
import React, { useState, useEffect, useCallback } from 'react';
import { Post } from '../types';
import { postService } from '../services/postService';
import PostCard from './PostCard';
import DailyPrompt from './DailyPrompt';
import PostForm from './PostForm';
import Modal from './Modal';
import { useLanguage } from '../contexts/LanguageContext';
import { TRANSLATIONS } from '../constants';


interface FeedProps {
  isPostFormOpen: boolean;
  onClosePostForm: () => void;
  onPostCreatedInModal: () => void;
}

const Feed: React.FC<FeedProps> = ({ isPostFormOpen, onClosePostForm, onPostCreatedInModal }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { translate, language } = useLanguage();


  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedPosts = await postService.getPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePostUpdate = (updatedPost: Post) => {
    setPosts(currentPosts =>
      currentPosts.map(p => (p.id === updatedPost.id ? updatedPost : p))
    );
  };
  
  const handlePostCreated = (newPost: Post) => {
    // Add to top of the list optimistically
    setPosts(prevPosts => [newPost, ...prevPosts]); 
    // Optionally, could refetch all posts: fetchPosts();
    if(onClosePostForm && isPostFormOpen) { // If the form was opened in a modal from feed
        onClosePostForm();
    }
    onPostCreatedInModal(); // This callback is to notify App.tsx to close its modal state
  };


  const filteredPosts = posts.filter(post => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const contentMatch = post.content.toLowerCase().includes(lowerSearchTerm);
    const tagMatch = post.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm.replace(/^#/, '')));
    const authorMatch = !post.isAnonymous && typeof post.author === 'object' && 'name' in post.author && post.author.name.toLowerCase().includes(lowerSearchTerm);
    return contentMatch || tagMatch || authorMatch;
  });

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 max-w-2xl">
      <DailyPrompt />

      <div className="my-4">
        <input
          type="text"
          placeholder={translate('searchPlaceholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full p-3 border border-border rounded-lg bg-card focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow text-text ${language === 'ne' ? 'font-nepali' : ''}`}
        />
      </div>
      
      {/* Post Form in Modal, controlled by App's state */}
      <Modal isOpen={isPostFormOpen} onClose={onClosePostForm} title={translate('newPost')} size="lg">
         <PostForm onPostCreated={handlePostCreated} onClose={onClosePostForm} />
      </Modal>


      {isLoading ? (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-3 text-text-muted">Loading Kura...</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className={`text-center py-10 px-4 text-text-muted ${language === 'ne' ? 'font-nepali' : ''}`}>
          <p className="text-xl mb-2">🌬️</p>
          <p>{searchTerm ? `No Kura found for "${searchTerm}".` : translate('noPosts')}</p>
        </div>
      ) : (
        <div className="space-y-1">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} onPostUpdate={handlePostUpdate} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;
