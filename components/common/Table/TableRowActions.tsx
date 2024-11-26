import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Protocol } from '@/lib/types/columnTypes';
import {
  CircleXIcon,
  Download,
  Eye,
  MoreHorizontal,
  Pencil,
} from 'lucide-react';
import Link from 'next/link';

interface TableRowActionsProps {
  protocol: Protocol;
}

export default function TableRowActions({ protocol }: TableRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="gap-1 hover:opacity-60" asChild>
          <Link href={`/${protocol.protocolType}/edit/${protocol.id}`}>
            <Pencil />
            Edytuj
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-1 hover:opacity-60" asChild>
          <Link href={`/${protocol.protocolType}/${protocol.id}`}>
            <Eye />
            Podgląd
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-1 hover:opacity-60">
          <Download />
          Pobierz
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-1 hover:opacity-60">
          <CircleXIcon />
          Usuń
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
