import React, { useState, useCallback, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import Button from '../components/ui/Button';
import { PlusIcon, FileTextIcon, LoaderIcon, LockIcon } from '../components/icons/Icons';
import { Question } from '../types';
import QuestionCard from '../components/QuestionCard';
import geminiService from '../services/gemini';
import encryptionService from '../services/encryption';
import googleDriveService from '../services/googleDrive';
import { supabase } from '../services/supabase';
import { useAuth } from '../hooks/useAuth';

const MyBankPage: React.FC = () => {
  const { t } = useTranslation();
  const { user, session, logout } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const isGuest = user && 'isGuest' in user && user.isGuest;

  const fetchUserQuestions = useCallback(async () => {
    if (!user || isGuest) {
      setIsFetching(false);
      return;
    }
    
    setIsFetching(true);
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('author_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      if (data) {
        const userQuestions: Question[] = data.map(q => ({
          id: q.id,
          content: q.content,
          answer: q.answer,
          tags: q.tags,
          difficulty: q.difficulty,
          topic: q.topic,
          isPublic: q.is_public,
          createdAt: q.created_at,
          authorId: q.author_id,
          storageRef: q.storage_ref
        }));
        setQuestions(userQuestions);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch your questions.');
    } finally {
      setIsFetching(false);
    }
  }, [user, isGuest]);

  useEffect(() => {
    fetchUserQuestions();
  }, [fetchUserQuestions]);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = useCallback(async () => {
    if (!selectedFile || !user || isGuest) {
      setError('Please select a file and ensure you are logged in.');
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.readAsText(selectedFile);
      reader.onload = async (event) => {
        try {
          const fileContent = event.target?.result as string;
          
          const extractedData = await geminiService.extractQuestionsFromFile(fileContent);
          
          const encryptionKey = 'user-specific-strong-key';
          const encryptedContent = await encryptionService.encrypt(JSON.stringify(extractedData), encryptionKey);
          
          if (!session?.provider_token) {
            throw new Error('No Google provider token found. Please log in with Google.');
          }

          const driveFile = await googleDriveService.uploadFile(
            `${selectedFile.name}.encrypted`,
            encryptedContent,
            session.provider_token
          );
          
          const questionsToInsert = extractedData.map(q => ({
            ...q,
            is_public: false,
            author_id: user.id,
            storage_ref: driveFile.id,
          }));

          const { data: insertedQuestions, error: insertError } = await supabase
            .from('questions')
            .insert(questionsToInsert)
            .select();

          if (insertError) {
            throw insertError;
          }

          if (insertedQuestions) {
            const newQuestions: Question[] = insertedQuestions.map(q => ({
                id: q.id,
                content: q.content,
                answer: q.answer,
                tags: q.tags,
                difficulty: q.difficulty,
                topic: q.topic,
                isPublic: q.is_public,
                createdAt: q.created_at,
                authorId: q.author_id,
                storageRef: q.storage_ref
            }));
            setQuestions(prev => [...newQuestions, ...prev]);
          }

          setSelectedFile(null);
        } catch (e) {
          setError(e instanceof Error ? e.message : 'An unknown error occurred during processing.');
        } finally {
          setIsLoading(false);
        }
      };
      reader.onerror = () => {
        setError("Failed to read file.");
        setIsLoading(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setIsLoading(false);
    }
  }, [selectedFile, user, isGuest]);
  
  const handleAuthAction = async () => {
    await logout(); // This will clear the guest user and trigger the AuthModal
  }

  if (isGuest) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <LockIcon className="h-16 w-16 mx-auto mb-4 text-primary" />
        <h2 className="text-2xl font-bold mb-2 text-text-light-primary dark:text-dark-primary">{t('guest.featureLocked.title')}</h2>
        <p className="max-w-md text-text-light-secondary dark:text-dark-secondary mb-6">{t('guest.featureLocked.description')}</p>
        <Button onClick={handleAuthAction} size="lg">{t('guest.featureLocked.cta')}</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-text-light-primary dark:text-dark-primary">{t('myBank.title')}</h1>
        <Button>
          <PlusIcon className="h-5 w-5 mr-2" />
          {t('myBank.addQuestion')}
        </Button>
      </div>
      
      <div className="bg-card-light dark:bg-card-dark p-6 rounded-xl border border-border-light dark:border-border-dark backdrop-blur-xl mb-8">
        <h2 className="text-xl font-semibold mb-4 text-text-light-primary dark:text-dark-primary">{t('myBank.upload.title')}</h2>
        <p className="text-text-light-secondary dark:text-dark-secondary mb-4">{t('myBank.upload.description')}</p>
        <div className="flex items-center space-x-4">
          <label className="flex-grow">
            <span className="sr-only">Choose file</span>
            <input type="file" onChange={handleFileChange} accept=".pdf,.docx,.txt"
                   className="block w-full text-sm text-text-light-secondary dark:text-dark-secondary
                              file:mr-4 file:py-2 file:px-4
                              file:rounded-full file:border-0
                              file:text-sm file:font-semibold
                              file:bg-primary/10 file:text-primary
                              hover:file:bg-primary/20" />
          </label>
          <Button onClick={handleUpload} disabled={!selectedFile || isLoading}>
            {isLoading ? <LoaderIcon className="animate-spin h-5 w-5 mr-2" /> : <PlusIcon className="h-5 w-5 mr-2" />}
            {isLoading ? t('myBank.upload.processing') : t('myBank.upload.cta')}
          </Button>
        </div>
         {selectedFile && <p className="text-sm mt-4 text-text-light-secondary dark:text-dark-secondary">Selected: {selectedFile.name}</p>}
         {error && <p className="text-sm mt-4 text-red-500">{error}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isFetching ? (
            <div className="col-span-full flex justify-center items-center py-16">
              <LoaderIcon className="h-12 w-12 animate-spin text-primary" />
            </div>
        ) : questions.length > 0 ? (
          questions.map(q => <QuestionCard key={q.id} question={q} />)
        ) : (
          <div className="col-span-full text-center py-16 text-text-light-secondary dark:text-dark-secondary">
            <FileTextIcon className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-light-primary dark:text-dark-primary">{t('myBank.empty.title')}</h3>
            <p>{t('myBank.empty.description')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBankPage;