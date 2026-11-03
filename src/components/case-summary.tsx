import { useTranslation } from "react-i18next"
import { Card, CardContent } from "@/components/ui/card"

export interface CaseSummaryContent { problem: string; solution: string; impact: string }

/**
 * At-a-glance block for the top of a case study: problem, solution and impact in one line each,
 * so a reviewer scanning the page gets the case before reading the details.
 */
export function CaseSummary({ summary }: { summary: CaseSummaryContent }) {
  const { t } = useTranslation()
  const rows = [
    { label: t('case_summary.problem'), text: summary.problem },
    { label: t('case_summary.solution'), text: summary.solution },
    { label: t('case_summary.impact'), text: summary.impact, emphasis: true },
  ]

  return (
    <Card className="border-border/60 bg-[var(--surface)] shadow-none">
      <CardContent className="p-6 md:p-8">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-primary mb-5">{t('case_summary.title')}</h2>
        <dl className="grid gap-6 md:grid-cols-3">
          {rows.map((row) => (
            <div key={row.label}>
              <dt className="text-sm font-semibold mb-1.5">{row.label}</dt>
              <dd className={row.emphasis ? "text-sm leading-relaxed font-medium text-foreground" : "text-sm leading-relaxed text-muted-foreground"}>
                {row.text}
              </dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  )
}
