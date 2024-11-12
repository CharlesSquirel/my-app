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
            <TableRow key={firma.id}>
              <TableCell>{firma.shortName}</TableCell>
              <TableCell>{`${firma.street} ${firma.houseNumber}/${firma.localNumber}, ${firma.postCode} ${firma.city}`}</TableCell>
              <TableCell>{`${firma.tel}, ${firma.contactEmail}`}</TableCell>
              <TableCell>{firma.locations.length}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            firma.locations.map((location) => {
<TableRow key={location.id}>

</TableRow>
            })
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
