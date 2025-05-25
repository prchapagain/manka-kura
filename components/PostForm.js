import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Language } from '../types';
import { postService } from '../services/postService';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext'; // Import useUser
import VoiceRecorderButton from './VoiceRecorderButton';
import PaperAirplaneIcon from './icons/PaperAirplaneIcon';
const PostForm = ({ onPostCreated, onClose }) => {
    const { language, translate } = useLanguage();
    const { currentUser } = useUser(); // Get currentUser from context
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [voiceNoteUrl, setVoiceNoteUrl] = useState(null);
    const [voiceNoteDuration, setVoiceNoteDuration] = useState(null);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim() && !voiceNoteUrl && !imageUrl.trim()) {
            alert(language === Language.NEPALI ? "कृपया केही सामग्री लेख्नुहोस्, आवाज रेकर्ड गर्नुहोस् वा छवि संलग्न गर्नुहोस्।" : "Please write some content, record a voice note, or attach an image.");
            return;
        }
        if (!currentUser && !isAnonymous) {
            alert(language === Language.NEPALI ? "कृपया आफ्नो प्रयोगकर्ता प्रोफाइल सेटअप गर्नुहोस् वा गुमनाम रूपमा पोस्ट गर्नुहोस्।" : "Please set up your user profile or post anonymously.");
            return;
        }
        setIsSubmitting(true);
        const authorToUse = isAnonymous
            ? { name: 'Anonymous' }
            : currentUser; // currentUser should exist if not anonymous
        const postData = {
            author: authorToUse,
            content,
            tags: tags.split(',').map(tag => tag.trim().replace(/^#/, '')).filter(tag => tag),
            imageUrl: imageUrl.trim() || undefined,
            voiceNoteUrl: voiceNoteUrl || undefined,
            isAnonymous,
            language,
        };
        try {
            const newPost = await postService.addPost(postData);
            onPostCreated(newPost);
            setContent('');
            setTags('');
            setImageUrl('');
            setVoiceNoteUrl(null);
            setVoiceNoteDuration(null);
            setIsAnonymous(false);
            if (onClose)
                onClose();
        }
        catch (error) {
            console.error("Failed to create post:", error);
            // Handle error UI
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const handleVoiceRecordingComplete = (blobUrl, duration) => {
        setVoiceNoteUrl(blobUrl);
        setVoiceNoteDuration(duration);
        setContent(prev => prev ? `${prev}\n[${translate('voiceNoteRecorded')} (${Math.round(duration)}s)]` : `[${translate('voiceNoteRecorded')} (${Math.round(duration)}s)]`);
    };
    const handleVoiceRecordingError = (errorMsg) => {
        alert(errorMsg);
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: `space-y-4 p-1 ${language === Language.NEPALI ? 'font-nepali' : ''}`, children: [_jsx("div", { children: _jsx("textarea", { value: content, onChange: (e) => setContent(e.target.value), placeholder: translate('postPlaceholder'), rows: 4, className: "w-full p-3 border border-border rounded-lg bg-background dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow text-text" }) }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsxs("div", { className: "flex-grow", children: [_jsx("label", { htmlFor: "imageUrl", className: "block text-sm font-medium text-text-muted mb-1", children: translate('attachImageURL') }), _jsx("input", { type: "url", id: "imageUrl", value: imageUrl, onChange: (e) => setImageUrl(e.target.value), placeholder: "https://example.com/image.png", className: "w-full p-2 border border-border rounded-lg bg-background dark:bg-gray-700 focus:ring-1 focus:ring-primary focus:border-transparent outline-none transition-shadow text-sm" })] }), _jsxs("div", { className: "flex-shrink-0", children: [_jsx("label", { className: "block text-sm font-medium text-text-muted mb-1", children: "\u00A0" }), " ", _jsx(VoiceRecorderButton, { onRecordingComplete: handleVoiceRecordingComplete, onRecordingError: handleVoiceRecordingError })] })] }), voiceNoteUrl && voiceNoteDuration && (_jsxs("div", { className: "p-2 bg-primary-light dark:bg-primary-dark rounded-lg text-sm text-text dark:text-gray-200", children: [_jsxs("p", { children: [translate('voiceNoteRecorded'), " (", Math.round(voiceNoteDuration), "s)"] }), _jsx("audio", { controls: true, src: voiceNoteUrl, className: "w-full mt-1", children: "Your browser does not support the audio element." })] })), _jsx("div", { children: _jsx("input", { type: "text", value: tags, onChange: (e) => setTags(e.target.value), placeholder: translate('tagsPlaceholder'), className: "w-full p-2 border border-border rounded-lg bg-background dark:bg-gray-700 focus:ring-1 focus:ring-primary focus:border-transparent outline-none transition-shadow text-sm" }) }), _jsxs("div", { className: "flex items-center", children: [_jsx("input", { type: "checkbox", id: "anonymous", checked: isAnonymous, onChange: (e) => setIsAnonymous(e.target.checked), className: "h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary mr-2" }), _jsx("label", { htmlFor: "anonymous", className: "text-sm text-text-muted", children: translate('anonymous') })] }), _jsxs("div", { className: "flex justify-end space-x-3", children: [onClose && (_jsx("button", { type: "button", onClick: onClose, className: "px-4 py-2 border border-border rounded-lg text-text-muted hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors", children: translate('close') })), _jsxs("button", { type: "submit", disabled: isSubmitting || (!isAnonymous && !currentUser), className: "flex items-center space-x-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light disabled:opacity-50 transition-colors", children: [_jsx(PaperAirplaneIcon, { className: "w-5 h-5" }), _jsx("span", { children: translate('submitPost') })] })] })] }));
};
export default PostForm;
