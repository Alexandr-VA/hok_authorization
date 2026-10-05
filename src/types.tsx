// src/types.ts
export type UserRole = string;

export interface CurrentUser {
  roles: UserRole[];
  name?: string;
}

export interface WithAuthorizationProps {
  currentUser?: CurrentUser | null;
}

export interface AccessDeniedProps {
  message?: string;
}