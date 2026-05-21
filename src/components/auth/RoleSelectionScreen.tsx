import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useRegisterFlow } from '@/context/RegisterFlowContext';
import { colors } from '@/constants/colors';
import { radius, typography } from '@/constants/theme';
import RoleCard from '@/components/auth/RoleCard';

const CoachIcon = () => (
  <Text style={{ fontSize: 22 }}>🏆</Text>
);

const AthleteIcon = () => (
  <Text style={{ fontSize: 22 }}>⚡</Text>
);

export default function RoleSelectionScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { setRole } = useRegisterFlow();

  const handleSelectCoach = () => {
    setRole('coach');
    router.push('/(auth)/register/coach/step1');
  };

  return (
    <View style={s.root}>
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={s.backButton}
          activeOpacity={0.7}
        >
          <Text style={s.backIcon}>←</Text>
        </TouchableOpacity>
      </View>

      {/* Titles */}
      <View style={s.titleSection}>
        <Text style={[typography.heading, s.title]}>
          {t('auth.register.role_selection.title')}
        </Text>
        <Text style={[typography.subheading, s.subtitle]}>
          {t('auth.register.role_selection.subtitle')}
        </Text>
      </View>

      {/* Role cards */}
      <View style={s.cardsRow}>
        <RoleCard
          title={t('auth.register.role_selection.coach')}
          description={t('auth.register.role_selection.coach_desc')}
          icon={<CoachIcon />}
          onPress={handleSelectCoach}
        />
        <RoleCard
          title={t('auth.register.role_selection.athlete')}
          description={t('auth.register.role_selection.athlete_desc')}
          icon={<AthleteIcon />}
          disabled
          comingSoonLabel={t('auth.register.role_selection.coming_soon')}
          onPress={() => {}}
        />
      </View>

      {/* Footer */}
      <View style={s.footer}>
        <Text style={typography.caption}>
          {t('auth.register.role_selection.already_account')}{' '}
        </Text>
        <TouchableOpacity
          onPress={() => router.replace('/(auth)')}
          activeOpacity={0.7}
        >
          <Text style={s.loginLink}>
            {t('auth.register.role_selection.login')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: colors.inputBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 18,
    color: colors.foreground,
  },
  titleSection: {
    marginBottom: 36,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    lineHeight: 20,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 12,
    flex: 1,
    maxHeight: 220,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: 24,
  },
  loginLink: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.gradientTo,
    borderBottomWidth: 1,
    borderBottomColor: colors.gradientTo,
  },
});
