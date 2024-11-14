import AlertDialogComponent from '@/components/common/AlertDialog/AlertDialogComponent';
import PageTitle from '@/components/common/PageTitle/PageTitle';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { deleteUser, findAllUsers } from '@/lib/actions/userActions';
import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default async function Users() {
  const users = await findAllUsers();

  return (
    <section>
      <PageTitle title="Użytkownicy" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Imię</TableHead>
            <TableHead>Nazwisko</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Nr uprawnień</TableHead>
            <TableHead>Akcje</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="cursor-pointer">
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.userSignature}</TableCell>
              <TableCell className="flex gap-2">
                <Link href={`/user/${user.id}`}>
                  <Pencil className="hover:stroke-customBlue" />
                </Link>
                <AlertDialogComponent
                  title="Czy na pewno chcesz usunąć użytkownika?"
                  description="Ta akcja usunie bezpowrotnie dane użytkownika z bazy danych"
                  id={user.id}
                  onDelete={deleteUser}
                >
                  <Trash2 className="hover:stroke-destructive" />
                </AlertDialogComponent>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
