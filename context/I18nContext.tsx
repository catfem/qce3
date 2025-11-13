import React, { createContext, useState, useCallback, useMemo } from 'react';
import { Language } from '../types';

const en = {
  "appName": "AI Question Bank",
  "sidebar": {
    "home": "Home",
    "myBank": "My Bank",
    "openBank": "Open Bank",
    "dashboard": "Dashboard",
    "settings": "Settings"
  },
  "home": {
    "title": {
      "line1": "Unlock Your Knowledge with",
      "line2": "AI-Powered Learning"
    },
    "subtitle": "Transform your documents into interactive quizzes instantly. Secure, private, and powered by cutting-edge AI.",
    "cta": {
      "primary": "Get Started",
      "secondary": "How It Works"
    },
    "feature1": {
      "title": "Upload Anything",
      "description": "Easily upload PDF, DOCX, or TXT files containing your study materials."
    },
    "feature2": {
      "title": "Instant AI Extraction",
      "description": "Gemini AI automatically parses your documents and extracts relevant questions."
    },
    "feature3": {
      "title": "Secure & Private",
      "description": "Your files are client-side encrypted and stored securely in your own Google Drive."
    },
    "feature4": {
      "title": "Learn & Share",
      "description": "Study your private questions or explore the Open Bank for community content."
    }
  },
  "myBank": {
    "title": "My Private Bank",
    "addQuestion": "Add Manually",
    "upload": {
      "title": "Generate Questions from a File",
      "description": "Upload a document, and our AI will automatically extract questions for you. Your file is processed securely and is never stored on our servers.",
      "cta": "Upload & Generate",
      "processing": "Processing..."
    },
    "empty": {
      "title": "Your question bank is empty.",
      "description": "Upload a file or add a question manually to get started."
    }
  },
  "openBank": {
    "title": "Open Question Bank",
    "subtitle": "Explore a vast collection of questions shared by the community. Find new topics and test your knowledge.",
    "searchPlaceholder": "Search for topics, keywords...",
    "empty": {
      "title": "No questions found.",
      "description": "Try a different search term or check back later for new content."
    }
  },
  "dashboard": {
    "title": "Dashboard",
    "stat1": { "title": "Total Questions" },
    "stat2": { "title": "Sessions Completed" },
    "stat3": { "title": "Correctness Rate" },
    "chart1": { "title": "Activity This Week" },
    "chart2": { "title": "Questions by Topic" },
    "chartPlaceholder": "Chart data will be displayed here."
  },
  "settings": {
    "title": "Settings",
    "account": { "title": "Account", "name": "Full Name", "email": "Email Address" },
    "integrations": { "title": "Integrations", "googleDrive": "Google Drive", "connected": "Connected", "reauthorize": "Re-authorize" },
    "language": { "title": "Language" },
    "danger": { "title": "Danger Zone", "description": "Deleting your account is permanent and cannot be undone.", "cta": "Delete My Account" }
  },
  "auth": {
    "title": "Welcome Back",
    "subtitle": "Sign in to continue to your personal learning space.",
    "registerTitle": "Create an Account",
    "registerSubtitle": "Get started with your personal learning space.",
    "googleCta": "Sign in with Google",
    "loginCta": "Sign In",
    "registerCta": "Create Account",
    "guestCta": "Continue as Guest",
    "loading": "Processing...",
    "emailLabel": "Email Address",
    "passwordLabel": "Password",
    "switchToRegister": "Don't have an account? Sign up",
    "switchToLogin": "Already have an account? Sign In",
    "or": "OR",
    "terms": {
      "prefix": "By signing in, you agree to our",
      "termsLink": "Terms of Service",
      "and": "and",
      "privacyLink": "Privacy Policy"
    }
  },
  "guest": {
    "sidebarTooltip": "Sign up to access this feature.",
    "featureLocked": {
      "title": "Feature Locked for Guests",
      "description": "Please sign up or log in to use your private question bank.",
      "cta": "Sign Up / Log In"
    }
  }
};

