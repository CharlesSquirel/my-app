import { Firma, Location } from '@prisma/client';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

interface PdfFirmaInfoProps {
  data: Firma | Location;
}

const styles = StyleSheet.create({
  section: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 12,
    fontWeight: 300,
  },
  title: {
    fontWeight: 500,
  },
});

export default function PdfFirmaInfo({ data }: PdfFirmaInfoProps) {
  const {
    fullName,
    street,
    houseNumber,
    localNumber,
    postCode,
    city,
    tel,
    contactEmail,
  } = data;
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{fullName}</Text>
      <Text>{`${street} ${houseNumber}/${localNumber}`}</Text>
      <Text>{`${postCode} ${city}`}</Text>
      {tel && <Text>{tel}</Text>}
      {contactEmail && <Text>{contactEmail}</Text>}
    </View>
  );
}
