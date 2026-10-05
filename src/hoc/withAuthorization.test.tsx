// src/hoc/withAuthorization.test.tsx
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withAuthorization } from './withAuthorization';
import type { CurrentUser } from '../types';

interface ProtectedProps {
  currentUser?: CurrentUser | null;
  title?: string;
}

const ProtectedComponent: React.FC<ProtectedProps> = ({ title = 'Секрет' }) => (
  <div data-testid="protected">{title}</div>
);

const ProtectedWithAuth = withAuthorization(ProtectedComponent, ['admin']);

describe('withAuthorization HOC', () => {
  it('рендерит WrappedComponent, если у пользователя есть нужная роль', () => {
    render(
      <ProtectedWithAuth currentUser={{ roles: ['admin'] }} title="Контент" />,
    );
    expect(screen.getByTestId('protected')).toHaveTextContent('Контент');
  });

  it('рендерит WrappedComponent, если есть хотя бы одна из нескольких ролей', () => {
    render(<ProtectedWithAuth currentUser={{ roles: ['user', 'admin'] }} />);
    expect(screen.getByTestId('protected')).toBeInTheDocument();
  });

  it('показывает заглушку, если роли не совпадают', () => {
    render(<ProtectedWithAuth currentUser={{ roles: ['user'] }} />);
    expect(
      screen.getByText('У вас нет прав для просмотра этого раздела.'),
    ).toBeInTheDocument();
    expect(screen.queryByTestId('protected')).not.toBeInTheDocument();
  });

  it('показывает заглушку, если currentUser отсутствует', () => {
    render(<ProtectedWithAuth />);
    expect(
      screen.getByText('У вас нет прав для просмотра этого раздела.'),
    ).toBeInTheDocument();
  });

  it('показывает заглушку, если currentUser === null', () => {
    render(<ProtectedWithAuth currentUser={null} />);
    expect(
      screen.getByText('У вас нет прав для просмотра этого раздела.'),
    ).toBeInTheDocument();
  });

  it('использует кастомный компонент-заглушку, если он передан', () => {
    const CustomFallback: React.FC<{ message?: string }> = ({ message }) => (
      <div data-testid="custom-fallback">{message ?? 'Нет доступа'}</div>
    );

    const CustomProtected = withAuthorization(
      ProtectedComponent,
      ['admin'],
      {
        fallbackComponent: CustomFallback,
        accessDeniedMessage: 'Доступ закрыт',
      },
    );

    render(<CustomProtected currentUser={{ roles: ['user'] }} />);
    expect(screen.getByTestId('custom-fallback')).toHaveTextContent(
      'Доступ закрыт',
    );
  });

  it('передаёт все пропсы в WrappedComponent без изменений', () => {
    render(
      <ProtectedWithAuth
        currentUser={{ roles: ['admin'] }}
        title="Переданный заголовок"
      />,
    );
    expect(screen.getByTestId('protected')).toHaveTextContent(
      'Переданный заголовок',
    );
  });
});