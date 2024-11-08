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

export default async function Firmas() {
  const firmaAll = await findAllFirma();
  console.log(firmaAll);
  return (
    <section>
      <PageTitle title="Firmy" />
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
            <TableRow key={firma.id}>
              <TableCell>{firma.shortName}</TableCell>
              <TableCell>{`${firma.street} ${firma.houseNumber}/${firma.localNumber}, ${firma.postCode} ${firma.city}`}</TableCell>
              <TableCell>{`${firma.tel}, ${firma.contactEmail}`}</TableCell>
              <TableCell>{firma.locations.length}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
