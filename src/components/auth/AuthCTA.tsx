import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/theme';
import Button from '@/components/ui/Button';

interface AuthCTAProps {
  buttonLabel: string;
  onButtonPress: () => void;
  buttonDisabled?: boolean;
  buttonRightIcon?: React.ReactNode;
  footerText: string;
  footerLinkText: string;
  onFooterLinkPress: () => void;
}

export default function AuthCTA({
  buttonLabel,
  onButtonPress,
  buttonDisabled = false,
  buttonRightIcon,
  footerText,
  footerLinkText,
  onFooterLinkPress,
}: AuthCTAProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[s.container, { paddingBottom: Math.max(insets.bottom, 16) }]}>
      <Button
        variant="gradient"
        size="lg"
        onPress={onButtonPress}
        disabled={buttonDisabled}
        rightIcon={buttonRightIcon}
      >
        {buttonLabel}
      </Button>

      <View style={s.footer}>
        <Text style={typography.caption}>{footerText} </Text>
        <TouchableOpacity onPress={onFooterLinkPress} activeOpacity={0.75}>
          <Text style={s.link}>{footerLinkText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 16,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.gradientTo,
    borderBottomWidth: 1,
    borderBottomColor: colors.gradientTo,
  },
});
