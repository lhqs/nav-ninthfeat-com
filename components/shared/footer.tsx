export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            <span itemProp="name">乱红如雨</span>个人导航站 |{" "}
            <a
              href="mailto:lhqs.gu@gmail.com"
              itemProp="email"
              className="hover:text-foreground transition-smooth"
            >
              lhqs.gu@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a
              href="https://github.com/lhqs/lhqs-site-nav"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-smooth"
            >
              开源代码
            </a>
            <a
              href="/feed.xml"
              className="hover:text-foreground transition-smooth"
            >
              RSS 订阅
            </a>
            <a
              href="/humans.txt"
              className="hover:text-foreground transition-smooth"
            >
              Humans.txt
            </a>
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-muted-foreground">
          <p>Built with Next.js · Powered by Vercel</p>
        </div>
      </div>
    </footer>
  );
}
