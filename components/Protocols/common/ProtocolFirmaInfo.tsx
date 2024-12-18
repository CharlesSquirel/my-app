import { ProtocolModeType } from '@/lib/types/common';
import { Firma, Location } from '@prisma/client';
import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { pdfStyles } from '../../PDF/styles/PDFStyles';

interface ProtocolFirmaInfoProps {
  data: Firma | Location;
  mode: ProtocolModeType;
}

const styles = StyleSheet.create({
  section: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 12,
    fontWeight: 300,
  },
});

export default function ProtocolFirmaInfo({
  data,
  mode,
}: ProtocolFirmaInfoProps) {
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
  if (mode === 'web') {
    return (
      <div className="flex flex-col">
        <p className="font-medium">{fullName}</p>
        <p>{`${street} ${houseNumber}/${localNumber}`}</p>
        <p>{`${postCode}, ${city}`}</p>
        {tel && <p>{tel}</p>}
        {contactEmail && <p>{contactEmail}</p>}
      </div>
    );
  } else {
    return (
      <View style={styles.section}>
        <Text style={pdfStyles.textBold}>{fullName}</Text>
        <Text>{`${street} ${houseNumber}/${localNumber}`}</Text>
        <Text>{`${postCode} ${city}`}</Text>
        {tel && <Text>{tel}</Text>}
        {contactEmail && <Text>{contactEmail}</Text>}
      </View>
    );
  }
}
