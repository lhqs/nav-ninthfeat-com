# 乱红如雨的个人导航站

> 一个极简、现代的个人导航网站，基于 Next.js 14 构建

[![访问站点](https://img.shields.io/badge/访问-info.lhqs.ink-blue)](https://nav.ninthfeast.com/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC)](https://tailwindcss.com/)

## ✨ 特性

- 🏷️ **标签导航** - 基于多标签的网站分类系统，支持灵活筛选
- 🔍 **聚合搜索** - 整合多个搜索引擎，一键多平台搜索
- ⚡ **快速搜索** - ⌘K 快捷键唤起全文搜索，支持键盘导航
- 🎲 **任意门** - 随机发现精选网站
- 🌓 **主题切换** - 支持明亮/暗黑模式，默认明亮模式
- 📱 **响应式设计** - 完美适配桌面端和移动端
- 🚀 **性能优异** - 静态生成，极速加载
- 🎨 **现代 UI** - 玻璃拟态设计，流畅动画

## 🚀 快速开始

### 环境要求

- Node.js 18.x 或更高版本
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看效果

### 生产构建

```bash
npm run build
npm start
```

## 📁 项目结构

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局（包含主题配置）
│   ├── page.tsx           # 首页
│   ├── search/            # 聚合搜索页
│   ├── random/            # 随机发现页
│   ├── about/             # 关于页面
│   ├── sitemap.ts         # 站点地图
│   └── globals.css        # 全局样式（主题变量）
├── components/
│   ├── ui/                # UI 组件
│   │   ├── website-card.tsx
│   │   └── tag-filter.tsx
│   ├── shared/            # 共享组件
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── search-bar.tsx
│   ├── theme-provider.tsx # 主题提供者
│   └── theme-toggle.tsx   # 主题切换按钮
├── lib/                   # 工具库
│   ├── types.ts          # TypeScript 类型定义
│   ├── data.ts           # 数据加载
│   ├── search.ts         # 搜索功能
│   └── utils.ts          # 工具函数
├── data/                  # 数据文件
│   ├── websites.json     # 网站导航数据
│   └── search-engines.json  # 搜索引擎配置
└── public/               # 静态资源
```

## 📝 数据配置

### 网站导航数据

编辑 `data/websites.json` 添加网站：

```json
{
  "url": "https://github.com/trending",
  "title": "Github Trending",
  "tags": "技术 开源 github",
  "description": "发现热门开源项目"
}
```

**字段说明：**
- `url` - 网站地址（必填，需以 http:// 或 https:// 开头）
- `title` - 网站名称（必填）
- `tags` - 空格分隔的标签（必填）
- `description` - 网站描述（可选）

### 搜索引擎配置

编辑 `data/search-engines.json` 添加搜索引擎：

```json
{
  "tag": "常规搜索",
  "list": [
    {
      "title": "Google",
      "url": "https://www.google.com/search?q=${query}"
    }
  ]
}
```

使用 `${query}` 作为搜索关键词占位符。

## 🎨 技术栈

- **框架**: [Next.js 14](https://nextjs.org/) - React 框架
- **语言**: [TypeScript](https://www.typescriptlang.org/) - 类型安全
- **样式**: [Tailwind CSS](https://tailwindcss.com/) - 原子化 CSS
- **搜索**: [Fuse.js](https://fusejs.io/) - 模糊搜索
- **动画**: [Framer Motion](https://www.framer.com/motion/) - 流畅动画
- **主题**: [next-themes](https://github.com/pacocoursey/next-themes) - 主题切换

## 🎨 主题定制

主题颜色定义在 `app/globals.css` 中：

```css
:root {
  /* 明亮模式（默认） */
  --background: 0 0% 100%;
  --foreground: 0 0% 10%;
  --primary: 217 91% 60%;
  /* ... */
}

.dark {
  /* 暗黑模式 */
  --background: 0 0% 4%;
  --foreground: 0 0% 98%;
  /* ... */
}
```

## 🚢 部署

### Vercel（推荐）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Fork 本仓库
2. 在 Vercel 中导入项目
3. 自动部署完成

### 静态导出

如需部署到静态托管服务：

```bash
npm run build
```

构建产物在 `out` 目录中（需要在 `next.config.js` 中配置 `output: 'export'`）。

## 📄 License

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📧 联系方式

- Email: lhqs.gu@gmail.com
- GitHub: [@lhqs](https://github.com/lhqs)

---

Built with ❤️ using Next.js







