import { StyleSheet, View, type ViewStyle } from 'react-native';
import { colors } from '@/constants/colors';
import { radius, shadows } from '@/constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function Card({ children, style }: CardProps) {
  return <View style={[s.card, style]}>{children}</View>;
}

const s = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    padding: 28,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    ...shadows.card,
  },
});
