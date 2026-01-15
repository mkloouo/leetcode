import { createContext, PropsWithChildren, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export interface DeckItem {
  title: string;
  pictureUrl: string;
}

export interface DeckContext {
  items: DeckItem[];
  addItem: (item: DeckItem) => void;
  removeItem: (item: DeckItem) => void;
}

export const DeckContext = createContext<DeckContext>({
  items: [],
  addItem: () => undefined,
  removeItem: () => undefined,
});

const DECK_KEY_PREFIX = 'DECK_KEY_PREFIX';

async function loadDeckItems() {
  const allKeys = await AsyncStorage.getAllKeys();
  const deckKeys = allKeys.filter((key) => key.startsWith(DECK_KEY_PREFIX));

  const items = (await AsyncStorage.multiGet(deckKeys))
    .map((storageItems) => {
      const item = storageItems[1];
      if (item === null) {
        return null;
      }

      try {
        return JSON.parse(item);
      } catch (error) {
        return null;
      }
    })
    .filter((value) => value !== null);

  return items;
}

async function storeDeckItems(deckItems: DeckItem[]) {
  await AsyncStorage.multiSet(
    deckItems.map((deckItem) => [
      `${DECK_KEY_PREFIX}${deckItem.title}`,
      JSON.stringify(deckItem),
    ])
  );
}

export const DeckContextProvider = ({ children }: PropsWithChildren) => {
  const [deckItems, setDeckItems] = useState<DeckItem[]>([]);

  useEffect(() => {
    let mounted = true;

    loadDeckItems()
      .then((items) => {
        if (mounted) {
          setDeckItems(items);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    storeDeckItems(deckItems);
  }, [deckItems]);

  return (
    <DeckContext.Provider
      value={{
        items: deckItems,
        addItem: (item) => setDeckItems((prev) => [...prev, item]),
        removeItem: (item) => {
          const itemIndex = deckItems.findIndex(
            (deckItem) => deckItem.title === item.title
          );
          if (itemIndex === -1) {
            return;
          }

          setDeckItems((prev) =>
            prev.filter((_value, index) => index !== itemIndex)
          );
        },
      }}>
      {children}
    </DeckContext.Provider>
  );
};
