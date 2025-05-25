import { ReactionType, Language, AppTranslations } from './types';

export const AVAILABLE_REACTIONS: ReactionType[] = [
  ReactionType.HEART,
  ReactionType.SAD,
  ReactionType.THINKING,
  ReactionType.GROWTH,
];

export const GEMINI_API_MODEL_TEXT = 'gemini-2.5-flash-preview-04-17';

export const DEFAULT_LANGUAGE = Language.ENGLISH;
export const DEFAULT_PROMPT_TEXT = "What's on your mind today?";
export const DEFAULT_USER_NAME = "Kura Listener"; // Default name if user skips creating one initially

export const LOCAL_STORAGE_KEYS = {
  POSTS: 'mankakura_posts',
  THEME: 'mankakura_theme',
  LANGUAGE: 'mankakura_language',
  CURRENT_USER: 'mankakura_current_user', // Changed from USER_NICKNAME
};

// MOCK_USER_ID and MOCK_USER_NAME can be used for initial posts not tied to the interactive current user
export const MOCK_SYSTEM_USER_ID = 'systemUser123';
export const MOCK_SYSTEM_USER_NAME = 'Man Ka Kura';


export const TRANSLATIONS: AppTranslations = {
  appName: { en: "Man Ka Kura", ne: "मनका कुरा" },
  tagline: { en: "Share your heart, find connection.", ne: "आफ्नो मनको कुरा साझा गर्नुहोस्, सम्बन्ध खोज्नुहोस्।" },
  newPost: { en: "New Kura", ne: "नयाँ कुरा" },
  postPlaceholder: { en: "What's on your mind... (मनमा के छ...)", ne: "मनमा के छ..." },
  tagsPlaceholder: { en: "Add tags (e.g., #happy, #मनकोशान्ति)", ne: "ट्यागहरू थप्नुहोस् (उदाहरण: #खुशी, #मनकोशान्ति)" },
  anonymous: { en: "Post Anonymously", ne: "गुमनाम रूपमा पोस्ट गर्नुहोस्" },
  submitPost: { en: "Share Kura", ne: "कुरा साझा गर्नुहोस्" },
  dailyPrompt: { en: "Today's Reflection", ne: "आजको चिन्तन" },
  loadPromptError: { en: "Could not load daily prompt. Write freely!", ne: "दैनिक प्रम्प्ट लोड गर्न सकिएन। स्वतन्त्र रूपमा लेख्नुहोस्!" },
  reactions: { en: "Reactions", ne: "प्रतिक्रियाहरू" },
  comments: { en: "Comments", ne: "टिप्पणीहरू" },
  addComment: { en: "Add a comment...", ne: "टिप्पणी थप्नुहोस्..." },
  postComment: { en: "Post", ne: "पोस्ट गर्नुहोस्" },
  anonymousUser: { en: "Anonymous", ne: "गुमनाम" },
  searchPlaceholder: { en: "Search Kura by content or #tag...", ne: "सामग्री वा #ट्याग द्वारा कुरा खोज्नुहोस्..." },
  noPosts: { en: "No Kura shared yet. Be the first!", ne: "अहिलेसम्म कुनै कुरा साझा गरिएको छैन। पहिलो बन्नुहोस्!" },
  communityGuidelines: { en: "Community Guidelines", ne: "सामुदायिक दिशानिर्देशहरू" },
  darkMode: { en: "Dark Mode", ne: "डार्क मोड" },
  lightMode: { en: "Light Mode", ne: "लाइट मोड" },
  language: { en: "Language", ne: "भाषा" },
  english: { en: "English", ne: "अंग्रेजी" },
  nepali: { en: "नेपाली", ne: "नेपाली" },
  share: { en: "Share", ne: "साझा गर्नुहोस्" },
  shareAsImage: { en: "Share as Image", ne: "छविको रूपमा साझा गर्नुहोस्" },
  close: { en: "Close", ne: "बन्द गर्नुहोस्" },
  recordVoice: { en: "Record Voice", ne: "आवाज रेकर्ड गर्नुहोस्" },
  recording: { en: "Recording...", ne: "रेकर्डिङ..." },
  voiceNoteRecorded: { en: "Voice note recorded.", ne: "आवाज नोट रेकर्ड भयो।" },
  attachImageURL: { en: "Attach Image URL (optional)", ne: "छवि URL संलग्न गर्नुहोस् (वैकल्पिक)" },
  guidelinesTitle: { en: "Our Shared Space: Community Guidelines", ne: "हाम्रो साझा ठाउँ: सामुदायिक दिशानिर्देशहरू" },
  guidelinesIntro: { en: "Welcome to Man Ka Kura! To keep this a warm, safe, and inclusive space for everyone, please follow these guidelines:", ne: "मनका कुरामा स्वागत छ! यो सबैका लागि न्यानो, सुरक्षित र समावेशी ठाउँ बनाइराख्न, कृपया यी दिशानिर्देशहरू पालना गर्नुहोस्:" },
  guidelineRespect: { en: "Be Respectful: Treat everyone with kindness. Disagreements are fine, but personal attacks are not.", ne: "सम्मानजनक हुनुहोस्: सबैसँग दयालु व्यवहार गर्नुहोस्। असहमति ठीक छ, तर व्यक्तिगत आक्रमणहरू होइनन्।" },
  guidelineAuthentic: { en: "Share Authentically: This is a space for genuine thoughts and feelings. Be yourself.", ne: "प्रामाणिक रूपमा साझा गर्नुहोस्: यो वास्तविक विचार र भावनाहरूको लागि ठाउँ हो। आफै बन्नुहोस्।" },
  guidelineSafe: { en: "Keep it Safe: No hate speech, bullying, harassment, or content that promotes harm.", ne: "यसलाई सुरक्षित राख्नुहोस्: घृणायुक्त भाषण, धम्की, उत्पीडन, वा हानि पुऱ्याउने सामग्रीलाई निषेध छ।" },
  guidelinePrivacy: { en: "Respect Privacy: Don't share personal information about others without their consent.", ne: "गोपनीयताको सम्मान गर्नुहोस्: अरूको व्यक्तिगत जानकारी उनीहरूको सहमति बिना साझा नगर्नुहोस्।" },
  guidelineSupport: { en: "Be Supportive: Offer encouragement and empathy. This is a place for connection.", ne: "सहयोगी हुनुहोस्: प्रोत्साहन र सहानुभूति प्रदान गर्नुहोस्। यो सम्बन्धको लागि ठाउँ हो।" },
  setNickname: { en: "Set Your Name", ne: "आफ्नो नाम सेट गर्नुहोस्" }, // Updated from Nickname
  nickname: { en: "Your Name", ne: "तपाईंको नाम" }, // Updated from Nickname
  saveNickname: { en: "Save Name", ne: "नाम सुरक्षित गर्नुहोस्" }, // Updated from Nickname
  changeNickname: { en: "Change Name", ne: "नाम परिवर्तन गर्नुहोस्" }, // Updated from Nickname
  thoughtsBy: {en: "Thoughts by", ne: "द्वारा विचारहरू"},
  welcomeToManKaKura: { en: "Welcome to Man Ka Kura!", ne: "मनका कुरामा स्वागत छ!" },
  whatsYourName: { en: "What should we call you?", ne: "हामी तपाईंलाई के भनेर बोलाउने?" },
  saveAndStart: { en: "Save and Start Sharing", ne: "सुरक्षित गर्नुहोस् र साझा गर्न सुरु गर्नुहोस्" },
  myProfile: { en: "My Profile", ne: "मेरो प्रोफाइल" },
  myKuras: { en: "My Kuras", ne: "मेरा कुराहरू" },
  noKurasYet: { en: "You haven't shared any Kuras yet.", ne: "तपाईंले अहिलेसम्म कुनै कुरा साझा गर्नुभएको छैन।" },
  editProfile: { en: "Edit Profile", ne: "प्रोफाइल सम्पादन गर्नुहोस्" },
};
