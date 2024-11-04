import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { CircleUserRound, LogOut } from 'lucide-react';

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
          <DropdownMenuItem>
            <LogOut />
            Wyloguj
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
