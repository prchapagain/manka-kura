
import React from 'react';
import { ReactionType } from '../types';
import HeartIcon from './icons/HeartIcon';
import SadIcon from './icons/SadIcon';
import ThinkingIcon from './icons/ThinkingIcon';
import GrowthIcon from './icons/GrowthIcon';

interface ReactionButtonProps {
  type: ReactionType;
  count: number;
  onClick: () => void;
  reacted?: boolean; // If the current user has reacted with this type
}

const ReactionIcon: React.FC<{ type: ReactionType; className?: string }> = ({ type, className }) => {
  const iconProps = { className: className || "w-5 h-5" };
  switch (type) {
    case ReactionType.HEART: return <HeartIcon {...iconProps} />;
    case ReactionType.SAD: return <SadIcon {...iconProps} />;
    case ReactionType.THINKING: return <ThinkingIcon {...iconProps} />;
    case ReactionType.GROWTH: return <GrowthIcon {...iconProps} />;
    default: return <span>{type}</span>;
  }
};


const ReactionButton: React.FC<ReactionButtonProps> = ({ type, count, onClick, reacted }) => {
  const reactionColorClasses: Record<ReactionType, string> = {
    [ReactionType.HEART]: 'hover:text-red-500 dark:hover:text-red-400',
    [ReactionType.SAD]: 'hover:text-blue-500 dark:hover:text-blue-400',
    [ReactionType.THINKING]: 'hover:text-yellow-500 dark:hover:text-yellow-400',
    [ReactionType.GROWTH]: 'hover:text-green-500 dark:hover:text-green-400',
  };
  const reactedColorClasses: Record<ReactionType, string> = {
    [ReactionType.HEART]: 'text-red-500 dark:text-red-400',
    [ReactionType.SAD]: 'text-blue-500 dark:text-blue-400',
    [ReactionType.THINKING]: 'text-yellow-500 dark:text-yellow-400',
    [ReactionType.GROWTH]: 'text-green-500 dark:text-green-400',
  }

  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm transition-colors duration-150
                  ${reacted ? reactedColorClasses[type] : 'text-text-muted hover:bg-gray-100 dark:hover:bg-gray-700 ' + reactionColorClasses[type]}`}
      aria-label={`React with ${type}`}
    >
      <ReactionIcon type={type} className="w-5 h-5" />
      <span className="font-medium">{count > 0 ? count : ''}</span>
    </button>
  );
};

export default ReactionButton;
