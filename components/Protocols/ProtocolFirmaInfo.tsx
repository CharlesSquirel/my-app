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
  } = data as Firma;
  return <div></div>;
}
