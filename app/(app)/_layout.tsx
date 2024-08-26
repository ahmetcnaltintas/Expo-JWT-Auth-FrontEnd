import React from 'react';
import { Drawer } from 'expo-router/drawer';

export default function AppLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: "Ana Sayfa",
          title: "TodoApp",
          headerShown: false  // Drawer içindeki header'ı gizle
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: "Ayarlar",
          title: "Ayarlar",
          headerShown: false  // Drawer içindeki header'ı gizle
        }}
      />
    </Drawer>
  );
}