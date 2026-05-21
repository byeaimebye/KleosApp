import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/theme';

interface DividerProps {
  label?: string;
}

export default function Divider({ label }: DividerProps) {
  return (
    <View style={s.row}>
      <View style={s.line} />
      {label && (
        <Text style={[typography.caption, s.label]}>{label}</Text>
      )}
      <View style={s.line} />
    </View>
  );
}

const s = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  label: {
    marginHorizontal: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
