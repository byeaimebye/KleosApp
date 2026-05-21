import { Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { RegisterFlowProvider } from '@/context/RegisterFlowContext';

export default function RegisterLayout() {
  return (
    <RegisterFlowProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      />
    </RegisterFlowProvider>
  );
}
