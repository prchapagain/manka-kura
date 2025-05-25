
import React, { ReactNode } from 'react';
import XMarkIcon from './icons/XMarkIcon';
import { useLanguage } from '../contexts/LanguageContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  const { translate } = useLanguage();
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className={`bg-card text-text rounded-lg shadow-xl w-full ${sizeClasses[size]} p-6 m-4 transform transition-all duration-300 ease-out scale-95 opacity-0 animate-modalEnter`}>
        <div className="flex items-center justify-between mb-4">
          {title && <h2 className="text-xl font-semibold text-primary">{title}</h2>}
          <button
            onClick={onClose}
            className="text-text-muted hover:text-accent transition-colors"
            aria-label={translate('close')}
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div>{children}</div>
      </div>
      {/* Fix: Removed style tag with non-standard jsx/global props. Animation 'modalEnter' needs to be defined elsewhere (e.g., global CSS or Tailwind config) if used. */}
      <style>{`
        @keyframes modalEnter {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-modalEnter {
          animation: modalEnter 0.3s forwards;
        }
      `}</style>
    </div>
  );
};

export default Modal;
