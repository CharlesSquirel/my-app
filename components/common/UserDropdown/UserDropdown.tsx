import SignOutBtn from '@/components/common/SignOutBtn/SignOutBtn';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { Building2, CircleUserRound } from 'lucide-react';
import Link from 'next/link';

export default function UserDropdown() {
  return (
    <div className="flex items-center gap-2">
      <h2 className="font-semibold">Karol Wiewiórka</h2>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer outline-0">
          <DotsVerticalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <CircleUserRound /> Profil
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/firma">
              <Building2 /> Firmy
            </Link>
          </DropdownMenuItem>

          <SignOutBtn />
          {/* <LogOut />
            Wyloguj */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
