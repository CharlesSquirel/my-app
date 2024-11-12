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
import { findAllFirma } from '@/lib/actions/firmaActions';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default async function Firmas() {
  const firmaAll = await findAllFirma();
  return (
    <section>
      <PageTitle title="Firmy i siedziby" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nazwa</TableHead>
            <TableHead>Adres</TableHead>
            <TableHead>Kontakt</TableHead>
            <TableHead>Liczba obiektów</TableHead>
            <TableHead>Akcje</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {firmaAll.map((firma) => (
            <React.Fragment key={firma.id}>
              <TableRow>
                <TableCell>{firma.shortName}</TableCell>
                <TableCell>{`${firma.street} ${firma.houseNumber}/${firma.localNumber}, ${firma.postCode} ${firma.city}`}</TableCell>
                <TableCell>{`${firma.tel}, ${firma.contactEmail}`}</TableCell>
                <TableCell>{firma.locations.length}</TableCell>
                <TableCell className="flex gap-2">
                  <Link href={`/firma/${firma.id}`}>
                    <Eye className="cursor-pointer hover:stroke-customBlue" />
                  </Link>
                  <Link href={`/user/${firma.id}`}>
                    <Pencil className="hover:stroke-customBlue" />
                  </Link>
                  <AlertDialogComponent
                    title="Czy na pewno chcesz usunąć użytkownika?"
                    description="Ta akcja usunie bezpowrotnie dane użytkownika z bazy danych"
                    id={firma.id}
                  >
                    <Trash2 className="cursor-pointer hover:stroke-destructive" />
                  </AlertDialogComponent>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
