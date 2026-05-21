import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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
import { typography } from '@/constants/theme';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Divider from '@/components/ui/Divider';
import Input from '@/components/ui/Input';
import SocialButton from '@/components/ui/SocialButton';

// Íconos inline — sin dependencia externa
const MailIcon = () => <Text style={{ fontSize: 16, opacity: 0.55, color: colors.foreground }}>✉</Text>;
const LockIcon = () => <Text style={{ fontSize: 16, opacity: 0.55, color: colors.foreground }}>🔒</Text>;
const EyeIcon = ({ visible }: { visible: boolean }) => (
  <Text style={{ fontSize: 16, opacity: 0.55, color: colors.foreground }}>
    {visible ? '🙈' : '👁'}
  </Text>
);
const ArrowIcon = () => <Text style={{ fontSize: 17, fontWeight: '700', color: '#000' }}>→</Text>;
const AppleIcon = () => <Text style={{ fontSize: 18, color: colors.foreground }}>⌘</Text>;
const GoogleIcon = () => <Text style={{ fontSize: 18, fontWeight: '800', color: '#4285F4' }}>G</Text>;

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
      const { role } = await login(data.email, data.password);
      if (role === 'coach') {
        router.replace('/(coach)');
      } else {
        router.replace('/(athlete)');
      }
    } catch {
      setError('root', { message: t('auth.login.error') });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      {/* Glow de fondo */}
      <View
        style={{
          position: 'absolute',
          bottom: -60,
          left: -60,
          right: -60,
          height: 340,
          borderRadius: 340,
          backgroundColor: 'rgba(52,211,153,0.12)',
        }}
      />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingTop: 56, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ── Logo ─────────────────────────────────────────── */}
        <View style={{ alignItems: 'center', marginBottom: 36 }}>
          <Text style={{ fontSize: 52, fontWeight: '800', color: colors.primary, letterSpacing: 10 }}>
            KLEOS
          </Text>
          <Text style={{ fontSize: 12, color: colors.muted, letterSpacing: 2, marginTop: 4, textTransform: 'uppercase' }}>
            Tu plataforma de entrenamiento
          </Text>
        </View>

        {/* ── Card ─────────────────────────────────────────── */}
        <Card>
          <Text style={[typography.heading, { marginBottom: 4 }]}>
            {t('auth.login.title')}
          </Text>
          <Text style={[typography.subheading, { marginBottom: 24 }]}>
            {t('auth.login.subtitle')}
          </Text>

          {/* Email */}
          <View style={{ marginBottom: 16 }}>
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
          <View style={{ marginBottom: 16 }}>
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
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
              onPress={() => setRememberMe((v) => !v)}
              activeOpacity={0.7}
            >
              <View
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: rememberMe ? colors.success : colors.border,
                  backgroundColor: rememberMe ? colors.success : colors.inputBg,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {rememberMe && (
                  <Text style={{ color: colors.foreground, fontSize: 10, fontWeight: '700', lineHeight: 12 }}>
                    ✓
                  </Text>
                )}
              </View>
              <Text style={typography.caption}>{t('auth.login.remember_me')}</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7}>
              <Text style={typography.link}>{t('auth.login.forgot_password')}</Text>
            </TouchableOpacity>
          </View>

          {/* Error global */}
          {errors.root && (
            <View
              style={{
                backgroundColor: 'rgba(127,29,29,0.4)',
                borderWidth: 1,
                borderColor: 'rgba(239,68,68,0.4)',
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 12,
                marginBottom: 16,
              }}
            >
              <Text style={{ fontSize: 12, color: '#fca5a5', textAlign: 'center' }}>
                {errors.root.message}
              </Text>
            </View>
          )}

          {/* Botón principal */}
          <View style={{ marginBottom: 24 }}>
            <Button
              variant="gradient"
              size="lg"
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              rightIcon={<ArrowIcon />}
            >
              {t('auth.login.submit')}
            </Button>
          </View>

          {/* Divider */}
          <View style={{ marginBottom: 20 }}>
            <Divider label={t('auth.login.divider')} />
          </View>

          {/* Social buttons */}
          <View style={{ gap: 10, marginBottom: 24 }}>
            <SocialButton label={t('auth.login.apple')} icon={<AppleIcon />} />
            <SocialButton label={t('auth.login.google')} icon={<GoogleIcon />} />
          </View>

          {/* Footer */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={typography.caption}>{t('auth.login.no_account')} </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/register')} activeOpacity={0.75}>
              <Text style={{ fontSize: 13, fontWeight: '700', color: colors.gradientTo, borderBottomWidth: 1, borderBottomColor: colors.gradientTo }}>
                {t('auth.login.register')}
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
