
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const CommunityGuidelines: React.FC = () => {
  const { translate } = useLanguage();

  return (
    <div className="space-y-4 text-sm text-text-muted dark:text-gray-300">
      <p>{translate('guidelinesIntro')}</p>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>{translate('guidelineRespect').split(':')[0]}:</strong> {translate('guidelineRespect').split(':')[1]}</li>
        <li><strong>{translate('guidelineAuthentic').split(':')[0]}:</strong> {translate('guidelineAuthentic').split(':')[1]}</li>
        <li><strong>{translate('guidelineSafe').split(':')[0]}:</strong> {translate('guidelineSafe').split(':')[1]}</li>
        <li><strong>{translate('guidelinePrivacy').split(':')[0]}:</strong> {translate('guidelinePrivacy').split(':')[1]}</li>
        <li><strong>{translate('guidelineSupport').split(':')[0]}:</strong> {translate('guidelineSupport').split(':')[1]}</li>
      </ul>
    </div>
  );
};

export default CommunityGuidelines;
