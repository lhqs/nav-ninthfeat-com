"use client";

import { useEffect, useState, useCallback } from "react";
import { searchWebsites } from "@/lib/search";
import { getAllWebsites } from "@/lib/data";
import type { WebsiteWithMetadata } from "@/lib/types";

interface SearchBarProps {
  onClose: () => void;
}

export function SearchBar({ onClose }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<WebsiteWithMetadata[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const websites = getAllWebsites();
    if (query.trim()) {
      const searchResults = searchWebsites(query, websites);
      setResults(searchResults.slice(0, 10));
    } else {
      setResults([]);
    }
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
      } else if (e.key === "Enter" && results[selectedIndex]) {
        window.open(results[selectedIndex].url, "_blank");
        onClose();
      }
    },
    [onClose, results, selectedIndex]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="max-w-2xl mx-auto px-4 pt-20">
        <div
          className="bg-card rounded-lg overflow-hidden border border-border shadow-2xl animate-in slide-in-from-top-4 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center border-b border-border px-4">
            <svg
              className="w-5 h-5 text-muted-foreground"
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
              placeholder="搜索网站..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && results[0]) {
                  window.open(results[0].url, "_blank");
                  onClose();
                }
              }}
              className="flex-1 bg-transparent border-none outline-none px-4 py-4 text-lg text-foreground placeholder:text-muted-foreground"
              autoFocus
            />
            <kbd className="text-xs text-muted-foreground">ESC</kbd>
          </div>

          {results.length > 0 && (
            <div className="max-h-96 overflow-y-auto">
              {results.map((site, index) => (
                <a
                  key={site.url}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 px-4 py-3 border-b border-border/50 transition-colors ${
                    index === selectedIndex
                      ? "bg-blue-500/10"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={onClose}
                >
                  {site.favicon ? (
                    <img
                      src={site.favicon}
                      alt=""
                      className="w-6 h-6 rounded"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-6 h-6 rounded bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                      {site.title[0]}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate text-foreground">
                      {site.title}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {site.tagArray.map(tag => `#${tag}`).join(" ")}
                    </div>
                  </div>
                  <svg
                    className="w-4 h-4 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              ))}
            </div>
          )}

          {query && results.length === 0 && (
            <div className="px-4 py-8 text-center text-muted-foreground">
              未找到相关网站
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
