import PdfHeader from '@/components/PDF/PdfHeader';
import { pdfStyles } from '@/components/PDF/styles/PDFStyles';
import InfoContainer from '@/components/Protocols/InfoContainer';
import ProtocolFirmaInfo from '@/components/Protocols/ProtocolFirmaInfo';
import ProtocolRow from '@/components/Protocols/ProtocolRow';
import ProtocolSign from '@/components/Protocols/ProtocolSign';
import ProtocolUserInfo from '@/components/Protocols/ProtocolUserInfo';
import ValveInfoBlocks from '@/components/Protocols/ValveProtocol/ValveInfoBlocks';
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

interface ValvePDFPropsWithSignature extends ValvePDFProps {
  signature?: string;
}

const ValvePDF = ({ valve, signature }: ValvePDFPropsWithSignature) => (
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
      <InfoContainer title="Zawory" mode="pdf">
        {valve.infoBlocks.map((infoBlock, index) => (
          <ValveInfoBlocks
            infoBlock={infoBlock}
            key={infoBlock.id}
            index={index}
            mode="pdf"
          />
        ))}
      </InfoContainer>
      <ProtocolSign
        author={`${valve.firstName} ${valve.lastName}`}
        signature={signature}
      />
    </Page>
  </Document>
);

export default ValvePDF;
