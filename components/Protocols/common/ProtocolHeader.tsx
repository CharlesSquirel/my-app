import { Firma, Location } from '@prisma/client';
import ProtocolFirmaInfo from './ProtocolFirmaInfo';
import ProtocolUserInfo, { User } from './ProtocolUserInfo';

type ProtocolHeaderData = {
  firma: Firma;
  location: Location;
  user: User;
  date: string;
};

interface ProtocolHeaderProps {
  protocolHeaderData: ProtocolHeaderData;
}

export default function ProtocolHeader({
  protocolHeaderData: { firma, location, user, date },
}: ProtocolHeaderProps) {
  return (
    <div className="flex justify-between">
      <div className="flex gap-8">
        <ProtocolFirmaInfo data={firma} mode="web" />
        <ProtocolFirmaInfo data={location} mode="web" />
        <ProtocolUserInfo user={user} mode="web" />
      </div>
      <p className="font-medium">{date}</p>
    </div>
  );
}
