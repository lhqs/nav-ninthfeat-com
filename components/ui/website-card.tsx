"use client";

import type { WebsiteWithMetadata } from "@/lib/types";

interface WebsiteCardProps {
  website: WebsiteWithMetadata;
}

export function WebsiteCard({ website }: WebsiteCardProps) {
  const handleClick = () => {
    window.open(website.url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      className="w-full text-left glass rounded-lg p-4 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group"
    >
      <div className="flex items-start gap-3">
        {website.favicon ? (
          <img
            src={website.favicon}
            alt=""
            className="w-8 h-8 rounded flex-shrink-0"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground flex-shrink-0">
            {website.title[0]}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm truncate group-hover:text-blue-400 transition-colors">
            {website.title}
          </h3>
          <p className="text-xs text-muted-foreground truncate mt-0.5">
            {website.url.replace(/^https?:\/\//, '').split('/')[0]}
          </p>

          {website.description && (
            <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
              {website.description}
            </p>
          )}

          <div className="flex flex-wrap gap-1 mt-2">
            {website.tagArray.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-1.5 py-0.5 rounded-md bg-muted text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
            {website.tagArray.length > 3 && (
              <span className="text-[10px] text-muted-foreground">
                +{website.tagArray.length - 3}
              </span>
            )}
          </div>
        </div>

        <svg
          className="w-4 h-4 text-muted-foreground flex-shrink-0 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
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
      </div>
    </button>
  );
}
