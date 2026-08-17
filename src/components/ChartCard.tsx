import type { ReactNode } from 'react'

interface ChartCardProps { title: string; description: string; children: ReactNode }

export function ChartCard({ title, description, children }: ChartCardProps) {
  const headingId = title.replaceAll(' ', '-').toLowerCase()
  return <section className="chart-card" aria-labelledby={headingId}>
    <h2 id={headingId}>{title}</h2>
    <p className="chart-description">{description}</p>
    <div className="chart-area">{children}</div>
  </section>
}
