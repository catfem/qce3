
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-card-light dark:bg-card-dark p-6 rounded-xl border border-border-light dark:border-border-dark backdrop-blur-xl shadow-lg ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
