import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { useRegisterFlow } from '@/context/RegisterFlowContext';
import { registerStep2Schema, type RegisterStep2Input } from '@/schemas/authSchemas';
import { SPORTS_LIST } from '@/data/mock/sports';
import { colors } from '@/constants/colors';
import { radius, typography } from '@/constants/theme';
import AvatarUpload from '@/components/ui/AvatarUpload';
import AuthCTA from '@/components/auth/AuthCTA';
import Input from '@/components/ui/Input';
import SportChip from '@/components/ui/SportChip';

const TOTAL_COACH_STEPS = 5;
const CURRENT_STEP = 2;

export default function RegisterStep2Screen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { setStep2Data } = useRegisterFlow();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterStep2Input>({
    resolver: zodResolver(registerStep2Schema),
    defaultValues: {
      avatarUri: undefined,
      logoUri: undefined,
      businessName: '',
      phrase: '',
      yearsOfExperience: '',
      city: '',
      sports: [],
      socialLinks: { instagram: '', strava: '' },
    },
  });

  const onSubmit = (data: RegisterStep2Input) => {
    setStep2Data(data);
    router.push('/(auth)/register/coach/step3');
  };

  return (
    <View style={s.root}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={s.flex}
      >
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={s.backButton}
          activeOpacity={0.7}
        >
          <Text style={s.backIcon}>←</Text>
        </TouchableOpacity>

        <View style={s.progressContainer}>
          <View style={s.progressTrack}>
            {Array.from({ length: TOTAL_COACH_STEPS }).map((_, i) => (
              <View
                key={i}
                style={[
                  s.progressSegment,
                  i < CURRENT_STEP ? s.progressDone : s.progressPending,
                  i === CURRENT_STEP - 1 && s.progressCurrent,
                ]}
              />
            ))}
          </View>
          <Text style={s.stepLabel}>{t('auth.register.step2.step_label')}</Text>
        </View>
      </View>

      {/* Title */}
      <View style={s.titleSection}>
        <Text style={[typography.heading, s.title]}>
          {t('auth.register.step2.title')}
        </Text>
        <Text style={typography.subheading}>
          {t('auth.register.step2.subtitle')}
        </Text>
      </View>

      {/* Scrollable form */}
      <ScrollView
        style={s.scrollView}
        contentContainerStyle={s.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Campos directamente sobre el fondo — sin Card */}

          {/* Avatars */}
          <View style={s.avatarsRow}>
            <Controller
              control={control}
              name="avatarUri"
              render={({ field: { value, onChange } }) => (
                <AvatarUpload
                  uri={value ?? null}
                  onSelect={onChange}
                  label={t('auth.register.step2.avatar_label')}
                  size="lg"
                />
              )}
            />
            <Controller
              control={control}
              name="logoUri"
              render={({ field: { value, onChange } }) => (
                <AvatarUpload
                  uri={value ?? null}
                  onSelect={onChange}
                  label={t('auth.register.step2.logo_label')}
                  size="lg"
                />
              )}
            />
          </View>

          {/* Business name */}
          <View style={s.field}>
            <Controller
              control={control}
              name="businessName"
              render={({ field: { onChange, value } }) => (
                <Input
                  label={t('auth.register.step2.business_name')}
                  placeholder={t('auth.register.step2.business_name_placeholder')}
                  value={value}
                  onChangeText={onChange}
                  required
                  error={errors.businessName?.message}
                />
              )}
            />
          </View>

          {/* Phrase */}
          <View style={s.field}>
            <Controller
              control={control}
              name="phrase"
              render={({ field: { onChange, value } }) => (
                <Input
                  label={t('auth.register.step2.phrase')}
                  placeholder={t('auth.register.step2.phrase_placeholder')}
                  value={value ?? ''}
                  onChangeText={onChange}
                />
              )}
            />
          </View>

          {/* Years + City en fila */}
          <View style={s.row}>
            <View style={s.halfField}>
              <Controller
                control={control}
                name="yearsOfExperience"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label={t('auth.register.step2.years_exp')}
                    placeholder={t('auth.register.step2.years_exp_placeholder')}
                    value={value ?? ''}
                    onChangeText={onChange}
                    keyboardType="number-pad"
                  />
                )}
              />
            </View>
            <View style={s.halfField}>
              <Controller
                control={control}
                name="city"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label={t('auth.register.step2.city')}
                    placeholder={t('auth.register.step2.city_placeholder')}
                    value={value}
                    onChangeText={onChange}
                    required
                    error={errors.city?.message}
                  />
                )}
              />
            </View>
          </View>

          {/* Deportes */}
          <View style={s.field}>
            <View style={s.labelRow}>
              <Text style={[typography.label, s.sectionLabel]}>
                {t('auth.register.step2.sports_label')}
              </Text>
              <Text style={s.asterisk}> *</Text>
            </View>
            <Controller
              control={control}
              name="sports"
              render={({ field: { value, onChange } }) => (
                <>
                  <View style={s.chipsWrap}>
                    {SPORTS_LIST.map((sport) => (
                      <SportChip
                        key={sport}
                        label={sport}
                        selected={value.includes(sport)}
                        onToggle={() => {
                          if (value.includes(sport)) {
                            onChange(value.filter((s) => s !== sport));
                          } else {
                            onChange([...value, sport]);
                          }
                        }}
                      />
                    ))}
                  </View>
                  {errors.sports && (
                    <Text style={s.chipError}>{errors.sports.message}</Text>
                  )}
                </>
              )}
            />
          </View>

          {/* Redes sociales */}
          <View style={s.field}>
            <Text style={[typography.label, s.sectionLabel]}>
              {t('auth.register.step2.social_label')}
            </Text>
            <View style={s.socialInputs}>
              <Controller
                control={control}
                name="socialLinks.instagram"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder={t('auth.register.step2.instagram_placeholder')}
                    value={value ?? ''}
                    onChangeText={onChange}
                    autoCapitalize="none"
                    leftElement={<Text style={s.socialIcon}>📸</Text>}
                  />
                )}
              />
              <Controller
                control={control}
                name="socialLinks.strava"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder={t('auth.register.step2.strava_placeholder')}
                    value={value ?? ''}
                    onChangeText={onChange}
                    autoCapitalize="none"
                    leftElement={<Text style={s.socialIcon}>🏃</Text>}
                  />
                )}
              />
            </View>
          </View>
      </ScrollView>

      </KeyboardAvoidingView>

      {/* CTA fuera del KeyboardAvoidingView — no sube con el teclado */}
      <AuthCTA
        buttonLabel={t('auth.register.step2.next')}
        onButtonPress={handleSubmit(onSubmit)}
        buttonRightIcon={<Text style={s.arrowIcon}>→</Text>}
        footerText={t('auth.register.step2.already_account')}
        footerLinkText={t('auth.register.step2.login')}
        onFooterLinkPress={() => router.replace('/(auth)')}
      />
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 56,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 24,
    marginBottom: 24,
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
  progressContainer: {
    flex: 1,
    gap: 4,
  },
  progressTrack: {
    flexDirection: 'row',
    gap: 4,
  },
  progressSegment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  progressDone: {
    backgroundColor: colors.primary,
  },
  progressCurrent: {
    flex: 2,
    backgroundColor: colors.primary,
  },
  progressPending: {
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  stepLabel: {
    fontSize: 10,
    color: colors.muted,
    fontWeight: '500',
  },
  titleSection: {
    paddingHorizontal: 24,
    marginBottom: 16,
    gap: 4,
  },
  title: {
    marginBottom: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  avatarsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  field: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  halfField: {
    flex: 1,
  },
  sectionLabel: {
    marginBottom: 10,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  asterisk: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.danger,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chipError: {
    fontSize: 12,
    color: colors.danger,
    marginTop: 6,
  },
  socialInputs: {
    gap: 10,
  },
  socialIcon: {
    fontSize: 16,
    opacity: 0.6,
  },
  arrowIcon: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
  },
});
