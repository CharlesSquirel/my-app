import { Firma, Location } from '@prisma/client';

interface ProtocolFirmaInfoProps {
  data: Firma | Location;
}

export default function ProtocolFirmaInfo({ data }: ProtocolFirmaInfoProps) {
  const {
    fullName,
    street,
    houseNumber,
    localNumber,
    postCode,
    city,
    tel,
    contactEmail,
  } = data;
  return (
    <div className="flex flex-col">
      <p className="font-medium">{fullName}</p>
      <p>{`${street} ${houseNumber}/${localNumber}`}</p>
      <p>{`${postCode}, ${city}`}</p>
      {tel && <p>{tel}</p>}
      {contactEmail && <p>{contactEmail}</p>}
    </div>
  );
}
