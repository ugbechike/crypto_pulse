import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { TamaguiProvider, View } from '@tamagui/core'
import { config } from '../config/tamagui.config'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { PortalProvider } from '@tamagui/portal';

import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient()


export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={config}  defaultTheme="dark">
        <PortalProvider>
          <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: "#121212", paddingHorizontal: 14 }}>
            <Stack 
              screenOptions={{ 
                headerShown: false,
                contentStyle: { 
                  backgroundColor: '$background'
                },
              }}
            >
              <Stack.Screen name="index" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="light" />
            </SafeAreaView>
          </SafeAreaProvider>
        </PortalProvider>
      </TamaguiProvider> 
    </QueryClientProvider>  
  );
}
