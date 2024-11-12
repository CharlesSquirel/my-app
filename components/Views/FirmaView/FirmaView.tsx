import ViewDataRow from '@/components/common/ViewDataRow/ViewDataRow';
import { Prisma } from '@prisma/client';
import PageTitle from '../../common/PageTitle/PageTitle';
import { Card } from '../../ui/card';

interface FirmaViewProps {
  firma: Prisma.FirmaGetPayload<{ include: { locations: true } }>;
}

export default function FirmaViewComponent({ firma }: FirmaViewProps) {
  return (
    <section className="flex w-[700px] flex-col gap-5">
      <PageTitle title={`Dane firmy ${firma.shortName}`} />
      <Card className="flex flex-col gap-4 p-5">
        <div className="flex flex-col">
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
        {firma.locations}
        <div className="flex flex-col">asdasd</div>
      </Card>
    </section>
  );
}
