import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import ThemeToggle from '../ui/ThemeToggle';
import LanguageToggle from '../ui/LanguageToggle';
import Button from '../ui/Button';
import { LogOutIcon, UserCircleIcon } from '../icons/Icons';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const isGuest = user && 'isGuest' in user;

  const avatarUrl = isGuest ? null : user?.user_metadata.avatar_url;
  const fullName = user?.user_metadata.full_name ?? 'User';
  const email = isGuest ? 'Guest Access' : user?.email;

  return (
    <header className="h-20 flex-shrink-0 flex items-center justify-end px-8 border-b border-border-light dark:border-border-dark bg-transparent">
      <div className="flex items-center space-x-4">
        <LanguageToggle />
        <ThemeToggle />
        <div className="flex items-center space-x-3">
            {avatarUrl ? (
                <img 
                    src={avatarUrl}
                    alt={fullName}
                    className="h-10 w-10 rounded-full"
                />
            ) : (
                <UserCircleIcon className="h-10 w-10 text-text-light-secondary dark:text-dark-secondary" />
            )}
            <div>
                <p className="font-semibold text-sm text-text-light-primary dark:text-dark-primary">{fullName}</p>
                <p className="text-xs text-text-light-secondary dark:text-dark-secondary">{email}</p>
            </div>
        </div>
        <Button onClick={logout} variant="secondary" size="sm">
          <LogOutIcon className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header;