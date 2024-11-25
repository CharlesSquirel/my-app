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
        mode="web"
      />
      <ProtocolRow label="Typ zaworu" value={infoBlock.valveType} mode="web" />
      <ProtocolRow
        label="Nr fabryczny"
        value={infoBlock.valveSerialNumber}
        mode="web"
      />
      <ProtocolRow
        label="Ciśnienie nastawy"
        value={`${infoBlock.pressureSetting} bar`}
        mode="web"
      />
      <ProtocolRow
        label="Ciśnienie otwarcia"
        value={`${infoBlock.pressureOpen} bar`}
        mode="web"
      />
      <ProtocolRow
        label="Ciśnienie zamknięcia"
        value={`${infoBlock.pressureClose} bar`}
        mode="web"
      />
    </div>
  );
}
