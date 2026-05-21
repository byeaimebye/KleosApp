import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '@/constants/colors';
import { radius, typography } from '@/constants/theme';

interface RoleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  comingSoonLabel?: string;
  onPress: () => void;
}

export default function RoleCard({
  title,
  description,
  icon,
  selected = false,
  disabled = false,
  comingSoonLabel,
  onPress,
}: RoleCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[s.card, selected && s.cardSelected, disabled && s.cardDisabled]}
    >
      <View style={[s.iconContainer, selected && s.iconContainerSelected]}>
        {icon}
      </View>

      <Text style={[typography.body, s.title, selected && s.titleSelected]}>
        {title}
      </Text>
      <Text style={[typography.caption, s.description]}>{description}</Text>

      {selected && (
        <View style={s.checkCircle}>
          <Text style={s.checkMark}>✓</Text>
        </View>
      )}

      {disabled && comingSoonLabel && (
        <View style={s.badge}>
          <Text style={s.badgeText}>{comingSoonLabel}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: radius.xl,
    borderWidth: 2,
    borderColor: colors.inputBorder,
    backgroundColor: colors.inputBg,
    gap: 8,
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(196,255,14,0.08)',
  },
  cardDisabled: {
    opacity: 0.4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.inputBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerSelected: {
    backgroundColor: 'rgba(196,255,14,0.15)',
  },
  title: {
    fontWeight: '700',
    color: colors.muted,
    textAlign: 'center',
  },
  titleSelected: {
    color: colors.primary,
  },
  description: {
    textAlign: 'center',
    lineHeight: 16,
  },
  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  checkMark: {
    color: '#000',
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 13,
  },
  badge: {
    position: 'absolute',
    top: -10,
    right: -6,
    backgroundColor: colors.muted,
    borderRadius: radius.full,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.background,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
