import { useState } from 'react';
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
import { registerStep1Schema, type RegisterStep1Input } from '@/schemas/authSchemas';
import { colors } from '@/constants/colors';
import { radius, typography } from '@/constants/theme';
import AuthCTA from '@/components/auth/AuthCTA';
import Input from '@/components/ui/Input';

const TOTAL_COACH_STEPS = 5;

function formatBirthDate(text: string): string {
  const digits = text.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

const LockIcon = () => (
  <Text style={{ fontSize: 15, opacity: 0.5, color: colors.foreground }}>🔒</Text>
);
const EyeIcon = ({ visible }: { visible: boolean }) => (
  <Text style={{ fontSize: 15, opacity: 0.5, color: colors.foreground }}>
    {visible ? '🙈' : '👁'}
  </Text>
);

export default function RegisterStep1Screen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { setStep1Data } = useRegisterFlow();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterStep1Input>({
    resolver: zodResolver(registerStep1Schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      birthDate: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: RegisterStep1Input) => {
    setStep1Data(data);
    router.push('/(auth)/register/coach/step2');
  };

  return (
    <View style={s.root}>
      {/* KeyboardAvoidingView solo envuelve el contenido scrolleable */}
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
                    i === 0 ? s.progressActive : s.progressPending,
                    i === 0 && s.progressCurrent,
                  ]}
                />
              ))}
            </View>
            <Text style={s.stepLabel}>{t('auth.register.step1.step_label')}</Text>
          </View>
        </View>

        {/* Title */}
        <View style={s.titleSection}>
          <Text style={[typography.heading, s.title]}>
            {t('auth.register.step1.title')}
          </Text>
          <Text style={typography.subheading}>
            {t('auth.register.step1.subtitle')}
          </Text>
        </View>

        <ScrollView
          style={s.scrollView}
          contentContainerStyle={s.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Nombre + Apellido */}
          <View style={s.row}>
            <View style={s.halfField}>
              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label={t('auth.register.step1.first_name')}
                    placeholder={t('auth.register.step1.first_name_placeholder')}
                    value={value}
                    onChangeText={onChange}
                    required
                    error={errors.firstName?.message}
                  />
                )}
              />
            </View>
            <View style={s.halfField}>
              <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label={t('auth.register.step1.last_name')}
                    placeholder={t('auth.register.step1.last_name_placeholder')}
                    value={value}
                    onChangeText={onChange}
                    required
                    error={errors.lastName?.message}
                  />
                )}
              />
            </View>
          </View>

          {/* Fecha de nacimiento */}
          <View style={s.field}>
            <Controller
              control={control}
              name="birthDate"
              render={({ field: { onChange, value } }) => (
                <Input
                  label={t('auth.register.step1.birth_date')}
                  placeholder={t('auth.register.step1.birth_date_placeholder')}
                  value={value}
                  onChangeText={(text) => onChange(formatBirthDate(text))}
                  keyboardType="number-pad"
                  required
                  error={errors.birthDate?.message}
                />
              )}
            />
          </View>

          {/* Email */}
          <View style={s.field}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  label={t('auth.register.step1.email')}
                  placeholder={t('auth.register.step1.email_placeholder')}
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  required
                  error={errors.email?.message}
                />
              )}
            />
          </View>

          {/* Contraseña */}
          <View style={s.field}>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  label={t('auth.register.step1.password')}
                  placeholder={t('auth.register.step1.password_placeholder')}
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry={!showPassword}
                  required
                  error={errors.password?.message}
                  leftElement={<LockIcon />}
                  rightElement={
                    <TouchableOpacity
                      onPress={() => setShowPassword((v) => !v)}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <EyeIcon visible={showPassword} />
                    </TouchableOpacity>
                  }
                />
              )}
            />
          </View>

          {/* Confirmar contraseña */}
          <View style={s.field}>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => (
                <Input
                  label={t('auth.register.step1.confirm_password')}
                  placeholder={t('auth.register.step1.confirm_password_placeholder')}
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry={!showConfirm}
                  required
                  error={errors.confirmPassword?.message}
                  leftElement={<LockIcon />}
                  rightElement={
                    <TouchableOpacity
                      onPress={() => setShowConfirm((v) => !v)}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <EyeIcon visible={showConfirm} />
                    </TouchableOpacity>
                  }
                />
              )}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* CTA fuera del KeyboardAvoidingView — no sube con el teclado */}
      <AuthCTA
        buttonLabel={t('auth.register.step1.next')}
        onButtonPress={handleSubmit(onSubmit)}
        buttonRightIcon={<Text style={s.arrowIcon}>→</Text>}
        footerText={t('auth.register.step1.already_account')}
        footerLinkText={t('auth.register.step1.login')}
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
  progressActive: {
    backgroundColor: colors.primary,
  },
  progressCurrent: {
    flex: 2,
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
    marginBottom: 20,
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
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  halfField: {
    flex: 1,
  },
  field: {
    marginBottom: 16,
  },
  arrowIcon: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
  },
});
