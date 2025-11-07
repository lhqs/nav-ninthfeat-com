"use client";

import { useState } from "react";
import { getSearchEngines } from "@/lib/data";
import type { SearchCategory } from "@/lib/types";

export default function SearchPage() {
  const searchData = getSearchEngines();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(searchData.data[0]?.tag || "全文");

  const handleSearch = (engineUrl: string) => {
    if (!query.trim()) return;
    const url = engineUrl.replace("${query}", encodeURIComponent(query));
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const activeEngines = searchData.data.find((cat) => cat.tag === activeCategory)?.list || [];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <span className="gradient-text">聚合搜索</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          一次搜索，多个引擎 · 高效获取信息
        </p>
      </section>

      {/* Search Input */}
      <section className="max-w-3xl mx-auto mb-12">
        <div className="glass rounded-lg p-2">
          <div className="flex items-center gap-2">
            <svg
              className="w-6 h-6 text-muted-foreground ml-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="输入搜索关键词..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && activeEngines[0]) {
                  handleSearch(activeEngines[0].url);
                }
              }}
              className="flex-1 bg-transparent border-none outline-none px-2 py-4 text-lg text-foreground placeholder:text-muted-foreground"
              autoFocus
            />
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="mb-8">
        <div className="glass rounded-lg p-4 overflow-hidden">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2" style={{ WebkitOverflowScrolling: 'touch' }}>
            {searchData.data.map((category) => (
              <button
                key={category.tag}
                onClick={() => setActiveCategory(category.tag)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeCategory === category.tag
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                }`}
              >
                {category.tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Search Engines */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {activeEngines.map((engine) => (
            <button
              key={engine.title}
              onClick={() => handleSearch(engine.url)}
              disabled={!query.trim()}
              className="glass rounded-lg p-6 text-center transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:border-[hsl(var(--border))]"
            >
              <div className="text-lg font-semibold mb-2 text-foreground">{engine.title}</div>
              <div className="text-xs text-muted-foreground">
                {query.trim() ? `搜索 "${query}"` : "输入关键词"}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section className="mt-12 max-w-2xl mx-auto">
        <div className="glass rounded-lg p-6">
          <h2 className="text-sm font-semibold mb-3 text-muted-foreground">使用提示</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>输入关键词后，点击搜索引擎按钮进行搜索</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>按 Enter 键使用默认搜索引擎（当前分类第一个）</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>切换分类标签可以访问不同类型的搜索引擎</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
