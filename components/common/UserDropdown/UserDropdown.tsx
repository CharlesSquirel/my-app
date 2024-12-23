import SignOutBtn from '@/components/common/SignOutBtn/SignOutBtn';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { currentUser } from '@clerk/nextjs/server';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { Building2, CircleUserRound } from 'lucide-react';
import Link from 'next/link';

export default async function UserDropdown() {
  const user = await currentUser();
  return (
    <div className="flex flex-col-reverse items-end gap-2 sm:flex-row sm:items-center">
      <h2 className="text-end text-base font-semibold sm:text-lg">{`${user?.firstName} ${user?.lastName}`}</h2>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer outline-0">
          <HamburgerMenuIcon className="h-6 w-6" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link href="/user/view">
              <CircleUserRound /> Profil
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/firma">
              <Building2 /> Firmy
            </Link>
          </DropdownMenuItem>
          <SignOutBtn />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
