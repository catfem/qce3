import React from 'react';
import { HomeIcon, LockIcon, GlobeIcon, LayoutDashboardIcon, SettingsIcon, BrainCircuitIcon } from '../icons/Icons';
import { Page } from '../../types';
import { useTranslation } from '../../hooks/useTranslation';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const navItems = [
    { id: 'home', label: t('sidebar.home'), icon: HomeIcon },
    { id: 'my-bank', label: t('sidebar.myBank'), icon: LockIcon },
    { id: 'open-bank', label: t('sidebar.openBank'), icon: GlobeIcon },
    { id: 'dashboard', label: t('sidebar.dashboard'), icon: LayoutDashboardIcon },
    { id: 'settings', label: t('sidebar.settings'), icon: SettingsIcon },
  ];

  return (
    <aside className="w-64 bg-sidebar-light dark:bg-sidebar-dark backdrop-blur-xl border-r border-border-light dark:border-border-dark flex-shrink-0 flex flex-col">
      <div className="h-20 flex items-center justify-center px-4 border-b border-border-light dark:border-border-dark">
        <BrainCircuitIcon className="h-8 w-8 text-primary" />
        <h1 className="text-xl font-bold ml-2 text-text-light-primary dark:text-dark-primary">
          {t('appName')}
        </h1>
      </div>
      <nav className="flex-1 px-4 py-6">
        <ul>
          {navItems.map((item) => {
             const isGuest = user && 'isGuest' in user && user.isGuest;
             const isDisabled = isGuest && (item.id === 'my-bank' || item.id === 'dashboard' || item.id === 'settings');

            return (
              <li key={item.id} title={isDisabled ? t('guest.sidebarTooltip') : undefined}>
                <button
                  onClick={() => setActivePage(item.id as Page)}
                  disabled={isDisabled}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                    activePage === item.id
                      ? 'bg-primary/20 text-primary'
                      : 'text-text-light-secondary dark:text-dark-secondary hover:bg-primary/10 hover:text-primary'
                  } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-border-light dark:border-border-dark">
         <p className="text-xs text-center text-text-light-secondary dark:text-dark-secondary">
          © 2024 AI Question Bank.
         </p>
      </div>
    </aside>
  );
};

export default Sidebar;