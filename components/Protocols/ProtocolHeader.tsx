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
        <ProtocolFirmaInfo data={firma} />
        <ProtocolFirmaInfo data={location} />
        <ProtocolUserInfo user={user} />
      </div>
      <p className="font-medium">{date}</p>
    </div>
  );
}
