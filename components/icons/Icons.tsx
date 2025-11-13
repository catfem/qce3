import React from 'react';

export const Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  />
);

export const HomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></Icon>
);
export const LockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></Icon>
);
export const GlobeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></Icon>
);
export const LayoutDashboardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></Icon>
);
export const SettingsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></Icon>
);
export const BrainCircuitIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path d="M12 5a3 3 0 1 0-5.993.129" /><path d="M12 5a3 3 0 1 0 5.993.129" /><path d="M15 12a3 3 0 1 0-5.993.129" /><path d="M15 12a3 3 0 1 0 5.993.129" /><path d="M9 12a3 3 0 1 0-5.993.129" /><path d="M9 12a3 3 0 1 0 5.993.129" /><path d="M12 19a3 3 0 1 0-5.993.129" /><path d="M12 19a3 3 0 1 0 5.993.129" /><path d="M12 5a3 3 0 0 0-3 3v2" /><path d="M12 5a3 3 0 0 1 3 3v2" /><path d="M12 19v-2a3 3 0 0 0-3-3" /><path d="M12 19v-2a3 3 0 0 1 3-3" /><path d="M9 12a3 3 0 0 0-3-3H4" /><path d="M9 12a3 3 0 0 1-3 3H4" /><path d="M15 12a3 3 0 0 1 3-3h2" /><path d="M15 12a3 3 0 0 0 3 3h2" /><path d="M6 9V7" /><path d="M6 15v2" /><path d="M18 9V7" /><path d="M18 15v2" /></Icon>
);
export const SunIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></Icon>
);
export const MoonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></Icon>
);
export const LanguagesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path d="m5 8 6 6" /><path d="m4 14 6-6 2-3" /><path d="M2 5h12" /><path d="M7 2h1" /><path d="m22 22-5-10-5 10" /><path d="M14 18h6" /></Icon>
);
export const LogOutIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></Icon>
);
export const GoogleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.19,4.73C14.76,4.73 16.04,5.87 17.01,6.73L19.05,4.82C17.25,3.16 14.86,2 12.19,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.19,22C17.6,22 21.54,18.33 21.54,12.29C21.54,11.73 21.48,11.41 21.35,11.1Z" /></svg>
);
export const UploadCloudIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="M12 12v9" /><path d="m16 16-4-4-4 4" /></Icon>
);
export const ZapIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></Icon>
);
export const FolderLockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path d="M10 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v2.5" /><rect x="14" y="16" width="8" height="6" rx="1" /><path d="M18 16v-2a2 2 0 1 0-4 0v2" /></Icon>
);
export const GraduationCapIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></Icon>
);
export const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path d="M5 12h14" /><path d="M12 5v14" /></Icon>
);
export const FileTextIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><line x1="10" x2="8" y1="9" y2="9" /></Icon>
);
export const LoaderIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></Icon>
);
export const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></Icon>
);
export const BarChartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><line x1="12" x2="12" y1="20" y2="10" /><line x1="18" x2="18" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="16" /></Icon>
);
export const ClockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></Icon>
);
export const UserCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><path d="M18 20a6 6 0 0 0-12 0" /><circle cx="12" cy="10" r="4" /><circle cx="12" cy="12" r="10" /></Icon>
);