import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { pdfStyles } from '../PDF/styles/PDFStyles';

const styles = StyleSheet.create({
  section: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'flex-end',
    width: '25%',
    gap: 10,
  },
  signLine: {
    width: '100%',
    height: 1,
    borderTop: '1px dotted black',
  },
});

interface ProtocolSignProps {
  author: string;
}

export default function ProtocolSign({ author }: ProtocolSignProps) {
  return (
    <View style={styles.section}>
      <View style={styles.signLine}></View>
      <Text style={pdfStyles.textSmall}>{author}</Text>
    </View>
  );
}
