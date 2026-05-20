import './global.css';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-primary text-4xl font-bold tracking-widest">
        KLEOS
      </Text>
      <Text className="text-muted text-sm mt-2 tracking-wider">
        Tu plataforma de entrenamiento
      </Text>
      <StatusBar style="light" />
    </View>
  );
}
