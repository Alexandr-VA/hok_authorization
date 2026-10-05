// src/components/AdminPanel.tsx
import React from 'react';
import type { CurrentUser } from '../types';

interface AdminPanelProps {
  currentUser?: CurrentUser | null;
}

/**
 * Пример защищённого компонента — админская панель.
 */
export const AdminPanel: React.FC<AdminPanelProps> = ({ currentUser }) => {
  return (
    <div>
      <h2>Админская панель</h2>
      <p>Добро пожаловать, {currentUser?.name ?? 'администратор'}!</p>
    </div>
  );
};