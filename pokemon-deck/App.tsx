import { StyleSheet, View, SafeAreaView } from 'react-native';

import { NavBar } from './components';
import {
  useActiveComponent,
  ActiveComponentMap,
} from './hooks/useActiveComponent';
import { DeckContextProvider } from './contexts/DeckContext';

export default function App() {
  const { activeComponent, navigationItems } = useActiveComponent();
  const ActiveComponent = ActiveComponentMap[activeComponent];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <DeckContextProvider>
          <ActiveComponent />
        </DeckContextProvider>
        <NavBar items={navigationItems} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
