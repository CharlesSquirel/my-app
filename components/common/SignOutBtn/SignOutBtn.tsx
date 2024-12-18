'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useClerk } from '@clerk/nextjs';
import { LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SignOutBtn() {
  const { signOut } = useClerk();
  const handleSignOut = async () => {
    try {
      await signOut({ redirectUrl: '/sign-in' });
      toast.success('Wylogowano pomyślnie');
    } catch (error) {
      toast.error('Wystąpił błąd podczas wylogowywania');
    }
  };

  return (
    <DropdownMenuItem onClick={handleSignOut}>
      <LogOut /> Wyloguj
    </DropdownMenuItem>
  );
}
