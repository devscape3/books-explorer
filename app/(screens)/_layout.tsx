import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { useExpoRouter } from 'expo-router/build/global-state/router-store';
import React from 'react';
import { StyleProp, TextStyle, TouchableOpacity } from 'react-native';

export default function TabLayout() {
  const router = useExpoRouter();
  return (
    <Stack screenOptions={{
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTitleAlign: 'center',
      headerTitleStyle: headerTitleStyle,
      headerShadowVisible: false,
      headerLeft: ({ canGoBack }) =>
        canGoBack ? (
          <TouchableOpacity onPress={() => router.goBack() /*navigation.goBack()*/} style={{ padding: 10 }}>
            <Ionicons name="arrow-back" size={20} color="#19191B" />
          </TouchableOpacity>
        ) : null,
      headerRight: () => (
        <TouchableOpacity onPress={() => alert('Search Pressed')} style={{ padding: 10 }}>
          <Ionicons name="search" size={20} color="#19191B" />
        </TouchableOpacity>
      ),
    }}>
      <Stack.Screen name="index" options={{ title: "Search Books" }} />
      <Stack.Screen name="detail" options={{ title: "Book Details" }} />
    </Stack>
  );
}

const headerTitleStyle:StyleProp<Pick<TextStyle, "fontFamily" | "fontSize" | "fontWeight"> & { color?: string | undefined; }> = {
  fontFamily: 'Helvetica',
  fontWeight: 400,
  fontSize: 18,
  color: '#121212'
}