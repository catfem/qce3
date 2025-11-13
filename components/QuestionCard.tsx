
import React from 'react';
import { Question } from '../types';
import Card from './ui/Card';

interface QuestionCardProps {
  question: Question;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const difficultyColors = {
    easy: 'bg-green-500/20 text-green-400',
    medium: 'bg-yellow-500/20 text-yellow-400',
    hard: 'bg-red-500/20 text-red-400',
  };

  return (
    <Card className="flex flex-col h-full">
      <div className="flex-grow">
        <p className="text-text-light-primary dark:text-dark-primary font-medium">
          {question.content}
        </p>
      </div>
      <div className="mt-4 pt-4 border-t border-border-light dark:border-border-dark">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {question.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${difficultyColors[question.difficulty]}`}
          >
            {question.difficulty}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default QuestionCard;
