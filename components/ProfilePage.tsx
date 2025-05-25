import React, { useState, useEffect } from 'react';
import { Post } from '../types';
import { useUser } from '../contexts/UserContext';
import { useLanguage } from '../contexts/LanguageContext';
import { postService } from '../services/postService';
import PostCard from './PostCard';
import { Link } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { currentUser } = useUser();
  const { translate, language } = useLanguage();
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (currentUser) {
        setIsLoading(true);
        try {
          const posts = await postService.getPostsByAuthorId(currentUser.id);
          setUserPosts(posts);
        } catch (error) {
          console.error("Failed to fetch user posts:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        setUserPosts([]); // Clear posts if no user
      }
    };

    fetchUserPosts();
  }, [currentUser]);

  const handlePostUpdate = (updatedPost: Post) => {
    setUserPosts(currentPosts =>
      currentPosts.map(p => (p.id === updatedPost.id ? updatedPost : p))
    );
     // Also update the main post list if needed, or rely on Feed's separate fetch
  };


  if (!currentUser) {
    return (
      <div className={`container mx-auto px-4 py-8 text-center ${language === 'ne' ? 'font-nepali' : ''}`}>
        <p className="text-xl text-text-muted">{translate('setNickname')} {translate('appName')}.</p>
        <Link to="/" className="mt-4 inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
          {language === 'ne' ? 'गृहपृष्ठमा फर्कनुहोस्' : 'Back to Home'}
        </Link>
      </div>
    );
  }

  return (
    <div className={`container mx-auto px-2 sm:px-4 py-8 max-w-2xl ${language === 'ne' ? 'font-nepali' : ''}`}>
      <div className="bg-card shadow-lg rounded-xl p-6 mb-8 text-center">
        <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-4xl font-semibold mx-auto mb-4">
          {currentUser.name.substring(0, 1).toUpperCase()}
        </div>
        <h1 className="text-3xl font-bold text-primary mb-1">{currentUser.name}</h1>
        <p className="text-text-muted">{translate('thoughtsBy')} {currentUser.name}</p>
      </div>

      <h2 className="text-2xl font-semibold text-text mb-6">{translate('myKuras')}</h2>

      {isLoading ? (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-3 text-text-muted">Loading your Kuras...</p>
        </div>
      ) : userPosts.length === 0 ? (
        <div className="text-center py-10 px-4 text-text-muted">
          <p className="text-xl mb-2">📝</p>
          <p>{translate('noKurasYet')}</p>
        </div>
      ) : (
        <div className="space-y-1">
          {userPosts.map(post => (
            <PostCard key={post.id} post={post} onPostUpdate={handlePostUpdate} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
