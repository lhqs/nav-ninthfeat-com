import Fuse from 'fuse.js';
import type { WebsiteWithMetadata } from './types';

export function createSearchIndex(websites: WebsiteWithMetadata[]) {
  return new Fuse(websites, {
    keys: [
      { name: 'title', weight: 2 },
      { name: 'tags', weight: 1.5 },
      { name: 'description', weight: 1 },
      { name: 'url', weight: 0.5 },
    ],
    threshold: 0.3,
    includeScore: true,
    minMatchCharLength: 2,
  });
}

export function searchWebsites(
  query: string,
  websites: WebsiteWithMetadata[]
): WebsiteWithMetadata[] {
  if (!query.trim()) {
    return websites;
  }

  const fuse = createSearchIndex(websites);
  const results = fuse.search(query);

  return results.map(result => result.item);
}
