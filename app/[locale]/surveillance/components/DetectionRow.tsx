import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/tailwindUtils/utils'
import { Car, User } from 'lucide-react'

type Status = 'resident' | 'staff' | 'visitor' | 'blacklist' | 'unknown'

const statusStyles: Record<Status, string> = {
  resident: 'bg-green-500/15 text-green-500 border-green-500/30',
  staff: 'bg-primary/15 text-primary border-primary/30',
  visitor: 'bg-yellow-500/15 text-yellow-500 border-yellow-500/30',
  blacklist: 'bg-red-500/15 text-red-500 border-red-500/30',
  unknown: 'bg-muted text-muted-foreground border-border',
}

const statusLabel: Record<Status, string> = {
  resident: 'Allowed',
  staff: 'Staff',
  visitor: 'Visitor',
  blacklist: 'Blocked',
  unknown: 'Unknown',
}

interface DetectionRowProps {
  kind: 'vehicle' | 'face'
  primary: string
  secondary: string
  meta: string
  time: string
  camera: string
  confidence: number
  status: Status
}

export function DetectionRow({
  kind,
  primary,
  secondary,
  meta,
  time,
  camera,
  confidence,
  status,
}: DetectionRowProps) {
  const Icon = kind === 'vehicle' ? Car : User
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card/60 p-3 transition-colors hover:bg-accent/40">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate font-mono text-sm font-semibold">{primary}</span>
          <Badge variant="outline" className={cn('border', statusStyles[status])}>
            {statusLabel[status]}
          </Badge>
        </div>
        <div className="truncate text-xs text-muted-foreground">
          {secondary} · {meta}
        </div>
      </div>
      <div className="hidden text-right md:block">
        <div className="font-mono text-xs">{confidence}%</div>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">conf.</div>
      </div>
      <div className="text-right">
        <div className="font-mono text-xs">{time}</div>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{camera}</div>
      </div>
    </div>
  )
}
