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
    <div className="flex items-center gap-2">
      <h2 className="text-lg font-semibold">{`${user?.firstName} ${user?.lastName}`}</h2>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer outline-0">
          <HamburgerMenuIcon className="h-5 w-5" />
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
