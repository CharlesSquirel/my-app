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
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface AlertDialogComponentProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  id: string;
  onDelete: (id: string) => void;
  pathAfterDelete?: string;
}

export default function AlertDialogComponent({
  children,
  title,
  description,
  onDelete,
  id,
  pathAfterDelete,
}: AlertDialogComponentProps) {
  const router = useRouter();
  const handleOnDelete = async (id: string) => {
    try {
      await onDelete(id);
      toast.success(`Pomyślnie usunięto`);
      if (pathAfterDelete) {
        router.push(pathAfterDelete);
      }
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
