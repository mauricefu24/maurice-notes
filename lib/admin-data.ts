import { BarChart3, Bell, BookOpen, CalendarCheck, Eye, FileCheck2, FileText, ImageIcon, MessageSquare, PencilLine, Settings, Tags, Trash2, Users } from "lucide-react";

export const adminMetrics = [
  { label: "全部文章", value: "128", delta: "较上周 +8", icon: FileText, tone: "bg-teal-50 text-teal-700" },
  { label: "已发布", value: "96", delta: "较上周 +6", icon: FileCheck2, tone: "bg-emerald-50 text-emerald-700" },
  { label: "草稿", value: "20", delta: "较上周 +2", icon: PencilLine, tone: "bg-orange-50 text-orange-700" },
  { label: "审核中", value: "12", delta: "较上周 0", icon: CalendarCheck, tone: "bg-amber-50 text-amber-700" },
  { label: "总浏览量", value: "128.6K", delta: "较上周 +13.41%", icon: Eye, tone: "bg-blue-50 text-blue-700" },
  { label: "总评论数", value: "1,245", delta: "较上周 +9.51%", icon: MessageSquare, tone: "bg-violet-50 text-violet-700" },
];

export const dashboardMetrics = [
  { label: "总文章数", value: "128", delta: "+6.67%", icon: FileText, tone: "bg-teal-50 text-teal-700" },
  { label: "总浏览量", value: "128.6K", delta: "+13.41%", icon: Eye, tone: "bg-blue-50 text-blue-700" },
  { label: "评论数", value: "1,245", delta: "+9.51%", icon: MessageSquare, tone: "bg-orange-50 text-orange-700" },
  { label: "订阅人数", value: "3.2K", delta: "+5.12%", icon: Users, tone: "bg-violet-50 text-violet-700" },
];

export const trafficData = [
  { day: "05-06", views: 14, visitors: 4 },
  { day: "05-07", views: 33, visitors: 12 },
  { day: "05-08", views: 25, visitors: 8 },
  { day: "05-09", views: 30, visitors: 10 },
  { day: "05-10", views: 28, visitors: 9 },
  { day: "05-11", views: 26, visitors: 8 },
  { day: "05-12", views: 31, visitors: 11 },
];

export const categoryDistribution = [
  { label: "技术", value: 56, percent: "43.8%", color: "bg-note-teal" },
  { label: "产品", value: 32, percent: "25.0%", color: "bg-blue-500" },
  { label: "设计", value: 28, percent: "21.9%", color: "bg-orange-400" },
  { label: "生活", value: 24, percent: "18.8%", color: "bg-amber-500" },
  { label: "AI", value: 18, percent: "14.1%", color: "bg-violet-500" },
];

export const quickActions = [
  { label: "新建文章", icon: FileText, href: "/admin/posts/new" },
  { label: "新建页面", icon: BookOpen, href: "/admin/posts/new" },
  { label: "上传媒体", icon: ImageIcon, href: "/admin/settings" },
  { label: "管理分类", icon: Tags, href: "/admin/categories" },
  { label: "查看评论", icon: MessageSquare, href: "/admin/comments" },
  { label: "数据分析", icon: BarChart3, href: "/admin/dashboard" },
];

export const adminTasks = [
  { title: "审核 12 条待审评论", priority: "高优先级", due: "12", status: "待处理" },
  { title: "发布周报文章", priority: "中优先级", due: "明天截止", status: "待处理" },
  { title: "更新网站 SEO 设置", priority: "中优先级", due: "进行中", status: "进行中" },
  { title: "备份网站数据", priority: "低优先级", due: "2 天后", status: "计划中" },
];

export const contentHealth = [
  { label: "平均阅读时长", value: "6 分 24 秒", delta: "+12.5%" },
  { label: "平均读完率", value: "68.3%", delta: "+8.3%" },
  { label: "跳出率", value: "34.2%", delta: "-5.7%" },
];

export const commentOverview = [
  { label: "总评论数", value: "1,245", icon: MessageSquare, tone: "bg-blue-50 text-blue-700" },
  { label: "待审核", value: "156", icon: Bell, tone: "bg-orange-50 text-orange-700" },
  { label: "已通过", value: "982", icon: FileCheck2, tone: "bg-emerald-50 text-emerald-700" },
  { label: "垃圾评论", value: "67", icon: Trash2, tone: "bg-rose-50 text-rose-700" },
];

export const commentsQueue = [
  {
    id: "c1",
    author: "张小明",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    body: "这篇文章内容很有深度，尤其是关于性能优化的部分，受益匪浅！期待更多技术干货。",
    post: "2024 前端性能优化清单（实战版）",
    status: "待审核",
    time: "2 小时前",
    flagged: false,
  },
  {
    id: "c2",
    author: "Lily",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    body: "请问文章中提到的工具有推荐的学习资源吗？另外有没有关于设计系统的实战案例分享？",
    post: "设计系统落地的关键：从规则到组件",
    status: "待审核",
    time: "5 小时前",
    flagged: false,
  },
  {
    id: "c3",
    author: "程序员老张",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    body: "写得非常实用，已经按这个流程优化项目，性能提升明显，感谢分享！",
    post: "如何建立一个高质量的知识管理系统",
    status: "已通过",
    time: "昨天 12:30",
    flagged: false,
  },
  {
    id: "c4",
    author: "SEO 大师 888",
    avatar: "",
    body: "非常棒的博客！想要快速提升网站排名的朋友加我微信：seo888，保证让你流量翻倍！",
    post: "B 端设计中的信息层级与视觉秩序",
    status: "垃圾评论",
    time: "昨天 20:15",
    flagged: true,
  },
  {
    id: "c5",
    author: "设计小白",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80",
    body: "配色方案那块太棒了，已经应用到我的项目中，效果很赞！求推荐更多配色工具。",
    post: "数字游民的效率工具箱（我的 12 个推荐）",
    status: "已通过",
    time: "2 天前",
    flagged: false,
  },
];

export const settingsTabs = ["基本信息", "外观主题", "导航菜单", "评论设置", "SEO 设置", "邮件订阅", "账号安全"];

export const featureToggles = [
  { label: "评论功能", description: "允许用户在文章下发表评论", enabled: true },
  { label: "邮件通知", description: "接收评论、留言等站内通知", enabled: true },
  { label: "邮件订阅", description: "允许用户订阅站点更新", enabled: true },
  { label: "隐私模式", description: "隐藏站点不被搜索引擎收录", enabled: false },
  { label: "用户注册", description: "允许用户注册并评论", enabled: true },
  { label: "数据统计", description: "启用站点访问数据统计", enabled: true },
];

export const editorCategories = [
  { title: "技术探索", body: "前端、后端、工具与工程化实践", icon: "⌘" },
  { title: "产品思考", body: "产品设计、增长与用户体验", icon: "◇" },
  { title: "设计美学", body: "UI/UX、设计系统与设计方法", icon: "✎" },
  { title: "生活记录", body: "生活感悟、效率工具与灵感随笔", icon: "♙" },
];

export const sidebarNav = [
  { href: "/admin/dashboard", label: "仪表盘", icon: Settings },
  { href: "/admin/posts", label: "文章管理", icon: FileText },
  { href: "/admin/categories", label: "分类管理", icon: Tags },
  { href: "/admin/comments", label: "评论管理", icon: MessageSquare },
  { href: "/admin/settings", label: "设置", icon: Settings },
];
