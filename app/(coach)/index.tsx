import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/authStore';

// Placeholder — Story 2.x: CoachView
export default function CoachHome() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/(auth)');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1a3a45', paddingHorizontal: 24 }}>
      <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#c4ff0e', marginBottom: 4 }}>Coach</Text>
      <Text style={{ color: '#9ca3af', marginBottom: 32 }}>Hola, {user?.name}</Text>
      <TouchableOpacity
        onPress={handleLogout}
        style={{ borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', borderRadius: 999, paddingHorizontal: 24, paddingVertical: 12 }}
      >
        <Text style={{ color: '#ffffff' }}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}
