import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLanguage } from '../contexts/LanguageContext';
const CommunityGuidelines = () => {
    const { translate } = useLanguage();
    return (_jsxs("div", { className: "space-y-4 text-sm text-text-muted dark:text-gray-300", children: [_jsx("p", { children: translate('guidelinesIntro') }), _jsxs("ul", { className: "list-disc list-inside space-y-2", children: [_jsxs("li", { children: [_jsxs("strong", { children: [translate('guidelineRespect').split(':')[0], ":"] }), " ", translate('guidelineRespect').split(':')[1]] }), _jsxs("li", { children: [_jsxs("strong", { children: [translate('guidelineAuthentic').split(':')[0], ":"] }), " ", translate('guidelineAuthentic').split(':')[1]] }), _jsxs("li", { children: [_jsxs("strong", { children: [translate('guidelineSafe').split(':')[0], ":"] }), " ", translate('guidelineSafe').split(':')[1]] }), _jsxs("li", { children: [_jsxs("strong", { children: [translate('guidelinePrivacy').split(':')[0], ":"] }), " ", translate('guidelinePrivacy').split(':')[1]] }), _jsxs("li", { children: [_jsxs("strong", { children: [translate('guidelineSupport').split(':')[0], ":"] }), " ", translate('guidelineSupport').split(':')[1]] })] })] }));
};
export default CommunityGuidelines;
