import { Redirect } from 'expo-router';

export default function IndexRedirect() {
  // Redirige inmediatamente a la pantalla principal deseada
  return <Redirect href="/PantallaPrincipal" />;
}
