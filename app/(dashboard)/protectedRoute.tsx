"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAdmin, isAuthenticated } from '@/utility/auth';


export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    } else if (!isAdmin()) {
      router.push('/');
    }
  }, [router]);

  return <>{children}</>;
}