import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/theme';

// Placeholder — Story 1.2.2: Coach Step 2 (Perfil profesional)
export default function CoachStep2() {
  const router = useRouter();

  return (
    <View style={s.root}>
      <Text style={[typography.heading, s.title]}>Próximamente</Text>
      <Text style={[typography.subheading, s.subtitle]}>
        Acá va a ir el perfil profesional del coach
      </Text>
      <TouchableOpacity onPress={() => router.back()} style={s.back} activeOpacity={0.7}>
        <Text style={s.backText}>← Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 12,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  back: {
    marginTop: 16,
  },
  backText: {
    color: colors.link,
    fontSize: 14,
  },
});
