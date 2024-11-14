import AlertDialogComponent from '@/components/common/AlertDialog/AlertDialogComponent';
import ButtonBack from '@/components/common/ButtonBack/ButtonBack';
import ViewDataRow from '@/components/common/ViewDataRow/ViewDataRow';
import { Button } from '@/components/ui/button';
import { deleteFirma } from '@/lib/actions/firmaActions';
import { Prisma } from '@prisma/client';
import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import PageTitle from '../../common/PageTitle/PageTitle';
import { Card } from '../../ui/card';
import LocationView from './LocationView';

interface FirmaViewProps {
  firma: Prisma.FirmaGetPayload<{ include: { locations: true } }>;
}

export default function FirmaViewComponent({ firma }: FirmaViewProps) {
  return (
    <section className="mx-auto mt-5 flex w-full flex-col gap-5 md:mt-0 md:w-[700px]">
      <ButtonBack />
      <div className="flex justify-between gap-4">
        <PageTitle title={`Dane firmy ${firma.shortName}`} />
        <div className="md: flex gap-2">
          <Button asChild variant="outline">
            <Link href={`/firma/edit/${firma.id}`}>
              <Pencil />
              Edytuj
            </Link>
          </Button>
          <AlertDialogComponent
            id={firma.id}
            onDelete={deleteFirma}
            title="Czy na pewno chcesz usunąć firmę?"
            description="Ta operacja bezpowrotnie usunie firmę oraz wszystkie siedziby do niej przypisane"
            pathAfterDelete="/firma"
          >
            <Button
              variant="destructive"
              className="flex items-center"
              aria-label="Usuń firmę"
            >
              <Trash2 /> Usuń
            </Button>
          </AlertDialogComponent>
        </div>
      </div>
      <Card className="flex flex-col gap-4 p-5">
        <div className="flex w-fit flex-col border-b pb-3">
          <ViewDataRow label="Pełna nazwa" data={firma.fullName} />
          <ViewDataRow label="Skrócona nazwa" data={firma.shortName} />
          <ViewDataRow label="Ulica" data={firma.street} />
          <ViewDataRow
            label="Nr domu/lokalu"
            data={`${firma.houseNumber}/${firma.localNumber}`}
          />
          <ViewDataRow label="Kod pocztowy" data={firma.postCode} />
          <ViewDataRow label="Miejscowość" data={firma.city} />
          <ViewDataRow label="Telefon kontaktowy" data={firma.tel} />
          <ViewDataRow label="Email kontaktowy" data={firma.contactEmail} />
        </div>
        {firma.locations.map((location, index) => (
          <LocationView
            location={location}
            index={index}
            locationsLength={firma.locations.length}
            key={location.id}
          />
        ))}
      </Card>
    </section>
  );
}
