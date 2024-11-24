import PdfFirmaInfo from '@/components/PDF/PdfFirmaInfo';
import PdfHeader from '@/components/PDF/PdfHeader';
import { ValveDisplay } from '@/lib/types/valveTypes';

import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';

interface ValvePDFProps {
  valve: ValveDisplay;
}

Font.register({
  family: 'Inter',
  fonts: [
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf',
      fontWeight: 100,
    },
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyfMZhrib2Bg-4.ttf',
      fontWeight: 200,
    },
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuOKfMZhrib2Bg-4.ttf',
      fontWeight: 300,
    },
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf',
      fontWeight: 400,
    },
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf',
      fontWeight: 500,
    },
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf',
      fontWeight: 600,
    },
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf',
      fontWeight: 700,
    },
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyYMZhrib2Bg-4.ttf',
      fontWeight: 800,
    },
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuBWYMZhrib2Bg-4.ttf',
      fontWeight: 900,
    },
  ],
});

// Font.register({
//   family: 'Roboto',
//   // src: 'http://fonts.gstatic.com/s/roboto/v15/W5F8_SL0XFawnjxHGsZjJA.ttf'
//   fonts: [
//     {
//       src: 'http://fonts.gstatic.com/s/roboto/v15/W5F8_SL0XFawnjxHGsZjJA.ttf',
//       fontWeight: 'normal',
//     },
//     {
//       src: 'http://fonts.gstatic.com/s/roboto/v15/dtpHsbgPEm2lVWciJZ0P-A.ttf',
//       fontWeight: 300,
//     },
//   ],
//   // fontStyle: 'normal',
//   // fontWeight: 'normal',
// });

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
  },
  subTitle: {
    fontWeight: 300,
  },
  page: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    padding: 23,
    fontFamily: 'Inter',
  },
  section: {
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
        <PdfFirmaInfo data={valve.firma} />
        <PdfFirmaInfo data={valve.location} />
        <Text>{valve.createdAt}</Text>
      </View>
    </Page>
  </Document>
);

export default ValvePDF;
