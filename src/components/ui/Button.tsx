import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';
import { radius, shadows } from '@/constants/theme';

type Variant = 'primary' | 'secondary' | 'gradient';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const paddingV: Record<Size, number> = { sm: 8, md: 12, lg: 16 };
const paddingH: Record<Size, number> = { sm: 12, md: 16, lg: 24 };
const fontSize: Record<Size, number> = { sm: 12, md: 14, lg: 17 };

export default function Button({
  onPress,
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  leftIcon,
  rightIcon,
}: ButtonProps) {
  const pV = paddingV[size];
  const pH = paddingH[size];
  const fS = fontSize[size];

  if (variant === 'gradient') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.85}
        style={[s.gradientOuter, disabled && s.disabled]}
      >
        <LinearGradient
          colors={[colors.gradientFrom, colors.gradientTo]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[s.gradientInner, { paddingVertical: pV, paddingHorizontal: pH }]}
        >
          {leftIcon}
          <Text style={[s.gradientText, { fontSize: fS }]}>{children}</Text>
          {rightIcon}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.8}>
      <View
        style={[
          s.base,
          { paddingVertical: pV, paddingHorizontal: pH },
          isPrimary ? s.primary : s.secondary,
          disabled && s.disabled,
        ]}
      >
        {leftIcon}
        <Text style={[s.text, { fontSize: fS }, isPrimary ? s.textPrimary : s.textSecondary]}>
          {children}
        </Text>
        {rightIcon}
      </View>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: radius.full,
  },
  primary: {
    backgroundColor: colors.zone2,
  },
  secondary: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  text: {
    fontWeight: '700',
  },
  textPrimary: {
    color: '#000',
  },
  textSecondary: {
    color: colors.foreground,
  },
  disabled: {
    opacity: 0.5,
  },
  gradientOuter: {
    borderRadius: radius.full,
    overflow: 'hidden',
    ...shadows.glowGreen,
  },
  gradientInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  gradientText: {
    fontWeight: '700',
    color: '#000',
  },
});
