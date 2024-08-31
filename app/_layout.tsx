import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomHeader from '../components/CustomHeader';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTransparent: true,
          headerTintColor: '#000',
        }}
      >
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(app)" options={{ 
          headerTitle: '',
         }}/>
        <Stack.Screen 
          name="taskDetail/[id]" 
          options={({ navigation }) => ({ 
            headerTitle: "Detay Sayfası",
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
            ),
            headerTransparent: false, // Detay sayfasında şeffaf header istemiyorsanız
            contentStyle: { paddingTop: 0 }, // Detay sayfasında ekstra padding'e gerek yok
          })}  
        />
      </Stack>
    </AuthProvider>
  );
}