const zhTW = {
  "appName": "AI 題庫",
  "sidebar": {
    "home": "首頁",
    "myBank": "我的題庫",
    "openBank": "公開題庫",
    "dashboard": "儀表板",
    "settings": "設定"
  },
  "home": {
    "title": {
      "line1": "用 AI 驅動的學習",
      "line2": "解鎖您的知識"
    },
    "subtitle": "立即將您的文件轉換為互動式測驗。安全、私密，並由頂尖 AI 技術驅動。",
    "cta": {
      "primary": "開始使用",
      "secondary": "運作方式"
    },
    "feature1": {
      "title": "上傳任何文件",
      "description": "輕鬆上傳包含您學習資料的 PDF、DOCX 或 TXT 文件。"
    },
    "feature2": {
      "title": "即時 AI 擷取",
      "description": "Gemini AI 會自動解析您的文件並擷取相關問題。"
    },
    "feature3": {
      "title": "安全與隱私",
      "description": "您的文件在客戶端加密，並安全地儲存在您自己的 Google 雲端硬碟中。"
    },
    "feature4": {
      "title": "學習與分享",
      "description": "學習您的私人問題，或探索公開題庫中的社群內容。"
    }
  },
  "myBank": {
    "title": "我的私人題庫",
    "addQuestion": "手動新增",
    "upload": {
      "title": "從文件生成問題",
      "description": "上傳一份文件，我們的 AI 將自動為您擷取問題。您的文件將被安全處理，絕不會儲存在我們的伺服器上。",
      "cta": "上傳並生成",
      "processing": "處理中..."
    },
    "empty": {
      "title": "您的題庫是空的。",
      "description": "上傳文件或手動新增問題以開始使用。"
    }
  },
  "openBank": {
    "title": "公開題庫",
    "subtitle": "探索社群分享的大量問題。尋找新主題並測試您的知識。",
    "searchPlaceholder": "搜尋主題、關鍵字...",
    "empty": {
      "title": "找不到問題。",
      "description": "請嘗試不同的搜尋詞，或稍後再回來查看新內容。"
    }
  },
  "dashboard": {
    "title": "儀表板",
    "stat1": { "title": "總問題數" },
    "stat2": { "title": "完成的練習" },
    "stat3": { "title": "正確率" },
    "chart1": { "title": "本週活動" },
    "chart2": { "title": "各主題問題分佈" },
    "chartPlaceholder": "圖表數據將顯示於此。"
  },
  "settings": {
    "title": "設定",
    "account": { "title": "帳戶", "name": "全名", "email": "電子郵件地址" },
    "integrations": { "title": "整合服務", "googleDrive": "Google 雲端硬碟", "connected": "已連接", "reauthorize": "重新授權" },
    "language": { "title": "語言" },
    "danger": { "title": "危險區域", "description": "刪除帳戶是永久性的，無法復原。", "cta": "刪除我的帳戶" }
  },
  "auth": {
    "title": "歡迎回來",
    "subtitle": "登入以繼續您的個人化學習空間。",
    "registerTitle": "建立帳戶",
    "registerSubtitle": "開始您的個人化學習空間。",
    "googleCta": "使用 Google 登入",
    "loginCta": "登入",
    "registerCta": "建立帳戶",
    "guestCta": "以訪客身份繼續",
    "loading": "處理中...",
    "emailLabel": "電子郵件地址",
    "passwordLabel": "密碼",
    "switchToRegister": "沒有帳戶？立即註冊",
    "switchToLogin": "已經有帳戶了？立即登入",
    "or": "或",
    "terms": {
      "prefix": "登入即表示您同意我們的",
      "termsLink": "服務條款",
      "and": "和",
      "privacyLink": "隱私政策"
    }
  },
  "guest": {
    "sidebarTooltip": "註冊以使用此功能。",
    "featureLocked": {
      "title": "訪客功能限制",
      "description": "請註冊或登入以使用您的私人題庫。",
      "cta": "註冊 / 登入"
    }
  }
};

const translations = {
  en,
  'zh-TW': zhTW,
};

type NestedStrings = { [key: string]: string | NestedStrings };

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
        const storedLang = localStorage.getItem('language') as Language;
        if (storedLang && ['en', 'zh-TW'].includes(storedLang)) {
            return storedLang;
        }
        return navigator.language.startsWith('zh') ? 'zh-TW' : 'en';
    }
    return 'en';
  });

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let result: string | NestedStrings | undefined = translations[language];
    for (const k of keys) {
        if (result && typeof result === 'object' && k in result) {
            result = result[k];
        } else {
            return key; // Return key if translation not found
        }
    }
    return typeof result === 'string' ? result : key;
  }, [language]);

  const setLanguageAndStore = (lang: Language) => {
    setLanguage(lang);
    if(typeof window !== 'undefined') {
        localStorage.setItem('language', lang);
    }
  }

  const value = useMemo(() => ({ language, setLanguage: setLanguageAndStore, t }), [language, t]);

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};