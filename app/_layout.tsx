import { Slot } from 'expo-router';
import '@/i18n';

// El auth gate vive en cada screen protegida (<Redirect>) y en LoginScreen (router.replace post-login)
export default function RootLayout() {
  return <Slot />;
}
