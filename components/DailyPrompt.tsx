
import React, { useState, useEffect } from 'react';
import { getDailyPromptFromAPI } from '../services/geminiService';
import { useLanguage } from '../contexts/LanguageContext';
import { DEFAULT_PROMPT_TEXT } from '../constants';

const DailyPrompt: React.FC = () => {
  const [prompt, setPrompt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { translate, language } = useLanguage();

  useEffect(() => {
    const fetchPrompt = async () => {
      setIsLoading(true);
      try {
        const fetchedPrompt = await getDailyPromptFromAPI();
        setPrompt(fetchedPrompt || DEFAULT_PROMPT_TEXT);
      } catch (error) {
        console.error("Failed to fetch daily prompt:", error);
        setPrompt(DEFAULT_PROMPT_TEXT); // Fallback prompt
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrompt();
  }, []); // Fetch prompt on component mount

  return (
    <div className={`my-6 p-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl shadow-lg ${language === 'ne' ? 'font-nepali' : ''}`}>
      <h3 className="text-lg font-semibold mb-2">{translate('dailyPrompt')}</h3>
      {isLoading ? (
        <p className="italic text-sm opacity-80">Loading today's thought starter...</p>
      ) : (
        <p className="text-md leading-relaxed">{prompt || translate('loadPromptError')}</p>
      )}
    </div>
  );
};

export default DailyPrompt;
