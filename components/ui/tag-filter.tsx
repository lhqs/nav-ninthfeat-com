"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface TagFilterProps {
  tags: Array<{ tag: string; count: number }>;
}

export function TagFilter({ tags }: TagFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTag = searchParams.get("tag");

  const handleTagClick = (tag: string) => {
    if (activeTag === tag) {
      router.push("/");
    } else {
      router.push(`/?tag=${encodeURIComponent(tag)}`);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2">
        <button
          onClick={() => router.push("/")}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            !activeTag
              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
              : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
          }`}
        >
          全部
        </button>

        {tags.map(({ tag, count }) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTag === tag
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
            }`}
          >
            #{tag} <span className="text-xs opacity-70">{count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
