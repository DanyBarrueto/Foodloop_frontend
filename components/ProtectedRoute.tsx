import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import React, { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
  fallbackPath?: string;
};

export default function ProtectedRoute({ children, fallbackPath = '/login' }: Props) {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(fallbackPath as any);
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading) return null;
  if (!isAuthenticated) return null;
  return <>{children}</>;
}
