import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ReactionType } from '../types';
import HeartIcon from './icons/HeartIcon';
import SadIcon from './icons/SadIcon';
import ThinkingIcon from './icons/ThinkingIcon';
import GrowthIcon from './icons/GrowthIcon';
const ReactionIcon = ({ type, className }) => {
    const iconProps = { className: className || "w-5 h-5" };
    switch (type) {
        case ReactionType.HEART: return _jsx(HeartIcon, { ...iconProps });
        case ReactionType.SAD: return _jsx(SadIcon, { ...iconProps });
        case ReactionType.THINKING: return _jsx(ThinkingIcon, { ...iconProps });
        case ReactionType.GROWTH: return _jsx(GrowthIcon, { ...iconProps });
        default: return _jsx("span", { children: type });
    }
};
const ReactionButton = ({ type, count, onClick, reacted }) => {
    const reactionColorClasses = {
        [ReactionType.HEART]: 'hover:text-red-500 dark:hover:text-red-400',
        [ReactionType.SAD]: 'hover:text-blue-500 dark:hover:text-blue-400',
        [ReactionType.THINKING]: 'hover:text-yellow-500 dark:hover:text-yellow-400',
        [ReactionType.GROWTH]: 'hover:text-green-500 dark:hover:text-green-400',
    };
    const reactedColorClasses = {
        [ReactionType.HEART]: 'text-red-500 dark:text-red-400',
        [ReactionType.SAD]: 'text-blue-500 dark:text-blue-400',
        [ReactionType.THINKING]: 'text-yellow-500 dark:text-yellow-400',
        [ReactionType.GROWTH]: 'text-green-500 dark:text-green-400',
    };
    return (_jsxs("button", { onClick: onClick, className: `flex items-center space-x-1 px-2 py-1 rounded-full text-sm transition-colors duration-150
                  ${reacted ? reactedColorClasses[type] : 'text-text-muted hover:bg-gray-100 dark:hover:bg-gray-700 ' + reactionColorClasses[type]}`, "aria-label": `React with ${type}`, children: [_jsx(ReactionIcon, { type: type, className: "w-5 h-5" }), _jsx("span", { className: "font-medium", children: count > 0 ? count : '' })] }));
};
export default ReactionButton;
