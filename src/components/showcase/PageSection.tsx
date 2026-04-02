type Props = {
  id?: string
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}

export function PageSection({ id, title, subtitle, children, className }: Props) {
  return (
    <section id={id} aria-labelledby={`${id ?? title}-title`} className={`showcaseSection ${className ?? ''}`.trim()}>
      <header className="sectionHeader">
        <h2 id={`${id ?? title}-title`} className="sectionTitle">
          {title}
        </h2>
        {subtitle ? <p className="sectionSubtitle mb-0">{subtitle}</p> : null}
      </header>
      {children}
    </section>
  )
}

