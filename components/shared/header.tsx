"use client";

import Link from "next/link";
import { useState } from "react";
import { SearchBar } from "./search-bar";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl border-b" style={{ backgroundColor: 'hsl(var(--card) / 0.8)', borderColor: 'hsl(var(--border))' }}>
      <nav className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            精选网址导航
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              <span>搜索</span>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>

            <Link
              href="/search"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              聚合搜索
            </Link>

            <Link
              href="/random"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              任意门
            </Link>

            <a
              href="https://github.com/lhqs/lhqs-site-nav"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>

            <Link
              href="/about"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              关于
            </Link>

            <ThemeToggle />
          </div>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-muted-foreground hover:text-foreground"
            >
              <svg
                className="w-5 h-5"
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
            </button>
          </div>
        </div>
      </nav>

      {isSearchOpen && <SearchBar onClose={() => setIsSearchOpen(false)} />}
    </header>
  );
}
