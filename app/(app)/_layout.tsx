import React from 'react';
import { Drawer } from 'expo-router/drawer';

export default function AppLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: "Ana Menü",
          title: "Ana Menü"
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: "Ayarlar",
          title: "Ayarlar"
        }}
      />
    </Drawer>
  );
}