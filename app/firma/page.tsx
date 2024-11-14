import PageTitle from '@/components/common/PageTitle/PageTitle';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { findAllFirma } from '@/lib/actions/firmaActions';
import { SquareArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default async function Firmas() {
  const firmaAll = await findAllFirma();
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <PageTitle title="Firmy" />
        <Button asChild>
          <Link href="/firma/add">Dodaj firmę</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nazwa</TableHead>
            <TableHead>Adres</TableHead>
            <TableHead>Kontakt</TableHead>
            <TableHead>Liczba obiektów</TableHead>
            <TableHead>Więcej...</TableHead>
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
                <TableCell className="flex items-center gap-2 max-[480px]:translate-y-[50%]">
                  <Link href={`/firma/${firma.id}`}>
                    <SquareArrowRight className="cursor-pointer hover:stroke-customBlue" />
                  </Link>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
