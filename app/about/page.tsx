import { getStats } from "@/lib/data";

export default function AboutPage() {
  const stats = getStats();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <span className="gradient-text">关于</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          一个极简的个人导航站点
        </p>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto space-y-8">
        {/* Introduction */}
        <div className="glass rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">项目介绍</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              这是一个个人访问站点的日常收集，现已收录
              <span className="text-primary font-semibold"> {stats.totalWebsites}+ </span>
              个精选网址，还在持续更新中。
            </p>
            <p>
              作为网上获取信息的一个起点，本站提供基于标签的站点导航和聚合搜索功能，
              旨在解决传统书签分类查找不便等问题。
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="glass rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">核心功能</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  1
                </span>
                标签导航
              </h3>
              <p className="text-muted-foreground ml-10">
                基于 tag 的站点导航，每个网站可以拥有多个标签，方便从不同维度查找。
                支持标签筛选和组合，让信息获取更加高效。
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  2
                </span>
                聚合搜索
              </h3>
              <p className="text-muted-foreground ml-10">
                聚合多个搜索渠道，支持 Google、百度、必应、DuckDuckGo 等多个搜索引擎，
                一次输入，多处搜索，方便信息获取和对比。
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  3
                </span>
                全文搜索
              </h3>
              <p className="text-muted-foreground ml-10">
                支持搜索网站标题、标签、描述等内容，使用 ⌘K 快捷键即可快速唤起搜索面板，
                支持键盘导航，提供流畅的搜索体验。
              </p>
            </div>
          </div>
        </div>

        {/* Design Philosophy */}
        <div className="glass rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">设计理念</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-muted/30">
              <h3 className="font-semibold mb-2">极简</h3>
              <p className="text-sm text-muted-foreground">
                简洁的界面设计，专注于内容本身，减少干扰
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <h3 className="font-semibold mb-2">轻量</h3>
              <p className="text-sm text-muted-foreground">
                静态生成，无服务依赖，加载速度快，性能优异
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <h3 className="font-semibold mb-2">数据分离</h3>
              <p className="text-sm text-muted-foreground">
                数据与视图分离，方便维护和扩展
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <h3 className="font-semibold mb-2">SEO 友好</h3>
              <p className="text-sm text-muted-foreground">
                静态生成，完善的元数据，利于搜索引擎收录
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="glass rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">技术栈</h2>
          <div className="flex flex-wrap gap-2">
            {["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Fuse.js", "Framer Motion"].map(
              (tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-full bg-muted text-sm font-medium"
                >
                  {tech}
                </span>
              )
            )}
          </div>
        </div>

        {/* Contact */}
        <div className="glass rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">联系方式</h2>
          <p className="text-muted-foreground mb-4">
            如有问题或建议，欢迎通过以下方式联系
          </p>
          <div className="flex items-center justify-center gap-6">
            <a
              href="mailto:lhqs.gu@gmail.com"
              className="text-primary hover:underline"
            >
              lhqs.gu@gmail.com
            </a>
            <span className="text-muted-foreground">·</span>
            <a
              href="https://github.com/lhqs/lhqs-site-nav"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
