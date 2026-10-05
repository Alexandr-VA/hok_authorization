// src/components/AccessDenied.tsx
import React from 'react';
import type { AccessDeniedProps } from '../types';

const DEFAULT_MESSAGE = 'У вас нет прав для просмотра этого раздела.';

/**
 * Компонент-заглушка, отображаемый при отсутствии прав доступа.
 * Может быть переиспользован в других частях приложения.
 */
export const AccessDenied: React.FC<AccessDeniedProps> = ({
  message = DEFAULT_MESSAGE,
}) => {
  return <div role="alert">{message}</div>;
};