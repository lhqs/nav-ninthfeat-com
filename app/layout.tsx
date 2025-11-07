import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";

export const metadata: Metadata = {
  title: {
    default: "乱红如雨 | 个人导航与聚合搜索",
    template: "%s | 乱红如雨",
  },
  description: "精选3000+优质网址，提供标签导航与聚合搜索功能，帮助您高效获取信息，解决书签管理难题。",
  keywords: ["导航", "搜索", "标签导航", "聚合搜索", "书签管理", "网址���藏", "技术导航"],
  authors: [{ name: "乱红如雨" }],
  creator: "乱红如雨",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://info.lhqs.ink",
    title: "乱红如雨 | 个人导航与聚合搜索 - 精选3000+优质网址",
    description: "精选3000+优质网址，提供标签导航与聚合搜索功能，帮助您高效获取信息。",
    siteName: "乱红如雨个人导航站",
    images: [
      {
        url: "https://static.lhqs.ink/site/nav/L.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "乱红如雨 | 个人导航与聚合搜索",
    description: "精选3000+优质网址，提供标签导航与聚合搜索功能。",
    images: ["https://static.lhqs.ink/site/nav/L.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "https://static.lhqs.ink/site/nav/L.png",
    apple: "https://static.lhqs.ink/site/nav/L.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark">
      <body className="antialiased">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
