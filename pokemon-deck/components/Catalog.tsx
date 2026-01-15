import { useState, useCallback, useContext, useEffect } from 'react';

import {
  ScrollView,
  View,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { DeckContext, DeckItem } from '../contexts/DeckContext';
import { PressableItem } from './PressableItem';
import {
  PageUrl,
  fetchCatalogItems as fetchCatalogItemsService,
  FetchDirection,
} from '../services/fetchCatalogItems';

export type CatalogItem = DeckItem;

interface Urls {
  next: PageUrl;
  previous: PageUrl;
}

export function Catalog() {
  const deck = useContext(DeckContext);
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>([]);
  const [urls, setUrls] = useState<Urls>({
    next: null,
    previous: null,
  });
  const [loading, setLoading] = useState(false);

  const fetchCatalogItems = useCallback(
    async (direction: FetchDirection) => {
      try {
        setLoading(true);
        const data = await fetchCatalogItemsService({
          ...urls,
          direction,
        });

        if (!data) {
          return;
        }

        setUrls({
          next: data.next,
          previous: data.previous,
        });

        setCatalogItems(data.items);
      } catch (error) {
        Alert.alert(
          'Something went wrong',
          'Some issue occured when fetching. Please ask developer for further info.'
        );
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [urls]
  );

  const saveToDeck = useCallback(
    (item: CatalogItem) => {
      if (
        deck.items.findIndex((deckItem) => deckItem.title === item.title) === -1
      ) {
        deck.addItem(item);
      }
    },
    [deck]
  );

  const renderCatalogItem = useCallback(
    (item: CatalogItem) => (
      <PressableItem {...item} onPress={() => saveToDeck(item)} />
    ),
    [saveToDeck]
  );

  useEffect(() => {
    fetchCatalogItems('forward');
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.catalogContainer}>
        {loading ? <ActivityIndicator /> : catalogItems.map(renderCatalogItem)}
      </ScrollView>
      <View style={styles.controls}>
        <Button
          title="Back"
          onPress={() => fetchCatalogItems('backward')}
          disabled={urls.previous === null}
        />
        <Button
          title="Forward"
          onPress={() => fetchCatalogItems('forward')}
          disabled={urls.next === null}
        />
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
  catalogContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  controls: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: 10,
  },
});
