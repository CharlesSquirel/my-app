'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useClerk } from '@clerk/nextjs';
import { LogOut } from 'lucide-react';

export default function SignOutBtn() {
  const { signOut } = useClerk();

  return (
    // <SignOutButton>
    <DropdownMenuItem onClick={() => signOut({ redirectUrl: '/sign-in' })}>
      <LogOut /> Wyloguj
    </DropdownMenuItem>
    // </SignOutButton>
  );
}
