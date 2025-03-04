import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface AppLayoutProps {
  children: React.ReactNode;
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, onNavigate, currentPage }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={onNavigate} />
      <div className="flex">
        <Sidebar onNavigate={onNavigate} currentPage={currentPage} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};