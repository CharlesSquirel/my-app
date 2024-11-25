import { ProtocolModeType } from '@/lib/types/common';
import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { pdfStyles } from '../PDF/styles/PDFStyles';

interface InfoContainerProps {
  children: React.ReactNode;
  title: string;
  mode: ProtocolModeType;
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 12,
    fontWeight: 300,
    padding: 7,
    position: 'relative',
    width: '50%',
  },
  title: {
    fontWeight: 500,
    textTransform: 'uppercase',
    fontSize: 12,
  },
  subtitle: {
    color: '#5E6470',
    fontSize: 10,
  },
});

export default function InfoContainer({
  children,
  title,
  mode,
}: InfoContainerProps) {
  if (mode === 'web') {
    return (
      <div className="relative flex w-[420px] flex-col rounded-sm bg-[#ededed] p-[10px] pl-[10px] font-roboto">
        <div className="absolute left-0 top-0 h-full w-[2px] rounded-lg bg-customBlue"></div>
        <p className="text-lg font-[500] uppercase">{title}</p>
        <div className="flex justify-between">
          <p className="font-[500] uppercase text-[#5E6470]">Nazwa</p>
          <p className="font-[500] uppercase text-[#5E6470]">Wartość</p>
        </div>
        {children}
      </div>
    );
  } else {
    return (
      <View style={styles.wrapper}>
        <View style={pdfStyles.containerDecoration}></View>
        <Text style={styles.title}>{title}</Text>
        <View style={pdfStyles.flexRow}>
          <Text style={[styles.title, styles.subtitle]}>Nazwa</Text>
          <Text style={[styles.title, styles.subtitle]}>Wartość</Text>
        </View>
        {children}
      </View>
    );
  }
}
