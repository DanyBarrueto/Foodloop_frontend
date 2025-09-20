import { AuthProvider, useAuth } from '@/context/AuthContext';
import { overlayBus } from '@/utils/overlayBus';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayoutInner() {
  const colorScheme = useColorScheme();
  const [showAccountMenu, setShowAccountMenu] = React.useState(false);
  const { logout } = useAuth();

  React.useEffect(() => {
    const offShow = overlayBus.on('showAccountMenu', () => setShowAccountMenu(true));
    const offHide = overlayBus.on('hideOverlay', () => setShowAccountMenu(false));
    const offAction = overlayBus.on('accountAction', ({ action }) => {
      setShowAccountMenu(false);
      if (action === 'logout') {
        // Cerrar sesión global
        logout().finally(() => {
          try { router.replace('/(tabs)/PantallaPrincipal' as any); } catch {}
        });
      }
    });
    return () => { offShow(); offHide(); offAction(); };
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      {/* Overlay global por encima de toda la app */}
      {showAccountMenu && (
        <TouchableOpacity style={overlayStyles.overlay} activeOpacity={1} onPress={() => setShowAccountMenu(false)}>
          <View style={overlayStyles.topSpace} />
          <View style={overlayStyles.rightAlign}>
            <View style={overlayStyles.dropdown}>
              <TouchableOpacity style={overlayStyles.item} onPress={() => overlayBus.emit('accountAction', { action: 'config' })}>
                <Text style={overlayStyles.text}>⚙️ Actualizar Datos</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[overlayStyles.item, overlayStyles.lastItem]} onPress={() => overlayBus.emit('accountAction', { action: 'logout' })}>
                <Text style={[overlayStyles.text, overlayStyles.logout]}>🚪 Cerrar Sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      )}
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutInner />
    </AuthProvider>
  );
}

const overlayStyles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 999999,
    elevation: 999999,
  },
  topSpace: { height: 80 },
  rightAlign: { alignItems: 'flex-end', paddingRight: 20 },
  dropdown: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 1000,
    minWidth: 200,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  lastItem: { borderBottomWidth: 0 },
  text: { fontSize: 14, color: '#374151', fontWeight: '500' },
  logout: { color: '#dc2626' },
});
