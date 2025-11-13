import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Button from './ui/Button';
import { GoogleIcon, BrainCircuitIcon } from './icons/Icons';
import { useTranslation } from '../hooks/useTranslation';

const AuthModal: React.FC = () => {
  const { loginWithGoogle, loginWithEmail, registerWithEmail, loginAsGuest, loading, error } = useAuth();
  const { t } = useTranslation();
  
  const [isRegisterView, setIsRegisterView] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegisterView) {
      registerWithEmail(email, password);
    } else {
      loginWithEmail(email, password);
    }
  };

  return (
    <div className="fixed inset-0 bg-background-light dark:bg-background-dark flex items-center justify-center p-4">
      <div className="w-full max-w-sm p-8 bg-card-light dark:bg-card-dark rounded-2xl border border-border-light dark:border-border-dark backdrop-blur-xl shadow-2xl">
        <div className="text-center mb-6">
            <BrainCircuitIcon className="h-12 w-12 text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-text-light-primary dark:text-dark-primary">
              {isRegisterView ? t('auth.registerTitle') : t('auth.title')}
            </h1>
            <p className="text-text-light-secondary dark:text-dark-secondary mt-2">
              {isRegisterView ? t('auth.registerSubtitle') : t('auth.subtitle')}
            </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">{t('auth.emailLabel')}</label>
            <input 
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('auth.emailLabel')}
              required
              className="w-full px-4 py-2 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-md focus:ring-2 focus:ring-primary focus:outline-none text-text-light-primary dark:text-dark-primary placeholder:text-text-light-secondary dark:placeholder:text-dark-secondary"
            />
          </div>
           <div>
            <label htmlFor="password" className="sr-only">{t('auth.passwordLabel')}</label>
            <input 
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('auth.passwordLabel')}
              required
              minLength={6}
              className="w-full px-4 py-2 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-md focus:ring-2 focus:ring-primary focus:outline-none text-text-light-primary dark:text-dark-primary placeholder:text-text-light-secondary dark:placeholder:text-dark-secondary"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? t('auth.loading') : (isRegisterView ? t('auth.registerCta') : t('auth.loginCta'))}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border-light dark:border-border-dark" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card-light dark:bg-card-dark px-2 text-text-light-secondary dark:text-dark-secondary">{t('auth.or')}</span>
          </div>
        </div>

        <Button onClick={loginWithGoogle} disabled={loading} className="w-full mb-4" variant="secondary">
            <GoogleIcon className="h-5 w-5 mr-3" />
            {t('auth.googleCta')}
        </Button>

        {error && <p className="text-red-500 text-sm text-center my-4">{error}</p>}
        
        <div className="text-center text-sm">
          <button onClick={() => setIsRegisterView(!isRegisterView)} className="font-medium text-primary hover:underline">
            {isRegisterView ? t('auth.switchToLogin') : t('auth.switchToRegister')}
          </button>
        </div>
        
        <div className="text-center mt-6">
          <Button onClick={loginAsGuest} variant="secondary" size="sm">
            {t('auth.guestCta')}
          </Button>
        </div>

      </div>
    </div>
  );
};

export default AuthModal;