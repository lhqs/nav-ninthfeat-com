import { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于",
  description: "了解乱红如雨个人导航站的设计理念、核心功能和技术栈。基于Next.js 14构建，提供标签导航、聚合搜索、全文搜索等功能。",
  keywords: [
    "关于", "项目介绍", "设计理念", "技术栈", "Next.js",
    "React", "TypeScript", "Tailwind CSS", "开源项目", "个人项目"
  ],
  openGraph: {
    title: "关于 | 乱红如雨",
    description: "了解乱红如雨个人导航站的设计理念与技术实现。",
    url: "https://nav.ninthfeast.com/about",
  },
  alternates: {
    canonical: "https://nav.ninthfeast.com/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
