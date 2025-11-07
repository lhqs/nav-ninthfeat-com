"use client";

import { useEffect, useState } from "react";
import { getAllWebsites } from "@/lib/data";
import type { WebsiteWithMetadata } from "@/lib/types";

export default function RandomPage() {
  const [website, setWebsite] = useState<WebsiteWithMetadata | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const getRandomWebsite = () => {
    const websites = getAllWebsites();
    const randomIndex = Math.floor(Math.random() * websites.length);
    return websites[randomIndex];
  };

  const handleSpin = () => {
    setIsSpinning(true);
    setTimeout(() => {
      setWebsite(getRandomWebsite());
      setIsSpinning(false);
    }, 500);
  };

  const handleVisit = () => {
    if (website) {
      window.open(website.url, "_blank", "noopener,noreferrer");
    }
  };

  useEffect(() => {
    setWebsite(getRandomWebsite());
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <span className="gradient-text">任意门</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          随机探索精选网站 · 发现新的可能
        </p>
      </section>

      {/* Random Website Card */}
      <section className="max-w-2xl mx-auto">
        <div className="glass rounded-lg p-8 md:p-12">
          {website && (
            <div
              className={`text-center transition-all duration-500 ${
                isSpinning ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary to-accent p-0.5">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                  <img
                    src={website.favicon}
                    alt=""
                    className="w-12 h-12 rounded"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-2 text-white">{website.title}</h2>
              <p className="text-gray-400 mb-6">{website.url}</p>

              {website.description && (
                <p className="text-sm text-gray-400 mb-6 max-w-md mx-auto">
                  {website.description}
                </p>
              )}

              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {website.tagArray.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs bg-gray-800 text-gray-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handleVisit}
                  className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:opacity-90 transition-all duration-300"
                >
                  访问网站
                </button>
                <button
                  onClick={handleSpin}
                  disabled={isSpinning}
                  className="px-8 py-3 rounded-lg bg-gray-900/80 border border-gray-700 text-white font-medium hover:border-blue-500/50 transition-all duration-300 disabled:opacity-50"
                >
                  {isSpinning ? "抽取中..." : "换一个"}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Tips */}
      <section className="mt-12 max-w-2xl mx-auto">
        <div className="glass rounded-lg p-6">
          <h2 className="text-sm font-semibold mb-3 text-gray-400">使用提示</h2>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>点击"换一个"按钮随机抽取网站</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>点击"访问网站"在新标签页打开当前网站</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>每次刷新页面也会随机推荐一个网站</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
