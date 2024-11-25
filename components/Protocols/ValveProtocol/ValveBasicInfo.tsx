import ProtocolRow from '../ProtocolRow';

export type BasicInfo = {
  serialNumber: string;
  type: string;
};

interface ValveBasicInfoProps {
  valveBasicInfo: BasicInfo;
}

export default function ValveBasicInfo({
  valveBasicInfo,
}: ValveBasicInfoProps) {
  return (
    <div className="flex flex-col">
      <ProtocolRow
        label="Typ urządzenia"
        value={valveBasicInfo.type}
        mode="web"
      />
      <ProtocolRow
        label="Nr seryjny"
        value={valveBasicInfo.serialNumber}
        mode="web"
      />
    </div>
  );
}
