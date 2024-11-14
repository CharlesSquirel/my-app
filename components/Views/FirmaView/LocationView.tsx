import ViewDataRow from '@/components/common/ViewDataRow/ViewDataRow';
import { Location } from '@prisma/client';

interface LocationViewProps {
  location: Location;
  locationsLength: number;
  index: number;
}

export default function LocationView({
  location,
  index,
  locationsLength,
}: LocationViewProps) {
  const {
    fullName,
    shortName,
    street,
    houseNumber,
    localNumber,
    postCode,
    city,
    tel,
    contactEmail,
  } = location;
  return (
    <div
      className={`${index + 1 !== locationsLength && 'border-b'} flex w-fit flex-col`}
    >
      <p className="font-semibold">{`Siedziba ${index + 1}`}</p>
      <ViewDataRow label="Pełna nazwa" data={fullName} />
      <ViewDataRow label="Skrócona nazwa" data={shortName} />
      <ViewDataRow label="Ulica" data={street} />
      <ViewDataRow
        label="Nr domu/lokalu"
        data={`${houseNumber}/${localNumber}`}
      />
      <ViewDataRow label="Kod pocztowy" data={postCode} />
      <ViewDataRow label="Miejscowość" data={city} />
      <ViewDataRow label="Telefon kontaktowy" data={tel} />
      <ViewDataRow label="Email kontaktowy" data={contactEmail} />
    </div>
  );
}
