'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { deleteUser } from '@/lib/actions/userActions';
import toast from 'react-hot-toast';

interface AlertDialogComponentProps {
  children: React.ReactNode;
  title: string;
  description?: string;

  id: string;
}

export default function AlertDialogComponent({
  children,
  title,
  description,

  id,
}: AlertDialogComponentProps) {
  const handleOnDelete = async (id: string) => {
    try {
      await deleteUser(id);
      toast.success(`Pomyślnie usunięto użytkownika`);
    } catch (error) {
      toast.error('Wystąpił nieoczekiwany błąd');
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Anuluj</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleOnDelete(id)}>
            Kontynuuj
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
