import { ProtocolModeType } from '@/lib/types/common';
import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { pdfStyles } from '../PDF/styles/PDFStyles';

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
  },
});

interface ProtocolTitleProps {
  subTitle: string;
  mode: ProtocolModeType;
}

export default function ProtocolTitle({ subTitle, mode }: ProtocolTitleProps) {
  if (mode === 'web') {
    return (
      <div className="flex flex-col gap-1 font-roboto text-[32px] leading-[1]">
        <h2 className="">Protokół</h2>
        <p className="font-light">{subTitle}</p>
      </div>
    );
  } else {
    return (
      <View style={{ display: 'flex', flexDirection: 'column' }}>
        <Text style={styles.title}>Protokół</Text>
        <Text style={pdfStyles.textThight}>{subTitle}</Text>
      </View>
    );
  }
}
