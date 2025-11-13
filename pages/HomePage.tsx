
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import Card from '../components/ui/Card';
import { UploadCloudIcon, ZapIcon, FolderLockIcon, GraduationCapIcon } from '../components/icons/Icons';
import Button from '../components/ui/Button';

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: UploadCloudIcon,
      title: t('home.feature1.title'),
      description: t('home.feature1.description'),
    },
    {
      icon: ZapIcon,
      title: t('home.feature2.title'),
      description: t('home.feature2.description'),
    },
    {
      icon: FolderLockIcon,
      title: t('home.feature3.title'),
      description: t('home.feature3.description'),
    },
    {
      icon: GraduationCapIcon,
      title: t('home.feature4.title'),
      description: t('home.feature4.description'),
    },
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="text-center py-16">
        <h1 className="text-4xl md:text-6xl font-bold text-text-light-primary dark:text-dark-primary leading-tight">
          {t('home.title.line1')} <br />
          <span className="text-primary">{t('home.title.line2')}</span>
        </h1>
        <p className="mt-6 text-lg max-w-2xl mx-auto text-text-light-secondary dark:text-dark-secondary">
          {t('home.subtitle')}
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg">{t('home.cta.primary')}</Button>
          <Button size="lg" variant="secondary">{t('home.cta.secondary')}</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-16">
        {features.map((feature, index) => (
          <Card key={index} className="text-center p-8">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-text-light-primary dark:text-dark-primary">
              {feature.title}
            </h3>
            <p className="text-text-light-secondary dark:text-dark-secondary">
              {feature.description}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
