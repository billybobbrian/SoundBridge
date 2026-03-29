import { StatusBar } from 'expo-status-bar';
import { RootNavigator } from './src/navigation/RootNavigator';
import { AppStateProvider } from './src/state/AppStateContext';

export default function App() {
  return (
    <AppStateProvider>
      <StatusBar style="light" />
      <RootNavigator />
    </AppStateProvider>
  );
}
