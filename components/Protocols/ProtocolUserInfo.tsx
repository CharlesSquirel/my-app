import { ProtocolModeType } from '@/lib/types/common';
import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { pdfStyles } from '../PDF/styles/PDFStyles';

const styles = StyleSheet.create({
  section: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 12,
    fontWeight: 300,
  },
});

export type User = {
  firstName: string;
  lastName: string;
  userSignature: string;
};

interface ProtocolUserInfoProps {
  user: User;
  mode: ProtocolModeType;
}

export default function ProtocolUserInfo({
  user,
  mode,
}: ProtocolUserInfoProps) {
  if (mode === 'web') {
    return (
      <div className="flex flex-col">
        <p className="font-medium">Serwisant</p>
        <p>{`${user.firstName} ${user.lastName}`}</p>
        <p>{user.userSignature}</p>
      </div>
    );
  } else {
    return (
      <View style={styles.section}>
        <Text style={pdfStyles.textBold}>Serwisant</Text>
        <Text>{`${user.firstName} ${user.lastName}`}</Text>
        <Text>{user.userSignature}</Text>
      </View>
    );
  }
}
