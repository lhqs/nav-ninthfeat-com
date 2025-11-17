import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://nav.ninthfeast.com"),
  title: {
    default: "乱红如雨 | 个人导航与聚合搜索",
    template: "%s | 乱红如雨",
  },
  description: "精选3000+优质网址，提供标签导航与多引擎聚合搜索功能，帮助您高效获取信息，解决书签管理难题。支持全文搜索、标签筛选、随机探索。",
  keywords: [
    "导航网站", "聚合搜索", "标签导航", "书签管理", "网址收藏",
    "技术导航", "开发者导航", "设计导航", "AI工具", "效率工具",
    "在线工具", "学习资源", "开源项目", "乱红如雨", "lhqs"
  ],
  authors: [{ name: "lhqs", url: "https://nav.ninthfeast.com" }],
  creator: "lhqs",
  publisher: "lhqs",
  alternates: {
    canonical: "https://nav.ninthfeast.com",
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://nav.ninthfeast.com",
    title: "乱红如雨 | 个人导航与聚合搜索 - 精选3000+优质网址",
    description: "精选3000+优质网址，提供标签导航与多引擎聚合搜索功能，帮助您高效获取信息。支持全文搜索、标签筛选、随机探索。",
    siteName: "乱红如雨个人导航站",
    images: [
      {
        url: "https://static.lhqs.ink/site/nav/L.png",
        width: 1200,
        height: 630,
        alt: "乱红如雨导航站 - 精选优质网址导航",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "乱红如雨 | 个人导航与聚合搜索",
    description: "精选3000+优质网址，提供标签导航与聚合搜索功能。",
    images: ["https://static.lhqs.ink/site/nav/L.png"],
    creator: "@lhqs",
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
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "乱红如雨个人导航站",
              "alternateName": "lhqs导航",
              "url": "https://nav.ninthfeast.com",
              "description": "精选3000+优质网址，提供标签导航与多引擎聚合搜索功能",
              "author": {
                "@type": "Person",
                "name": "lhqs",
                "email": "lhqs.gu@gmail.com"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://nav.ninthfeast.com/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
