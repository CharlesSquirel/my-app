import { Image, StyleSheet, Text, View } from '@react-pdf/renderer';

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
  title: {
    fontSize: 24,
  },
  subtitle: {
    fontWeight: 300,
  },
  image: {
    width: 150,
  },
});

export default function PdfHeader({ subtitle }: PdfHeaderProps) {
  return (
    <View style={styles.section}>
      <View style={{ display: 'flex', flexDirection: 'column' }}>
        <Text style={styles.title}>Protokół</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <Image style={styles.image} src="app/assets/logo.png" />
    </View>
  );
}
