type PageHeadingProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageHeading({ eyebrow, title, description }: PageHeadingProps) {
  return (
    <div className="space-y-3">
      {eyebrow ? <p className="text-sm font-medium text-note-teal">{eyebrow}</p> : null}
      <div className="max-w-3xl space-y-3">
        <h1 className="text-4xl font-semibold tracking-normal text-note-ink md:text-5xl">{title}</h1>
        <p className="text-base leading-7 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
