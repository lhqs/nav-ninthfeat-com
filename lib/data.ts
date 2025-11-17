import websitesData from '@/data/websites.json';
import searchData from '@/data/search-engines.json';
import type { Website, SearchData, WebsiteWithMetadata } from './types';

// 处理网站数据，添加元数据
export function processWebsites(websites: Website[]): WebsiteWithMetadata[] {
  return websites.map(site => {
    let favicon = '';
    try {
      const url = new URL(site.url);
      favicon = `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=128`;
    } catch (error) {
      console.warn(`Invalid URL for ${site.title}: ${site.url}`);
      favicon = '';
    }

    return {
      ...site,
      tagArray: site.tags.split(/\s+/).filter(Boolean),
      favicon,
    };
  });
}

// 获取所有网站
export function getAllWebsites(): WebsiteWithMetadata[] {
  return processWebsites(websitesData as Website[]);
}

// 获取所有标签
export function getAllTags(): string[] {
  const websites = getAllWebsites();
  const tagsSet = new Set<string>();

  websites.forEach(site => {
    site.tagArray.forEach(tag => tagsSet.add(tag));
  });

  return Array.from(tagsSet).sort();
}

// 根据标签获取网站
export function getWebsitesByTag(tag: string): WebsiteWithMetadata[] {
  const websites = getAllWebsites();
  return websites.filter(site =>
    site.tagArray.includes(tag)
  );
}

// 获取所有标签及其数量
export function getAllTagsWithCount(): Array<{ tag: string; count: number }> {
  const websites = getAllWebsites();
  const tagCounts = new Map<string, number>();

  websites.forEach(site => {
    site.tagArray.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

// 获取热门标签（网站数量最多的前 N 个）
// 排除过于通用的标签（出现在超过30%网站中的标签）
export function getPopularTags(limit: number = 20): Array<{ tag: string; count: number }> {
  const websites = getAllWebsites();
  const tagCounts = new Map<string, number>();
  const totalWebsites = websites.length;

  websites.forEach(site => {
    site.tagArray.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });

  // 过滤掉通用标签（出现频率 > 30%）和出现次数过少的标签（< 5次）
  const filteredTags = Array.from(tagCounts.entries())
    .filter(([tag, count]) => {
      const frequency = count / totalWebsites;
      return frequency <= 0.3 && count >= 5;
    })
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);

  return filteredTags;
}

// 获取搜索引擎数据
export function getSearchEngines(): SearchData {
  return searchData as SearchData;
}

// 统计信息
export function getStats() {
  const websites = getAllWebsites();
  const tags = getAllTags();

  return {
    totalWebsites: websites.length,
    totalTags: tags.length,
    avgTagsPerSite: (websites.reduce((acc, site) => acc + site.tagArray.length, 0) / websites.length).toFixed(1),
  };
}
