import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

export default function NewProtocolDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer outline-0" asChild>
        <Button>Nowy protokół</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href="/chiller/add">Protokół agregatu</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/valve/add">Protokół zaworu</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
