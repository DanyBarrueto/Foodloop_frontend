import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';

export default function AdminScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <ThemedText type="title">Administrador</ThemedText>
        <ThemedText>Bienvenido al panel de administración.</ThemedText>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
});
