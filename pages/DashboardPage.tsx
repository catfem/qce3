import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import Card from '../components/ui/Card';
import { FileTextIcon, BarChartIcon, ClockIcon } from '../components/icons/Icons';

const DashboardPage: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    { title: t('dashboard.stat1.title'), value: '1,204', icon: FileTextIcon, change: '+12.5%' },
    { title: t('dashboard.stat2.title'), value: '89', icon: BarChartIcon, change: '-2.1%' },
    { title: t('dashboard.stat3.title'), value: '72%', icon: ClockIcon, change: '+5.0%' },
  ];

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-text-light-primary dark:text-dark-primary mb-8">{t('dashboard.title')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <div className="flex items-center justify-between">
              <p className="text-text-light-secondary dark:text-dark-secondary">{stat.title}</p>
              <stat.icon className="h-6 w-6 text-gray-400" />
            </div>
            <div className="mt-2 flex items-baseline">
              <p className="text-3xl font-bold text-text-light-primary dark:text-dark-primary">{stat.value}</p>
              <p className={`ml-2 text-sm font-semibold ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
              <h2 className="text-xl font-semibold mb-4 text-text-light-primary dark:text-dark-primary">{t('dashboard.chart1.title')}</h2>
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <p className="text-text-light-secondary dark:text-dark-secondary">{t('dashboard.chartPlaceholder')}</p>
              </div>
          </Card>
          <Card>
              <h2 className="text-xl font-semibold mb-4 text-text-light-primary dark:text-dark-primary">{t('dashboard.chart2.title')}</h2>
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                   <p className="text-text-light-secondary dark:text-dark-secondary">{t('dashboard.chartPlaceholder')}</p>
              </div>
          </Card>
      </div>
    </div>
  );
};

export default DashboardPage;