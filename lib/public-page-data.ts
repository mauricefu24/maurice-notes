import { ChartNoAxesColumn, Compass, Heart, Layers3, Link2, PenLine, ShieldCheck, Sparkles, UsersRound } from "lucide-react";

export const tableOfContents = [
  { id: "why-design-system", title: "为什么需要设计系统" },
  { id: "core-steps", title: "从 0 到 1：核心步骤" },
  { id: "language-definition", title: "设计语言定义" },
  { id: "implementation", title: "落地与持续迭代" },
  { id: "comments", title: "评论讨论" },
];

export const articleComments = [
  {
    name: "张小明",
    time: "2 小时前",
    body: "写得很清晰，尤其是把组件边界和设计规则分开讲的部分，对我现在的项目很有帮助。",
    likes: 12,
  },
  {
    name: "Lily",
    time: "5 小时前",
    body: "同意先建立命名和 token 体系，再推进组件化，否则越做越乱。",
    likes: 6,
  },
  {
    name: "Moon",
    time: "昨天 18:03",
    body: "期待后续能分享一篇关于设计系统治理和版本迭代的文章。",
    likes: 4,
  },
];

export const popularTags = ["前端开发", "产品设计", "用户体验", "设计系统", "增长", "效率工具", "知识管理", "AI 工具", "B 端设计", "个人成长"];

export const recommendedAuthors = [
  { name: "Maurice", role: "产品设计师 & 独立开发者", count: "128 篇文章" },
  { name: "Lily", role: "设计师 & 知识管理爱好者", count: "56 篇文章" },
  { name: "Moon", role: "前端工程师 & 技术博主", count: "44 篇文章" },
  { name: "张小明", role: "产品经理 & 思考者", count: "38 篇文章" },
];

export const archiveStats = [
  { label: "文章总数", value: "128" },
  { label: "分类数量", value: "6" },
  { label: "标签数量", value: "86" },
  { label: "累计阅读", value: "128.6K" },
];

export const archiveYears = [
  { year: "2024", count: 38 },
  { year: "2023", count: 32 },
  { year: "2022", count: 28 },
  { year: "2021", count: 18 },
  { year: "2020", count: 12 },
];

export const experience = [
  {
    years: "2013 - 2015",
    title: "起步与探索",
    body: "从计算机基础学习、参与校内项目开始，逐步建立对产品与技术的兴趣。",
  },
  {
    years: "2015 - 2018",
    title: "技术产品实践",
    body: "加入互联网公司，从一线产品与数据分析工作中理解真实业务和用户增长项目。",
  },
  {
    years: "2018 - 2021",
    title: "数字化转型深耕",
    body: "负责企业数字化项目，沉淀数据中台与协作系统的搭建经验。",
  },
  {
    years: "2021 - 2023",
    title: "团队与产品管理",
    body: "带领团队完成多个产品落地，建立产品方法论与用户价值评估机制。",
  },
  {
    years: "2023 - 至今",
    title: "持续创造与分享",
    body: "专注于 AI 时代的工具、内容与产品实践，持续输出文章与项目。",
  },
];

export const skillCards = [
  { title: "数字化转型", body: "从战略到落地，帮助企业构建数字化能力。", icon: Compass, tone: "bg-teal-50 text-teal-700" },
  { title: "数据分析与 BI", body: "擅长数据建模、可视化与指标体系设计。", icon: ChartNoAxesColumn, tone: "bg-blue-50 text-blue-700" },
  { title: "低代码与自动化", body: "使用低代码平台与自动化工具提升效率。", icon: Layers3, tone: "bg-amber-50 text-amber-700" },
  { title: "AI 应用探索", body: "关注大模型工具在产品、运营与内容创作中的实践。", icon: Sparkles, tone: "bg-violet-50 text-violet-700" },
  { title: "产品设计与管理", body: "从用户研究到产品迭代，打造可持续增长的体验。", icon: PenLine, tone: "bg-emerald-50 text-emerald-700" },
];

export const projects = [
  {
    title: "企业数据中台建设项目",
    category: "数据平台",
    year: "2022",
    body: "搭建统一数据中台，整合多源数据，支撑业务分析与决策。",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "经营分析看板系统",
    category: "BI 分析",
    year: "2021",
    body: "基于 BI 工具搭建经营分析看板，实现关键指标实时监控与洞察。",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "流程自动化平台",
    category: "低代码",
    year: "2021",
    body: "使用低代码平台搭建流程应用，提升审批与协作效率。",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "内容创作效率工具箱",
    category: "产品设计",
    year: "2023",
    body: "集合 AI 与自动化工具，提升内容创作与运营效率。",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
  },
];

export const values = [
  { title: "用户价值第一", body: "关注真实需求，创造长期价值。", icon: Heart },
  { title: "持续学习", body: "保持好奇，不断学习与实践。", icon: UsersRound },
  { title: "开放分享", body: "乐于分享经验，帮助他人成长。", icon: Link2 },
  { title: "长期主义", body: "专注长期价值，做真正重要的事。", icon: ShieldCheck },
];

export const aboutStats = [
  { label: "发布文章", value: "128+" },
  { label: "订阅读者", value: "3.2K+" },
  { label: "个人项目", value: "18+" },
  { label: "主题分享", value: "12+" },
  { label: "行业经验", value: "10+" },
];

export const aboutFaqs = [
  { question: "你主要写什么内容？", answer: "产品、技术、数字化转型、数据分析、AI 应用与个人成长。" },
  { question: "如何订阅你的文章？", answer: "可以在首页订阅我的周刊，也可以关注我的社交媒体账号。" },
  { question: "是否接受访谈或合作？", answer: "是的，欢迎通过邮箱或社交账号联系我，进一步交流。" },
];

export const aboutContact = [
  "hello@mauricenotes.com",
  "Maurice Notes",
  "@mauricenotes",
  "MauriceNotes",
  "深圳，中国",
];

export const codeSample = `const designSystem = {
  color: {
    primary: "#008577",
    success: "#22c55e",
    warning: "#f59e0b",
    danger: "#ef4444",
  },
  radius: 8,
  spacing: 4,
};`;

export const categoryTabs = ["全部", "技术", "产品", "设计", "生活", "AI"];
