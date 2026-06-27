import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/tailwindUtils/utils'

interface StatCardProps {
  label: string
  value: string | number
  hint?: string
  icon?: LucideIcon
  tone?: 'default' | 'success' | 'warning' | 'danger'
}

export function StatCard({ label, value, hint, icon: Icon, tone = 'default' }: StatCardProps) {
  const toneRing = {
    default: 'ring-border',
    success: 'ring-green-500/40',
    warning: 'ring-yellow-500/40',
    danger: 'ring-red-500/40',
  }[tone]
  const toneIcon = {
    default: 'text-muted-foreground',
    success: 'text-green-500',
    warning: 'text-yellow-500',
    danger: 'text-red-500',
  }[tone]

  return (
    <div className={cn('rounded-xl bg-card p-4 ring-1 transition-all hover:ring-2', toneRing)}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
        {Icon && <Icon className={cn('h-4 w-4', toneIcon)} />}
      </div>
      <div className="mt-2 font-mono text-3xl font-semibold tracking-tight">{value}</div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </div>
  )
}
