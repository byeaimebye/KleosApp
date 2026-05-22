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
import { useAuthStore } from '@/store/authStore';
import { loginSchema, type LoginInput } from '@/schemas/authSchemas';
import { colors } from '@/constants/colors';
import { radius, typography } from '@/constants/theme';
import AuthCTA from '@/components/auth/AuthCTA';
import Divider from '@/components/ui/Divider';
import Input from '@/components/ui/Input';
import SocialButton from '@/components/ui/SocialButton';

const MailIcon = () => <Text style={s.icon}>✉</Text>;
const LockIcon = () => <Text style={s.icon}>🔒</Text>;
const EyeIcon = ({ visible }: { visible: boolean }) => (
  <Text style={s.icon}>{visible ? '🙈' : '👁'}</Text>
);
const ArrowIcon = () => <Text style={s.arrowIcon}>→</Text>;
const AppleIcon = () => <Text style={s.socialIcon}>⌘</Text>;
const GoogleIcon = () => (
  <Text style={[s.socialIcon, { color: '#4285F4', fontWeight: '800' }]}>G</Text>
);

export default function LoginScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      const role = await login(data.email, data.password);
      router.replace(role === 'coach' ? '/(coach)' : '/(athlete)');
    } catch {
      setError('root', { message: t('auth.login.error') });
    }
  };

  return (
    <View style={s.root}>
      {/* Glow de fondo */}
      <View style={s.glow} />

      {/* ScrollView ajusta con el teclado — AuthCTA queda fuera y no sube */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={s.flex}
      >
        <ScrollView
          contentContainerStyle={s.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <View style={s.logoSection}>
            <Text style={s.logoText}>KLEOS</Text>
            <Text style={s.logoSub}>Tu plataforma de entrenamiento</Text>
          </View>

          {/* Títulos */}
          <Text style={[typography.heading, s.heading]}>
            {t('auth.login.title')}
          </Text>
          <Text style={[typography.subheading, s.subheading]}>
            {t('auth.login.subtitle')}
          </Text>

          {/* Email */}
          <View style={s.field}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  label={t('auth.login.email')}
                  placeholder={t('auth.login.email_placeholder')}
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={errors.email?.message}
                  leftElement={<MailIcon />}
                />
              )}
            />
          </View>

          {/* Password */}
          <View style={s.field}>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  label={t('auth.login.password')}
                  placeholder={t('auth.login.password_placeholder')}
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry={!showPassword}
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

          {/* Remember me + Forgot */}
          <View style={s.rememberRow}>
            <TouchableOpacity
              style={s.rememberLeft}
              onPress={() => setRememberMe((v) => !v)}
              activeOpacity={0.7}
            >
              <View style={[s.checkbox, rememberMe && s.checkboxOn]}>
                {rememberMe && <Text style={s.checkmark}>✓</Text>}
              </View>
              <Text style={typography.caption}>{t('auth.login.remember_me')}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={typography.link}>{t('auth.login.forgot_password')}</Text>
            </TouchableOpacity>
          </View>

          {/* Error global */}
          {errors.root && (
            <View style={s.errorBox}>
              <Text style={s.errorText}>{errors.root.message}</Text>
            </View>
          )}

          {/* Divider + Social */}
          <View style={s.dividerWrap}>
            <Divider label={t('auth.login.divider')} />
          </View>

          <View style={s.socialGroup}>
            <SocialButton label={t('auth.login.apple')} icon={<AppleIcon />} />
            <SocialButton label={t('auth.login.google')} icon={<GoogleIcon />} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* CTA fuera del KeyboardAvoidingView — no sube con el teclado */}
      <AuthCTA
        buttonLabel={t('auth.login.submit')}
        onButtonPress={handleSubmit(onSubmit)}
        buttonDisabled={isSubmitting}
        buttonRightIcon={<ArrowIcon />}
        footerText={t('auth.login.no_account')}
        footerLinkText={t('auth.login.register')}
        onFooterLinkPress={() => router.push('/(auth)/register')}
      />
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  glow: {
    position: 'absolute',
    bottom: -60,
    left: -60,
    right: -60,
    height: 340,
    borderRadius: 340,
    backgroundColor: 'rgba(52,211,153,0.12)',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 16,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 52,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 10,
  },
  logoSub: {
    fontSize: 12,
    color: colors.muted,
    letterSpacing: 2,
    marginTop: 4,
    textTransform: 'uppercase',
  },
  heading: {
    marginBottom: 4,
  },
  subheading: {
    marginBottom: 24,
  },
  field: {
    marginBottom: 16,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rememberLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.inputBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxOn: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  checkmark: {
    color: colors.foreground,
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 12,
  },
  errorBox: {
    backgroundColor: 'rgba(127,29,29,0.4)',
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.4)',
    borderRadius: radius.md,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 12,
    color: '#fca5a5',
    textAlign: 'center',
  },
  dividerWrap: {
    marginBottom: 16,
  },
  socialGroup: {
    gap: 10,
  },
  icon: {
    fontSize: 16,
    opacity: 0.55,
    color: colors.foreground,
  },
  arrowIcon: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
  },
  socialIcon: {
    fontSize: 18,
    color: colors.foreground,
  },
});
