"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import { getAllWebsites, getPopularTags, getAllTagsWithCount, getStats, getWebsitesByTag } from "@/lib/data";
import { WebsiteCard } from "@/components/ui/website-card";
import { TagFilter } from "@/components/ui/tag-filter";

const ITEMS_PER_PAGE = 60;

function HomeContent() {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  const allWebsites = useMemo(() =>
    tag ? getWebsitesByTag(decodeURIComponent(tag)) : getAllWebsites(),
    [tag]
  );

  const websites = useMemo(() =>
    allWebsites.slice(0, displayCount),
    [allWebsites, displayCount]
  );

  const hasMore = displayCount < allWebsites.length;
  const popularTags = getPopularTags(20);
  const allTags = getAllTagsWithCount();
  const stats = getStats();

  // 标签变化时重置显示数量
  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE);
  }, [tag]);

  const loadMore = () => {
    setDisplayCount(prev => Math.min(prev + ITEMS_PER_PAGE, allWebsites.length));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-6 text-center">
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            精选网址导航
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-center">
          收录 <span className="text-blue-500 font-semibold">{stats.totalWebsites}+</span> 优质网站
          · <span className="text-purple-500 font-semibold">{stats.totalTags}</span> 个分类标签
        </p>

        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 rounded bg-muted text-muted-foreground text-xs border">⌘K</kbd>
            <span>快速搜索</span>
          </div>
          <span>·</span>
          <div>持续更新中</div>
        </div>
      </section>

      {/* Tag Filter */}
      <section className="px-4 max-w-6xl mx-auto mb-8">
        <div className="glass rounded-lg p-4">
          <TagFilter popularTags={popularTags} allTags={allTags} totalTags={stats.totalTags} />
        </div>
      </section>

      {/* Active Tag Display */}
      {tag && (
        <section className="px-4 max-w-6xl mx-auto mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-blue-500">#{decodeURIComponent(tag)}</h2>
            <span className="text-sm text-muted-foreground">
              {allWebsites.length} 个网站
            </span>
          </div>
        </section>
      )}

      {/* Websites Grid */}
      <section className="px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {websites.map((website) => (
            <WebsiteCard key={website.url} website={website} />
          ))}
        </div>

        {allWebsites.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">未找到网站</h3>
            <p className="text-muted-foreground">
              该标签下暂无网站，试试其他标签吧
            </p>
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center mt-8">
            <button
              onClick={loadMore}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              加载更多 ({displayCount} / {allWebsites.length})
            </button>
          </div>
        )}
      </section>

      {/* Stats Section */}
      <section className="mt-20 px-4 max-w-6xl mx-auto pb-16">
        <div className="glass rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
                {stats.totalWebsites}+
              </div>
              <div className="text-sm text-muted-foreground">精选网站</div>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
                {stats.totalTags}
              </div>
              <div className="text-sm text-muted-foreground">分类标签</div>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
                {stats.avgTagsPerSite}
              </div>
              <div className="text-sm text-muted-foreground">平均标签数</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">加载中...</p>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
