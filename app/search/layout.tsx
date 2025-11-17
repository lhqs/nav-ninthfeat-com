import { Metadata } from "next";

export const metadata: Metadata = {
  title: "聚合搜索",
  description: "一次搜索，多个引擎。集成Google、百度、必应、DuckDuckGo等多个搜索引擎，帮助您高效获取信息，多维度对比搜索结果。",
  keywords: [
    "聚合搜索", "多引擎搜索", "搜索引擎", "Google搜索", "百度搜索",
    "必应搜索", "DuckDuckGo", "搜索工具", "信息检索", "搜索对比"
  ],
  openGraph: {
    title: "聚合搜索 | 乱红如雨",
    description: "一次搜索，多个引擎。集成多个主流搜索引擎，高效获取信息。",
    url: "https://nav.ninthfeast.com/search",
  },
  alternates: {
    canonical: "https://nav.ninthfeast.com/search",
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
