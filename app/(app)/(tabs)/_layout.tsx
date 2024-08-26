import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Anasayfa',
          tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Görevler',
          tabBarIcon: ({ color }) => <MaterialIcons name="task-alt" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => <AntDesign name="user" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
