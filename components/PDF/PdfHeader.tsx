import { Image, StyleSheet, View } from '@react-pdf/renderer';
import ProtocolTitle from '../Protocols/ProtocolTitle';

interface PdfHeaderProps {
  subtitle: string;
}

const styles = StyleSheet.create({
  section: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 150,
  },
});

export default function PdfHeader({ subtitle }: PdfHeaderProps) {
  return (
    <View style={styles.section}>
      <ProtocolTitle subTitle={subtitle} mode="pdf" />
      <Image style={styles.image} src="app/assets/logo.png" />
    </View>
  );
}
