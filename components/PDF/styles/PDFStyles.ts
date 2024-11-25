import { StyleSheet } from '@react-pdf/renderer';

export const pdfStyles = StyleSheet.create({
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerDecoration: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: 2,
    borderRadius: 4,
    backgroundColor: '#008dd2',
  },
  textBold: {
    fontWeight: 500,
  },
  textThight: {
    fontWeight: 300,
  },
  textSmall: {
    fontSize: 12,
  },
});
