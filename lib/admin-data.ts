import { FileClock, FileText, LayoutDashboard, MessageSquare, Settings, Tags } from "lucide-react";

export const featureToggles = [
  { label: "评论提交", description: "访客可提交评论，进入后台审核", enabled: true },
  { label: "后台认证", description: "管理端需要密码登录", enabled: true },
  { label: "操作日志", description: "关键管理操作会写入审计日志", enabled: true },
  { label: "公开搜索", description: "前台支持按关键词查找文章", enabled: true },
  { label: "用户注册", description: "个人记录平台暂不开放注册", enabled: false },
];

export const sidebarNav = [
  { href: "/admin/dashboard", label: "仪表盘", icon: LayoutDashboard },
  { href: "/admin/posts", label: "文章管理", icon: FileText },
  { href: "/admin/categories", label: "分类管理", icon: Tags },
  { href: "/admin/comments", label: "评论管理", icon: MessageSquare },
  { href: "/admin/audit-logs", label: "操作日志", icon: FileClock },
  { href: "/admin/settings", label: "设置", icon: Settings },
];
