import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import XMarkIcon from './icons/XMarkIcon';
import { useLanguage } from '../contexts/LanguageContext';
const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
    const { translate } = useLanguage();
    if (!isOpen)
        return null;
    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
    };
    return (_jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4", children: [_jsxs("div", { className: `bg-card text-text rounded-lg shadow-xl w-full ${sizeClasses[size]} p-6 m-4 transform transition-all duration-300 ease-out scale-95 opacity-0 animate-modalEnter`, children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [title && _jsx("h2", { className: "text-xl font-semibold text-primary", children: title }), _jsx("button", { onClick: onClose, className: "text-text-muted hover:text-accent transition-colors", "aria-label": translate('close'), children: _jsx(XMarkIcon, { className: "w-6 h-6" }) })] }), _jsx("div", { children: children })] }), _jsx("style", { children: `
        @keyframes modalEnter {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-modalEnter {
          animation: modalEnter 0.3s forwards;
        }
      ` })] }));
};
export default Modal;
