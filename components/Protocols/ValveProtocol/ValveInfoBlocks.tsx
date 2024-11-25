import { pdfStyles } from '@/components/PDF/styles/PDFStyles';
import { ProtocolModeType } from '@/lib/types/common';
import { ValvesInfoBlock } from '@prisma/client';
import { Text, View } from '@react-pdf/renderer';
import ProtocolRow from '../ProtocolRow';

interface ValveInfoBlocksProps {
  infoBlock: ValvesInfoBlock;
  index: number;
  mode: ProtocolModeType;
}

function ProtocolRows({
  infoBlock,
  mode,
}: Omit<ValveInfoBlocksProps, 'index'>) {
  return (
    <>
      <ProtocolRow
        label="Miejsce instalowania zaworu"
        value={infoBlock.valveLocation}
        mode={mode}
      />
      <ProtocolRow label="Typ zaworu" value={infoBlock.valveType} mode={mode} />
      <ProtocolRow
        label="Nr fabryczny"
        value={infoBlock.valveSerialNumber}
        mode={mode}
      />
      <ProtocolRow
        label="Ciśnienie nastawy"
        value={`${infoBlock.pressureSetting} bar`}
        mode={mode}
      />
      <ProtocolRow
        label="Ciśnienie otwarcia"
        value={`${infoBlock.pressureOpen} bar`}
        mode={mode}
      />
      <ProtocolRow
        label="Ciśnienie zamknięcia"
        value={`${infoBlock.pressureClose} bar`}
        mode={mode}
      />
    </>
  );
}

export default function ValveInfoBlocks({
  infoBlock,
  index,
  mode,
}: ValveInfoBlocksProps) {
  if (mode === 'web') {
    return (
      <div className="flex flex-col">
        <p className="font-medium">{`Zawór ${index + 1}`}</p>
        <div className="mb-3">
          <ProtocolRows infoBlock={infoBlock} mode="web" />
        </div>
      </div>
    );
  } else {
    return (
      <View style={pdfStyles.flexColumn}>
        <Text style={pdfStyles.textBold}>{`Zawór ${index + 1}`}</Text>
        <View style={{ marginBottom: 7 }}>
          <ProtocolRows infoBlock={infoBlock} mode="pdf" />
        </View>
      </View>
    );
  }
}
