import { FileText, MessageSquare, Settings, Tags } from "lucide-react";

export const settingsTabs = ["基本信息", "外观主题", "导航菜单", "评论设置", "SEO 设置", "账号安全"];

export const featureToggles = [
  { label: "评论功能", description: "允许用户在文章下发表评论", enabled: true },
  { label: "邮件通知", description: "接收评论、留言等站内通知", enabled: true },
  { label: "隐私模式", description: "隐藏站点不被搜索引擎收录", enabled: false },
  { label: "用户注册", description: "允许用户注册并评论", enabled: true },
  { label: "数据统计", description: "启用站点访问数据统计", enabled: true },
];

export const sidebarNav = [
  { href: "/admin/dashboard", label: "仪表盘", icon: Settings },
  { href: "/admin/posts", label: "文章管理", icon: FileText },
  { href: "/admin/categories", label: "分类管理", icon: Tags },
  { href: "/admin/comments", label: "评论管理", icon: MessageSquare },
  { href: "/admin/settings", label: "设置", icon: Settings },
];
