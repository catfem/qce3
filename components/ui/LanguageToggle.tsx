
import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import Button from './Button';
import { LanguagesIcon } from '../icons/Icons';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh-TW' : 'en');
  };

  return (
    <Button onClick={toggleLanguage} variant="secondary" size="sm" className="p-2">
      <LanguagesIcon className="h-5 w-5 mr-2" />
      {language === 'en' ? 'EN' : '繁'}
    </Button>
  );
};

export default LanguageToggle;
