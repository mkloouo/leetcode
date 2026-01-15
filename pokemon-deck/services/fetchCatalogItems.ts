import { CatalogItem as CatalogComponentItem } from '../components/Catalog';
import { API_URL } from '../constants';

export type PageUrl = string | null;

interface CatalogItem {
  name: string;
  url: string;
}

interface CatalogItemsResponse {
  count: number;
  next: PageUrl;
  previos: PageUrl;
  results: CatalogItem[];
}

interface CatalogItemResponse {
  sprites: {
    front_default: string;
  };
}

function isCatalogItemsResponse(data: any): data is CatalogItemsResponse {
  return data.count !== undefined;
}

function isCatalogItemResponse(data: any): data is CatalogItemResponse {
  return data?.sprites?.front_default !== undefined;
}

export type FetchDirection = 'forward' | 'backward';

export interface FetchCatalogItemsParams {
  next: PageUrl;
  previous: PageUrl;
  direction: FetchDirection;
}

export async function fetchCatalogItems(
  { next, previous, direction }: FetchCatalogItemsParams = {
    next: null,
    previous: null,
    direction: 'forward',
  }
) {
  if (!previous && !next) {
    next = API_URL;
  }

  if (
    (!previous && direction === 'backward') ||
    (!next && direction === 'forward')
  ) {
    return;
  }

  const response = await fetch(direction === 'forward' ? next! : previous!);
  const data = await response.json();

  if (!isCatalogItemsResponse(data)) {
    return null;
  }

  const catalogItems = await Promise.all(
    data.results.map(async (originalItem) => {
      const originalItemResponse = await fetch(originalItem.url);
      const originalItemData = await originalItemResponse.json();

      const processedCatalogItem: CatalogComponentItem = {
        title: originalItem.name,
        pictureUrl: '',
      };

      if (isCatalogItemResponse(originalItemData)) {
        processedCatalogItem.pictureUrl =
          originalItemData.sprites.front_default;
      }

      return processedCatalogItem;
    })
  );

  return {
    items: catalogItems,
    next: data.next,
    previous: data.previous,
  };
}
