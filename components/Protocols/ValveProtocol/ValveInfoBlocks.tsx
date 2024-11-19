import { ValvesInfoBlock } from '@prisma/client';
import ProtocolRow from '../ProtocolRow';

interface ValveInfoBlocksProps {
  infoBlock: ValvesInfoBlock;
  index: number;
}

export default function ValveInfoBlocks({
  infoBlock,
  index,
}: ValveInfoBlocksProps) {
  return (
    <div className="flex flex-col">
      <p>{`Zawór ${index + 1}`}</p>
      <ProtocolRow
        label="Miejsce instalowania zaworu"
        value={infoBlock.valveLocation}
      />
      <ProtocolRow label="Typ zaworu" value={infoBlock.valveType} />
      <ProtocolRow label="Nr fabryczny" value={infoBlock.valveSerialNumber} />
      <ProtocolRow
        label="Ciśnienie nastawy"
        value={`${infoBlock.pressureSetting} bar`}
      />
      <ProtocolRow
        label="Ciśnienie otwarcia"
        value={`${infoBlock.pressureOpen} bar`}
      />
      <ProtocolRow
        label="Ciśnienie zamknięcia"
        value={`${infoBlock.pressureClose} bar`}
      />
    </div>
  );
}
