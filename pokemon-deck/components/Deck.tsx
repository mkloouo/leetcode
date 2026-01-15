import { useCallback, useContext } from 'react';

import { View, StyleSheet, Text } from 'react-native';

import { DeckContext, DeckItem } from '../contexts/DeckContext';
import { PressableItem } from './PressableItem';

export function Deck() {
  const deck = useContext(DeckContext);

  const renderDeckItem = useCallback(
    (item: DeckItem) => (
      <PressableItem {...item} onPress={() => deck.removeItem(item)} />
    ),
    [deck]
  );

  return (
    <View style={styles.container}>
      <View style={styles.deckContainer}>
        {deck.items.length === 0 ? (
          <Text>Add some in the Catalog</Text>
        ) : (
          deck.items.map(renderDeckItem)
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    rowGap: 10,
  },
  deckContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
