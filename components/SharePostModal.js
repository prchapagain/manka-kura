import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ReactionType } from '../types';
import Modal from './Modal';
import { useLanguage } from '../contexts/LanguageContext';
import { AVAILABLE_REACTIONS, TRANSLATIONS } from '../constants';
import HeartIcon from './icons/HeartIcon';
import SadIcon from './icons/SadIcon';
import ThinkingIcon from './icons/ThinkingIcon';
import GrowthIcon from './icons/GrowthIcon';
const ReactionIconMini = ({ type, className }) => {
    const iconProps = { className: className || "w-4 h-4" };
    switch (type) {
        case ReactionType.HEART: return _jsx(HeartIcon, { ...iconProps });
        case ReactionType.SAD: return _jsx(SadIcon, { ...iconProps });
        case ReactionType.THINKING: return _jsx(ThinkingIcon, { ...iconProps });
        case ReactionType.GROWTH: return _jsx(GrowthIcon, { ...iconProps });
        default: return _jsx("span", { children: type });
    }
};
const SharePostModal = ({ post, isOpen, onClose }) => {
    const { translate, language: currentAppLanguage } = useLanguage();
    if (!post)
        return null;
    const postLanguageClass = post.language === 'ne' ? 'font-nepali' : '';
    const appNameDisplay = TRANSLATIONS.appName[currentAppLanguage] || TRANSLATIONS.appName.en;
    return (_jsxs(Modal, { isOpen: isOpen, onClose: onClose, title: translate('shareAsImage'), size: "md", children: [_jsx("div", { className: "p-2 bg-gradient-to-br from-primary-light via-accent to-secondary dark:from-primary-dark dark:via-accent dark:to-secondary rounded-lg", children: _jsxs("div", { id: "shareable-content", className: `bg-card text-text p-6 rounded shadow-lg ${postLanguageClass}`, children: [post.imageUrl && (_jsx("img", { src: post.imageUrl, alt: "Post image", className: "rounded-md mb-3 max-h-48 w-full object-cover" })), _jsx("p", { className: "text-lg mb-4 whitespace-pre-wrap", children: post.content }), post.voiceNoteUrl && (_jsx("div", { className: "my-3 p-2 bg-gray-100 dark:bg-gray-700 rounded", children: _jsx("p", { className: "text-sm text-text-muted", children: "\uD83C\uDFA4 Voice Note" }) })), post.tags.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-2 mb-3", children: post.tags.map(tag => (_jsxs("span", { className: "text-xs bg-primary-light dark:bg-primary-dark text-primary-dark dark:text-primary-light px-2 py-1 rounded-full", children: ["#", tag] }, tag))) })), _jsxs("div", { className: "flex justify-between items-center text-xs text-text-muted border-t border-border pt-3 mt-3", children: [_jsx("span", { children: post.isAnonymous ? translate('anonymousUser') : post.author.name }), _jsx("span", { children: appNameDisplay })] }), _jsx("div", { className: "flex items-center space-x-2 mt-2", children: AVAILABLE_REACTIONS.map(reactionType => {
                                if (post.reactions[reactionType] > 0) {
                                    return (_jsxs("div", { className: "flex items-center text-xs text-text-muted", children: [_jsx(ReactionIconMini, { type: reactionType, className: "w-3 h-3 mr-0.5" }), _jsx("span", { children: post.reactions[reactionType] })] }, reactionType));
                                }
                                return null;
                            }) })] }) }), _jsx("p", { className: "text-xs text-center mt-4 text-text-muted", children: currentAppLanguage === 'ne' ? 'यो सामग्री स्क्रिनसट गर्नुहोस् र साझा गर्नुहोस्!' : 'Screenshot this content to share!' })] }));
};
export default SharePostModal;
