import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainTabs } from './MainTabs';
import { GenreScreen } from '../screens/onboarding/GenreScreen';
import { LanguageScreen } from '../screens/onboarding/LanguageScreen';
import { LoadingSongsScreen } from '../screens/onboarding/LoadingSongsScreen';
import { RegionScreen } from '../screens/onboarding/RegionScreen';
import { LiveLyricsScreen } from '../screens/player/LiveLyricsScreen';
import { FlashcardStudyScreen } from '../screens/flashcards/FlashcardStudyScreen';
import { theme } from '../theme/theme';

export type RootStackParamList = {
  Language: undefined;
  Region: undefined;
  Genre: undefined;
  LoadingSongs: undefined;
  MainTabs: undefined;
  LiveLyrics: undefined;
  FlashcardStudy: {
    deckId: string;
    deckTitle: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: theme.colors.background,
    card: theme.colors.surface,
    text: theme.colors.textPrimary,
    border: theme.colors.border,
    primary: theme.colors.accent,
  },
};

export function RootNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        initialRouteName="Language"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Screen name="Language" component={LanguageScreen} />
        <Stack.Screen name="Region" component={RegionScreen} />
        <Stack.Screen name="Genre" component={GenreScreen} />
        <Stack.Screen
          name="LoadingSongs"
          component={LoadingSongsScreen}
          options={{ headerBackVisible: false }}
        />
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="LiveLyrics"
          component={LiveLyricsScreen}
          options={{
            headerShown: false,
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen name="FlashcardStudy" component={FlashcardStudyScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
