import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Question } from '../types';
import QuestionCard from '../components/QuestionCard';
import { SearchIcon, GlobeIcon, LoaderIcon } from '../components/icons/Icons';
import { supabase } from '../services/supabase';

const OpenBankPage: React.FC = () => {
  const { t } = useTranslation();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPublicQuestions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let query = supabase
          .from('questions')
          .select('*')
          .eq('is_public', true);

        if (searchTerm.trim()) {
          query = query.ilike('content', `%${searchTerm.trim()}%`);
        }
        
        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          const publicQuestions: Question[] = data.map(q => ({
            id: q.id,
            content: q.content,
            answer: q.answer,
            tags: q.tags,
            difficulty: q.difficulty,
            topic: q.topic,
            isPublic: q.is_public,
            createdAt: q.created_at,
            authorId: q.author_id
          }));
          setQuestions(publicQuestions);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch public questions.');
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchPublicQuestions();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <GlobeIcon className="h-16 w-16 mx-auto mb-4 text-primary" />
        <h1 className="text-4xl font-bold text-text-light-primary dark:text-dark-primary">{t('openBank.title')}</h1>
        <p className="mt-4 max-w-2xl mx-auto text-text-light-secondary dark:text-dark-secondary">{t('openBank.subtitle')}</p>
      </div>
      
      <div className="relative mb-8 max-w-lg mx-auto">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input 
          type="text"
          placeholder={t('openBank.searchPlaceholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-full focus:ring-2 focus:ring-primary focus:outline-none text-text-light-primary dark:text-dark-primary placeholder:text-text-light-secondary dark:placeholder:text-dark-secondary"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-16">
          <LoaderIcon className="h-12 w-12 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : questions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {questions.map(q => <QuestionCard key={q.id} question={q} />)}
        </div>
      ) : (
        <div className="text-center py-16 text-text-light-secondary dark:text-dark-secondary">
          <h3 className="text-xl font-semibold text-text-light-primary dark:text-dark-primary">{t('openBank.empty.title')}</h3>
          <p>{t('openBank.empty.description')}</p>
        </div>
      )}
    </div>
  );
};

export default OpenBankPage;