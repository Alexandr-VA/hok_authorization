// src/hoc/withAuthorization.tsx
import React from 'react';
import type { ComponentType } from 'react';
import { AccessDenied } from '../components/AccessDenied';
import type {
  CurrentUser,
  WithAuthorizationProps,
  AccessDeniedProps,
} from '../types';

export interface WithAuthorizationOptions {
  fallbackComponent?: ComponentType<AccessDeniedProps>;
  accessDeniedMessage?: string;
}

export function withAuthorization<P extends WithAuthorizationProps>(
  WrappedComponent: ComponentType<P>,
  allowedRoles: string[],
  options: WithAuthorizationOptions = {},
) {
  const {
    fallbackComponent: FallbackComponent,
    accessDeniedMessage,
  } = options;

  const WithAuthorization: React.FC<P> = (props) => {
    const { currentUser } = props;
    const hasAccess = checkAccess(currentUser, allowedRoles);

    if (!hasAccess) {
      if (FallbackComponent) {
        return <FallbackComponent message={accessDeniedMessage} />;
      }
      return <AccessDenied message={accessDeniedMessage} />;
    }

    return <WrappedComponent {...props} />;
  };

  WithAuthorization.displayName = `withAuthorization(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return React.memo(WithAuthorization);
}

function checkAccess(
  currentUser: CurrentUser | null | undefined,
  allowedRoles: string[],
): boolean {
  if (!currentUser || !Array.isArray(currentUser.roles)) {
    return false;
  }
  if (allowedRoles.length === 0) {
    return true;
  }
  return currentUser.roles.some((role) => allowedRoles.includes(role));
}