import PdfHeader from '@/components/PDF/PdfHeader';
import { pdfStyles } from '@/components/PDF/styles/PDFStyles';
import InfoContainer from '@/components/Protocols/InfoContainer';
import ProtocolFirmaInfo from '@/components/Protocols/ProtocolFirmaInfo';
import ProtocolRow from '@/components/Protocols/ProtocolRow';
import ProtocolUserInfo from '@/components/Protocols/ProtocolUserInfo';
import { pdfFonts } from '@/lib/fonts/fonts';
import { ValvePDFProps } from '@/lib/types/common';

import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';

Font.register({
  family: 'Inter',
  fonts: pdfFonts,
});

const styles = StyleSheet.create({
  section: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  page: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    padding: 23,
    fontFamily: 'Inter',
  },
  basicInfoSection: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
  },
});

const ValvePDF = ({ valve }: ValvePDFProps) => (
  <Document
    title={`Protokół badania zaworów bezpieczeństwa ${valve.createdAt}`}
    author={`${valve.firstName} ${valve.lastName}`}
    language="pl"
  >
    <Page style={styles.page}>
      <PdfHeader subtitle="badania zaworów bezpieczeństwa" />
      <View style={styles.section}>
        <View style={styles.basicInfoSection}>
          <ProtocolFirmaInfo data={valve.firma} mode="pdf" />
          <ProtocolFirmaInfo data={valve.location} mode="pdf" />
          <ProtocolUserInfo
            user={{
              firstName: valve.firstName,
              lastName: valve.lastName,
              userSignature: valve.userSignature,
            }}
            mode="pdf"
          />
        </View>
        <Text style={pdfStyles.textSmall}>{valve.createdAt}</Text>
      </View>
      <InfoContainer mode="pdf" title="Dane podstawowe">
        <ProtocolRow mode="pdf" label="Typ urządzenia" value={valve.type} />
        <ProtocolRow mode="pdf" label="Nr seryjny" value={valve.serialNumber} />
      </InfoContainer>
    </Page>
  </Document>
);

export default ValvePDF;
