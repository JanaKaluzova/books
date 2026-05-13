import type { FC } from 'react'

interface MetaItemProps {
  label: string
  value: string
}

export const MetaItem: FC<MetaItemProps> = ({ label, value }) => {
  return (
    <div className="rounded-xl bg-surface-50 p-3 border border-surface-200/60">
      <p className="text-xs text-text-muted">{label}</p>
      <p className="mt-0.5 text-sm font-semibold text-text-primary">{value}</p>
    </div>
  )
}
