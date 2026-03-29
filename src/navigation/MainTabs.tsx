import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import { MiniPlayerBar } from '../components/player/MiniPlayerBar';
import { DiscoverScreen } from '../screens/discover/DiscoverScreen';
import { FlashcardsScreen } from '../screens/flashcards/FlashcardsScreen';
import { LibraryScreen } from '../screens/library/LibraryScreen';

export type MainTabParamList = {
  Discover: undefined;
  Library: undefined;
  Flashcards: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => (
        <View style={styles.tabShell}>
          <MiniPlayerBar />
          <BottomTabBar {...props} />
        </View>
      )}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#6E5BE3',
        tabBarInactiveTintColor: '#6D6A80',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: -2,
          marginBottom: 6,
        },
        tabBarItemStyle: {
          paddingTop: 4,
        },
        tabBarStyle: {
          backgroundColor: '#111524',
          borderTopColor: '#2A3145',
          height: 76,
          paddingTop: 2,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'musical-notes-outline';
          if (route.name === 'Discover') iconName = 'compass-outline';
          if (route.name === 'Library') iconName = 'library-outline';
          if (route.name === 'Flashcards') iconName = 'layers-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="Flashcards" component={FlashcardsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabShell: {
    backgroundColor: 'transparent',
  },
});
