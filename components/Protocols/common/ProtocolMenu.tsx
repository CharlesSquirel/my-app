import AlertDialogComponent from '@/components/common/AlertDialog/AlertDialogComponent';
import { Button } from '@/components/ui/button';
import { ProtocolType } from '@/lib/zod/zodSchema';
import { useUser } from '@clerk/nextjs';
import { ArrowUpDown, Download, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface ProtocolMenuProps {
  id: string;
  valveSigned: boolean;
  deleteValve: (id: string) => Promise<void>;
  handleSignModal: () => void;
  lastName: string;
  type: ProtocolType;
}

export default function ProtocolMenu({
  id,
  valveSigned,
  deleteValve,
  handleSignModal,
  lastName,
  type,
}: ProtocolMenuProps) {
  const { user } = useUser();
  if (!user) {
    return null;
  }
  const isUserAuthorized =
    user.lastName === lastName ||
    process.env.NEXT_PUBLIC_ADMIN_LASTNAME === user.lastName;

  return (
    <div className="mb-6 flex justify-end gap-2">
      {isUserAuthorized && (
        <Button variant="outline" asChild>
          <Link href={`/${type}/edit/${id}`}>
            <Pencil />
            Edytuj
          </Link>
        </Button>
      )}
      <Button variant="outline" asChild>
        <Link href={`/${type}/pdf/${id}`}>
          <Download />
          Pobierz
        </Link>
      </Button>
      {isUserAuthorized && (
        <Button
          variant="outline"
          onClick={handleSignModal}
          disabled={valveSigned}
        >
          <ArrowUpDown /> Pobierz i wyślij z podpisem
        </Button>
      )}
      {isUserAuthorized && (
        <AlertDialogComponent
          onDelete={deleteValve}
          id={id}
          title="Czy na pewno chcesz usunąć ten protokół?"
          description="Usunięcie tego protokołu jest nieodwracalne"
          pathAfterDelete="/"
        >
          <Button variant="destructive">
            <Trash2 /> Usuń
          </Button>
        </AlertDialogComponent>
      )}
    </div>
  );
}
