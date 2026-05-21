import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';
import { radius, typography } from '@/constants/theme';

interface SocialButtonProps {
  label: string;
  icon?: React.ReactNode;
  onPress?: () => void;
}

export default function SocialButton({ label, icon, onPress }: SocialButtonProps) {
  return (
    <TouchableOpacity style={s.btn} onPress={onPress} activeOpacity={0.75}>
      {icon}
      <Text style={[typography.body, s.label]}>{label}</Text>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.inputBg,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: radius.lg,
    paddingVertical: 14,
    gap: 10,
  },
  label: {
    fontWeight: '600',
  },
});
