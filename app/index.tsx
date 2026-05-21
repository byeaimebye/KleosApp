import { Redirect } from 'expo-router';

// El login vive en /(auth) para evitar conflicto de rutas con /(coach) y /(athlete)
export default function Index() {
  return <Redirect href="/(auth)" />;
}
