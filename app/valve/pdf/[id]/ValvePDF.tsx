import { ValveDisplay } from '@/lib/types/valveTypes';

import {
  Document,
  Font,
  Image,
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
    // fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  subTitle: {
    // fontFamily: 'Roboto'
    fontWeight: 300,
    fontStyle: 'normal',
  },
  page: {
    display: 'flex',
    flexDirection: 'column',
    // backgroundColor: '#fff',
    padding: 20,
    fontFamily: 'Inter',
  },
  section: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // padding: 20,
    // flexGrow: 1,
  },
});

const ValvePDF = ({ valve }: ValvePDFProps) => (
  <Document
    title={`Protokół badania zaworów bezpieczeństwa ${valve.createdAt}`}
    author={`${valve.firstName} ${valve.lastName}`}
    language="pl"
  >
    <Page style={styles.page}>
      <View style={styles.section}>
        <View style={{ display: 'flex', flexDirection: 'column' }}>
          <Text style={styles.title}>Protokół</Text>
          <Text style={{ fontWeight: 300 }}>
            badania zaworów bezpieczeństwa
          </Text>
        </View>
        <Image style={{ width: 150 }} src="app/assets/logo.png" />
      </View>
      <View style={styles.section}>
        <Text>II View</Text>
      </View>
    </Page>
  </Document>
);

export default ValvePDF;
