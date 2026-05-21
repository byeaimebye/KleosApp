import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

// Placeholder — Story 1.2: Registro (Coach y Atleta)
export default function CreateAccount() {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <Text className="mb-2 text-3xl font-bold text-primary">Crear cuenta</Text>
      <Text className="mb-8 text-center text-muted">
        Próximamente — Story 1.2
      </Text>
      <TouchableOpacity onPress={() => router.back()}>
        <Text className="text-link">← Volver al login</Text>
      </TouchableOpacity>
    </View>
  );
}
