import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';
import { radius } from '@/constants/theme';

interface SportChipProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
}

export default function SportChip({ label, selected, onToggle }: SportChipProps) {
  return (
    <TouchableOpacity
      onPress={onToggle}
      activeOpacity={0.75}
      style={[s.chip, selected ? s.chipSelected : s.chipDefault]}
    >
      <Text style={[s.label, selected ? s.labelSelected : s.labelDefault]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: radius.full,
    borderWidth: 1,
  },
  chipDefault: {
    backgroundColor: colors.inputBg,
    borderColor: colors.inputBorder,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
  labelDefault: {
    color: colors.muted,
  },
  labelSelected: {
    color: '#000',
  },
});
