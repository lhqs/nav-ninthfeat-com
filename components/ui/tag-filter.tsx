"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState, useEffect } from "react";

interface TagFilterProps {
  popularTags: Array<{ tag: string; count: number }>;
  allTags: Array<{ tag: string; count: number }>;
  totalTags: number;
}

export function TagFilter({ popularTags, allTags, totalTags }: TagFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTag = searchParams.get("tag");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // 根据展开状态选择显示的标签列表
  const displayTags = isExpanded ? allTags : popularTags;

  const handleTagClick = (tag: string) => {
    if (activeTag === tag) {
      router.push("/");
    } else {
      router.push(`/?tag=${encodeURIComponent(tag)}`);
    }
  };

  const checkScroll = () => {
    if (!scrollContainerRef.current || isExpanded) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = 300;
    const newScrollLeft = direction === 'left'
      ? scrollContainerRef.current.scrollLeft - scrollAmount
      : scrollContainerRef.current.scrollLeft + scrollAmount;

    scrollContainerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  // 鼠标滚轮横向滚动
  const handleWheel = (e: React.WheelEvent) => {
    if (!scrollContainerRef.current || isExpanded) return;

    // 如果是横向滚动，直接使用
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      return;
    }

    // 将纵向滚动转换为横向滚动
    e.preventDefault();
    scrollContainerRef.current.scrollLeft += e.deltaY;
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [displayTags, isExpanded]);

  return (
    <div className="relative w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-muted-foreground">
          共 {totalTags} 个标签
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted rounded-full transition-all"
        >
          {isExpanded ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              收起
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              展开全部
            </>
          )}
        </button>
      </div>

      <div className="relative group">
        {/* 左箭头 - 只在非展开模式显示 */}
        {!isExpanded && showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg flex items-center justify-center hover:bg-background transition-all opacity-0 group-hover:opacity-100"
            aria-label="向左滚动"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* 右箭头 - 只在非展开模式显示 */}
        {!isExpanded && showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg flex items-center justify-center hover:bg-background transition-all opacity-0 group-hover:opacity-100"
            aria-label="向右滚动"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        <div className={`w-full ${isExpanded ? '' : 'overflow-hidden'}`}>
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            onWheel={handleWheel}
            className={`flex items-center gap-2 pb-2 transition-all duration-300 ${
              isExpanded
                ? 'flex-wrap'
                : 'overflow-x-auto scrollbar-hide'
            }`}
            style={isExpanded ? {} : { WebkitOverflowScrolling: 'touch' }}
          >
            <button
              onClick={() => router.push("/")}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                !activeTag
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
              }`}
            >
              全部
            </button>

            {displayTags.map(({ tag, count }) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeTag === tag
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                }`}
              >
                #{tag} <span className="text-xs opacity-70">{count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
