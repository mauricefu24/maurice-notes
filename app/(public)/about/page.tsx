import { ArrowDownToLine, ArrowRight, Briefcase, Mail, MapPin, PenLine, UsersRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { BlockHeading, ContactLine, MetricTile, SurfaceCard, defaultContactIcons } from "@/components/public/page-blocks";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { aboutContact, aboutFaqs, aboutStats, experience, projects, skillCards, values } from "@/lib/public-page-data";

export default function AboutPage() {
  return (
    <div className="page-shell space-y-12 py-8">
      <section className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="space-y-7">
          <div className="flex items-center gap-7">
            <div className="relative h-36 w-36 overflow-hidden rounded-full border">
              <Image
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=360&q=80"
                alt="Maurice"
                fill
                priority
                className="object-cover"
                sizes="144px"
              />
            </div>
            <div>
              <h1 className="text-[44px] font-semibold tracking-normal text-note-ink">Maurice</h1>
              <p className="mt-2 text-xl font-medium text-slate-600">数字化经理 / 产品与技术实践者</p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" />深圳，中国</span>
                <span className="inline-flex items-center gap-2"><Mail className="h-4 w-4" />hello@mauricenotes.com</span>
                <span>10+ 年数字化与产品经验</span>
              </div>
            </div>
          </div>
          <p className="max-w-3xl text-base leading-8 text-slate-600">
            专注于用技术与产品驱动业务增长，擅长数字化转型、数据分析、产品设计与团队协作。在这个博客中，我记录思考、方法与实践，希望与更多同路人一起探索更大的世界。
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link href="/articles">查看我的文章 <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <ArrowDownToLine className="h-4 w-4" />
              下载我的简历
            </Button>
          </div>
        </div>
        <div className="relative h-[285px] overflow-hidden rounded-lg border border-slate-200">
          <Image
            src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80"
            alt=""
            fill
            className="object-cover"
            sizes="560px"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-teal-950/25" />
        </div>
      </section>

      <section className="space-y-6">
        <BlockHeading title="成长与经历" />
        <div className="grid gap-5 lg:grid-cols-5">
          {experience.map((item) => (
            <div key={item.years} className="relative border-t pt-7">
              <span className="absolute -top-3 left-0 grid h-6 w-6 place-items-center rounded-full bg-note-teal text-white">
                <Briefcase className="h-3.5 w-3.5" />
              </span>
              <p className="text-sm font-medium text-muted-foreground">{item.years}</p>
              <h3 className="mt-3 font-semibold text-note-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <BlockHeading title="专业领域" />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {skillCards.map((skill) => {
            const Icon = skill.icon;
            return (
              <SurfaceCard key={skill.title}>
                <CardContent className="space-y-4 p-5">
                  <div className={`grid h-12 w-12 place-items-center rounded-lg ${skill.tone}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-note-ink">{skill.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{skill.body}</p>
                  </div>
                </CardContent>
              </SurfaceCard>
            );
          })}
        </div>
      </section>

      <section className="space-y-6">
        <BlockHeading
          title="精选项目"
          action={<Link href="/articles" className="text-sm font-medium text-note-teal">查看全部项目 →</Link>}
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {projects.map((project) => (
            <SurfaceCard key={project.title} className="overflow-hidden transition hover:shadow-soft">
              <div className="relative h-36 bg-slate-100">
                <Image src={project.image} alt="" fill className="object-cover" sizes="280px" />
                <span className="absolute left-4 top-4 rounded-md bg-note-mint px-2 py-1 text-xs font-medium text-note-teal">
                  {project.category}
                </span>
              </div>
              <CardContent className="space-y-3 p-5">
                <h3 className="font-semibold text-note-ink">{project.title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">{project.body}</p>
                <p className="text-xs text-muted-foreground">{project.year} · {project.category}</p>
              </CardContent>
            </SurfaceCard>
          ))}
        </div>
      </section>

      <SurfaceCard>
        <CardContent className="grid gap-6 p-6 md:grid-cols-5">
          {aboutStats.map((stat, index) => (
            <MetricTile
              key={stat.label}
              value={stat.value}
              label={stat.label}
              icon={index % 2 ? <UsersRound className="h-5 w-5" /> : <PenLine className="h-5 w-5" />}
            />
          ))}
        </CardContent>
      </SurfaceCard>

      <section className="grid gap-6 lg:grid-cols-3">
        <SurfaceCard>
          <CardContent className="space-y-4 p-6">
            <BlockHeading title="联系我" description="欢迎交流与合作，一起探索产品、技术与数字化的更多可能。" />
            {aboutContact.map((item, index) => (
              <ContactLine
                key={item}
                text={item}
                icon={index === aboutContact.length - 1 ? defaultContactIcons.location : defaultContactIcons.mail}
              />
            ))}
          </CardContent>
        </SurfaceCard>
        <SurfaceCard>
          <CardContent className="space-y-5 p-6">
            <BlockHeading title="常见问题" />
            {aboutFaqs.map((faq) => (
              <div key={faq.question} className="border-b pb-4 last:border-b-0 last:pb-0">
                <p className="font-medium text-note-ink">{faq.question}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </CardContent>
        </SurfaceCard>
        <SurfaceCard>
          <CardContent className="space-y-5 p-6">
            <BlockHeading title="我的价值观" />
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="flex gap-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-note-mint text-note-teal">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-note-ink">{value.title}</p>
                    <p className="text-sm leading-6 text-muted-foreground">{value.body}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </SurfaceCard>
      </section>
    </div>
  );
}
