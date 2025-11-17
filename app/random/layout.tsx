import { Metadata } from "next";

export const metadata: Metadata = {
  title: "任意门",
  description: "随机探索精选网站，发现新的可能。从3000+优质网址中随机推荐，让您偶遇惊喜，拓展视野。",
  keywords: [
    "随机网站", "网站推荐", "随机探索", "网站发现", "任意门",
    "随机浏览", "网站抽取", "探索发现", "惊喜推荐"
  ],
  openGraph: {
    title: "任意门 - 随机探索 | 乱红如雨",
    description: "随机探索精选网站，发现新的可能。",
    url: "https://nav.ninthfeast.com/random",
  },
  alternates: {
    canonical: "https://nav.ninthfeast.com/random",
  },
};

export default function RandomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
