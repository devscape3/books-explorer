import { StyleProp, TextStyle } from 'react-native';
import { Stack, router } from 'expo-router';

import { TouchableIcon } from '@/components/TouchableIcon';

export default function MainLayout() {
  return (
    <Stack screenOptions={{
      headerStyle: headerStyle,
      animation: "slide_from_right", // TODO: must use smooth transition
      gestureEnabled: true,
      headerTitleAlign: 'center',
      headerTitleStyle: headerTitleStyle,
      headerShadowVisible: false,
      headerLeft: ({ canGoBack }) =>
        canGoBack ? (
          <TouchableIcon ionicIconName='arrow-back' onPress={() => router.back()} />
        ) : null,
      // takes you back to search screen, TODO: may be used to search from book details.
      headerRight: ({ canGoBack }) =>
        canGoBack ? (
          <TouchableIcon ionicIconName='search' onPress={() => router.back()} />
        ) : null,
    }}>
      <Stack.Screen name="index" options={{ title: "Search Books" }} />
      <Stack.Screen name="detail" options={{ title: "", presentation: "modal" }} />
    </Stack>
  );
}

// customize header title here
const headerTitleStyle: StyleProp<Pick<TextStyle, "fontFamily" | "fontSize" | "fontWeight"> & { color?: string | undefined; }> = {
  fontFamily: 'Helvetica',
  fontWeight: 400,
  fontSize: 18,
  color: '#121212'
}

const headerStyle = {
  backgroundColor: '#fff',
}