import { ProtocolModeType } from '@/lib/types/common';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  section: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 12,
    color: '#1A1C21',
    justifyContent: 'space-between',
  },
});

interface ProtocolRowProps {
  label: string;
  value: string;
  mode: ProtocolModeType;
}

export default function ProtocolRow({ label, value, mode }: ProtocolRowProps) {
  if (mode === 'web') {
    return (
      <div className="flex justify-between font-roboto text-[#1A1C21]">
        <p>{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    );
  } else {
    return (
      <View style={styles.section}>
        <Text>{label}</Text>
        <Text style={{ fontWeight: 500 }}>{value}</Text>
      </View>
    );
  }
}
