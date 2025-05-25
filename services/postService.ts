import { Post, Comment, ReactionType, User, Language } from '../types';
import { LOCAL_STORAGE_KEYS, MOCK_SYSTEM_USER_ID, MOCK_SYSTEM_USER_NAME } from '../constants';

const getStoredPosts = (): Post[] => {
  try {
    const storedPosts = localStorage.getItem(LOCAL_STORAGE_KEYS.POSTS);
    return storedPosts ? JSON.parse(storedPosts) : [];
  } catch (error) {
    console.error("Error reading posts from localStorage:", error);
    return [];
  }
};

const savePostsToStorage = (posts: Post[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEYS.POSTS, JSON.stringify(posts));
  } catch (error) {
    console.error("Error saving posts to localStorage:", error);
  }
};

let posts: Post[] = getStoredPosts();

// Initialize with some mock data if localStorage is empty
if (posts.length === 0) {
  const now = new Date().toISOString();
  // Using a system-like user for initial mock post not tied to the interactive current user
  const mockSystemUser: User = { id: MOCK_SYSTEM_USER_ID, name: MOCK_SYSTEM_USER_NAME };
  posts = [
    {
      id: '1',
      author: mockSystemUser,
      content: "Just had a beautiful moment watching the sunset. Feeling grateful. #sunset #gratitude",
      tags: ['sunset', 'gratitude'],
      reactions: { [ReactionType.HEART]: 5, [ReactionType.SAD]: 0, [ReactionType.THINKING]: 1, [ReactionType.GROWTH]: 2 },
      comments: [
        { id: 'c1', postId: '1', author: {id: 'friend1-mock-id', name: "Friend1"}, content: "So lovely! Wish I was there.", createdAt: now },
      ],
      createdAt: now,
      isAnonymous: false,
      language: Language.ENGLISH,
    },
    {
      id: '2',
      author: { name: 'Anonymous' },
      content: "मन अलि भारी छ आज। कसैलाई यस्तो भएको छ? #मनकोकुरा #feelingblue",
      tags: ['मनकोकुरा', 'feelingblue'],
      reactions: { [ReactionType.HEART]: 2, [ReactionType.SAD]: 3, [ReactionType.THINKING]: 0, [ReactionType.GROWTH]: 1 },
      comments: [],
      createdAt: new Date(Date.now() - 3600 * 1000 * 2).toISOString(), // 2 hours ago
      isAnonymous: true,
      language: Language.NEPALI,
    }
  ];
  savePostsToStorage(posts);
}


export const postService = {
  getPosts: async (): Promise<Post[]> => {
    return [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  addPost: async (postData: Omit<Post, 'id' | 'reactions' | 'comments' | 'createdAt'>): Promise<Post> => {
    const newPost: Post = {
      ...postData, // author is now passed in postData
      id: Date.now().toString(),
      reactions: { [ReactionType.HEART]: 0, [ReactionType.SAD]: 0, [ReactionType.THINKING]: 0, [ReactionType.GROWTH]: 0 },
      comments: [],
      createdAt: new Date().toISOString(),
    };
    posts = [newPost, ...posts];
    savePostsToStorage(posts);
    return newPost;
  },

  addCommentToPost: async (postId: string, commentContent: string, author: User | { name: 'Anonymous' }): Promise<Comment | null> => {
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex === -1) return null;

    const newComment: Comment = {
      id: Date.now().toString(),
      postId,
      author, // author is passed directly
      content: commentContent,
      createdAt: new Date().toISOString(),
    };
    posts[postIndex].comments.push(newComment);
    savePostsToStorage(posts);
    return newComment;
  },

  toggleReactionToPost: async (postId: string, reactionType: ReactionType, userId: string): Promise<Post | null> => {
    // This is a simplified reaction toggle.
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex === -1) return null;

    posts[postIndex].reactions[reactionType] = (posts[postIndex].reactions[reactionType] || 0) + 1;
    savePostsToStorage(posts);
    return posts[postIndex];
  },
  
  getPostById: async (postId: string): Promise<Post | null> => {
    const post = posts.find(p => p.id === postId);
    return post || null;
  },

  getPostsByAuthorId: async (authorId: string): Promise<Post[]> => {
    return posts.filter(post => !post.isAnonymous && (post.author as User).id === authorId)
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
};
