import { Image, StyleSheet, Text, View } from '@react-pdf/renderer';
import { pdfStyles } from '../../PDF/styles/PDFStyles';

const styles = StyleSheet.create({
  section: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'flex-end',
    width: '25%',
    gap: 5,
  },
  authorSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signLine: {
    width: '100%',
    height: 1,
    borderTop: '1px dotted black',
  },
});

interface ProtocolSignProps {
  author: string;
  signature?: string;
}

export default function ProtocolSign({ author, signature }: ProtocolSignProps) {
  return (
    <View style={styles.section}>
      {signature && (
        <Image src={signature} style={{ width: 100, height: 50 }} />
      )}
      <View style={styles.signLine}></View>
      <View style={styles.authorSection}>
        <Text style={pdfStyles.textSmall}>{author}</Text>
        <Text style={pdfStyles.textSmall}>Serwisant</Text>
      </View>
    </View>
  );
}
