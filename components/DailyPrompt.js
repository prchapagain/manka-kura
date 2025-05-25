import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { getDailyPromptFromAPI } from '../services/geminiService';
import { useLanguage } from '../contexts/LanguageContext';
import { DEFAULT_PROMPT_TEXT } from '../constants';
const DailyPrompt = () => {
    const [prompt, setPrompt] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { translate, language } = useLanguage();
    useEffect(() => {
        const fetchPrompt = async () => {
            setIsLoading(true);
            try {
                const fetchedPrompt = await getDailyPromptFromAPI();
                setPrompt(fetchedPrompt || DEFAULT_PROMPT_TEXT);
            }
            catch (error) {
                console.error("Failed to fetch daily prompt:", error);
                setPrompt(DEFAULT_PROMPT_TEXT); // Fallback prompt
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchPrompt();
    }, []); // Fetch prompt on component mount
    return (_jsxs("div", { className: `my-6 p-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl shadow-lg ${language === 'ne' ? 'font-nepali' : ''}`, children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: translate('dailyPrompt') }), isLoading ? (_jsx("p", { className: "italic text-sm opacity-80", children: "Loading today's thought starter..." })) : (_jsx("p", { className: "text-md leading-relaxed", children: prompt || translate('loadPromptError') }))] }));
};
export default DailyPrompt;
