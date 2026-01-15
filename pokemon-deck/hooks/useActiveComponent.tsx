import { useState, useMemo } from 'react';
import { Catalog, Deck, NavBarItem } from '../components';

export enum ActiveComponent {
  Catalog,
  Deck,
}

export const ActiveComponentMap = {
  [ActiveComponent.Catalog]: Catalog,
  [ActiveComponent.Deck]: Deck,
};

export function useActiveComponent() {
  const [activeComponent, setActiveComponent] = useState(
    ActiveComponent.Catalog
  );

  const navigationItems = useMemo(
    () =>
      [
        {
          title: 'Catalog',
          onPress: () => setActiveComponent(ActiveComponent.Catalog),
        },
        {
          title: 'Deck',
          onPress: () => setActiveComponent(ActiveComponent.Deck),
        },
      ] as NavBarItem[],
    []
  );

  return { activeComponent, navigationItems };
}
