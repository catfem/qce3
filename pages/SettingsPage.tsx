import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { GoogleIcon } from '../components/icons/Icons';
import { useAuth } from '../hooks/useAuth';

const SettingsPage: React.FC = () => {
    const { t, setLanguage, language } = useTranslation();
    const { user } = useAuth();

    const fullName = user?.user_metadata?.full_name ?? 'User';
    const email = user?.email ?? '';
    const isGuest = user && 'isGuest' in user;

    return (
        <div className="container mx-auto px-4 max-w-3xl">
            <h1 className="text-3xl font-bold text-text-light-primary dark:text-dark-primary mb-8">{t('settings.title')}</h1>

            <Card className="mb-6">
                <h2 className="text-xl font-semibold mb-4 text-text-light-primary dark:text-dark-primary">{t('settings.account.title')}</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-text-light-secondary dark:text-dark-secondary mb-1">{t('settings.account.name')}</label>
                        <input type="text" value={fullName} disabled className="w-full p-2 bg-gray-100 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-md cursor-not-allowed text-text-light-secondary dark:text-dark-secondary" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-light-secondary dark:text-dark-secondary mb-1">{t('settings.account.email')}</label>
                        <input type="email" value={email} disabled className="w-full p-2 bg-gray-100 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-md cursor-not-allowed text-text-light-secondary dark:text-dark-secondary" />
                    </div>
                </div>
            </Card>

            <Card className="mb-6">
                <h2 className="text-xl font-semibold mb-4 text-text-light-primary dark:text-dark-primary">{t('settings.integrations.title')}</h2>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <GoogleIcon className="h-8 w-8 mr-4"/>
                        <div>
                            <p className="font-semibold text-text-light-primary dark:text-dark-primary">{t('settings.integrations.googleDrive')}</p>
                            <p className="text-sm text-green-500">{t('settings.integrations.connected')}</p>
                        </div>
                    </div>
                    <Button variant="secondary" disabled={isGuest}>{t('settings.integrations.reauthorize')}</Button>
                </div>
            </Card>
            
            <Card className="mb-6">
                <h2 className="text-xl font-semibold mb-4 text-text-light-primary dark:text-dark-primary">{t('settings.language.title')}</h2>
                <div className="flex space-x-2">
                    <Button onClick={() => setLanguage('en')} variant={language === 'en' ? 'primary' : 'secondary'}>English</Button>
                    <Button onClick={() => setLanguage('zh-TW')} variant={language === 'zh-TW' ? 'primary' : 'secondary'}>繁體中文</Button>
                </div>
            </Card>

            <Card className="border-red-500/50">
                <h2 className="text-xl font-semibold text-red-500 mb-4">{t('settings.danger.title')}</h2>
                <p className="text-text-light-secondary dark:text-dark-secondary mb-4">{t('settings.danger.description')}</p>
                <Button variant="danger" disabled={isGuest}>{t('settings.danger.cta')}</Button>
            </Card>
        </div>
    );
};

export default SettingsPage;