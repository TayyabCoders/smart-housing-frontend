'use client'

import { useState } from 'react'
import {
  Bike,
  Car,
  Check,
  Loader2,
  Plus,
  Shield,
  ShieldOff,
  Truck,
  UserCheck,
  Users,
  AlertCircle,
} from 'lucide-react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { registerVehicle } from '../lib/parking-api'

// ── Constants ──────────────────────────────────────────────────────────────────

const STATUS_OPTIONS = [
  {
    value: 'resident',
    label: 'Resident',
    desc: 'Permanent household member with approved vehicle',
    icon: UserCheck,
    color: 'text-green-500',
    ring: 'border-green-500 bg-green-500/10',
    headerBg: 'bg-green-500/5 border-green-500/20',
    btnClass: 'bg-green-600 hover:bg-green-700',
  },
  {
    value: 'visitor',
    label: 'Visitor',
    desc: 'Temporary guest with time-limited access',
    icon: Users,
    color: 'text-yellow-500',
    ring: 'border-yellow-500 bg-yellow-500/10',
    headerBg: 'bg-yellow-500/5 border-yellow-500/20',
    btnClass: 'bg-yellow-500 hover:bg-yellow-600 text-yellow-950',
  },
  {
    value: 'staff',
    label: 'Staff',
    desc: 'Society employee or service personnel',
    icon: Shield,
    color: 'text-blue-500',
    ring: 'border-blue-500 bg-blue-500/10',
    headerBg: 'bg-blue-500/5 border-blue-500/20',
    btnClass: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    value: 'blacklist',
    label: 'Blacklist',
    desc: 'Permanently denied — entry will be blocked',
    icon: ShieldOff,
    color: 'text-red-500',
    ring: 'border-red-500 bg-red-500/10',
    headerBg: 'bg-red-500/5 border-red-500/20',
    btnClass: 'bg-red-600 hover:bg-red-700',
  },
]

const VEHICLE_TYPES: { value: string; label: string; icon: React.ElementType }[] = [
  { value: 'Car',        label: 'Car',        icon: Car   },
  { value: 'SUV',        label: 'SUV',        icon: Car   },
  { value: 'Motorcycle', label: 'Motorcycle', icon: Bike  },
  { value: 'Van',        label: 'Van',        icon: Truck },
  { value: 'Truck',      label: 'Truck',      icon: Truck },
  { value: 'Pickup',     label: 'Pickup',     icon: Truck },
  { value: 'Other',      label: 'Other',      icon: Car   },
]

// ── Types ──────────────────────────────────────────────────────────────────────

interface Props {
  open: boolean
  onClose: () => void
  onSuccess?: () => void
}

const EMPTY = {
  plate_number: '',
  owner_name: '',
  flat_number: '',
  vehicle_type: 'Car',
  color: '',
  status: 'resident',
  notes: '',
}

// ── Component ──────────────────────────────────────────────────────────────────

export function RegisterVehicleDialog({ open, onClose, onSuccess }: Props) {
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = (key: keyof typeof EMPTY) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setError(null)
      setForm((f) => ({ ...f, [key]: e.target.value }))
    }

  const selectedStatus = STATUS_OPTIONS.find((s) => s.value === form.status)!

  const submit = async () => {
    setError(null)
    if (!form.plate_number.trim()) {
      setError('Plate number is required')
      return
    }
    if (!form.owner_name.trim()) {
      setError('Owner name is required')
      return
    }

    setSaving(true)
    try {
      const vehicle = await registerVehicle({
        plate_number: form.plate_number.toUpperCase().trim(),
        owner_name: form.owner_name.trim(),
        flat_number: form.flat_number.trim() || undefined,
        vehicle_type: form.vehicle_type,
        color: form.color.trim() || undefined,
        status: form.status,
        notes: form.notes.trim() || undefined,
      })
      toast.success(`${vehicle.plate_number} registered as ${selectedStatus.label}`)
      setForm(EMPTY)
      onSuccess?.()
      onClose()
    } catch (err: any) {
      const msg = err.message || 'Something went wrong'
      setError(msg)
      toast.error(msg)
    } finally {
      setSaving(false)
    }
  }

  const handleClose = () => {
    if (!saving) { setForm(EMPTY); setError(null); onClose() }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className="max-w-lg p-0 overflow-hidden gap-0">

        {/* Header — tinted by current status */}
        <div className={`px-6 pt-6 pb-5 border-b ${selectedStatus.headerBg} transition-colors duration-300`}>
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl border-2 ${selectedStatus.ring} transition-all duration-300`}>
                <Car className={`h-5 w-5 ${selectedStatus.color} transition-colors duration-300`} />
              </div>
              <div>
                <DialogTitle className="text-lg">Register Vehicle</DialogTitle>
                <DialogDescription className="text-xs mt-0.5">
                  Add to the society security registry
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        <div className="px-6 py-5 space-y-5 max-h-[60vh] overflow-y-auto">

          {/* Inline error banner */}
          {error && (
            <div className="flex items-start gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-500">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* ── Status tiles ── */}
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Access Status <span className="text-red-500">*</span>
            </Label>
            <div className="grid grid-cols-4 gap-2">
              {STATUS_OPTIONS.map((s) => {
                const Icon = s.icon
                const active = form.status === s.value
                return (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => { setError(null); setForm((f) => ({ ...f, status: s.value })) }}
                    className={`relative flex flex-col items-center gap-1.5 rounded-xl border-2 px-2 py-3 text-center transition-all duration-150 focus:outline-none ${
                      active
                        ? `${s.ring} shadow-md scale-[1.03]`
                        : 'border-border bg-card/20 hover:bg-card/50 hover:border-border/80'
                    }`}
                  >
                    {active && (
                      <span className={`absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full border ${s.ring}`}>
                        <Check className={`h-2.5 w-2.5 ${s.color}`} />
                      </span>
                    )}
                    <Icon className={`h-4 w-4 transition-colors ${active ? s.color : 'text-muted-foreground'}`} />
                    <span className={`text-[11px] font-semibold transition-colors ${active ? s.color : 'text-muted-foreground'}`}>
                      {s.label}
                    </span>
                  </button>
                )
              })}
            </div>
            <p className={`text-[11px] transition-colors duration-200 ${selectedStatus.color}`}>
              {selectedStatus.desc}
            </p>
          </div>

          <div className="h-px bg-border" />

          {/* ── Plate + Owner ── */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="plate" className="text-xs text-muted-foreground">
                Plate Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="plate"
                placeholder="BSL365"
                value={form.plate_number}
                onChange={(e) => {
                  setError(null)
                  setForm((f) => ({ ...f, plate_number: e.target.value.toUpperCase() }))
                }}
                className="font-mono tracking-widest font-bold text-base placeholder:font-normal placeholder:tracking-normal placeholder:text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="owner" className="text-xs text-muted-foreground">
                Owner Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="owner"
                placeholder="Ahmed Khan"
                value={form.owner_name}
                onChange={set('owner_name')}
              />
            </div>
          </div>

          {/* ── Flat + Vehicle Type ── */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="flat" className="text-xs text-muted-foreground">Flat No.</Label>
              <Input
                id="flat"
                placeholder="A-101"
                value={form.flat_number}
                onChange={set('flat_number')}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Vehicle Type</Label>
              <Select
                value={form.vehicle_type}
                onValueChange={(v) => setForm((f) => ({ ...f, vehicle_type: v }))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {VEHICLE_TYPES.map(({ value, label, icon: Icon }) => (
                    <SelectItem key={value} value={value}>
                      <span className="flex items-center gap-2">
                        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                        {label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* ── Color ── */}
          <div className="space-y-1.5">
            <Label htmlFor="color" className="text-xs text-muted-foreground">Color</Label>
            <Input
              id="color"
              placeholder="White, Black, Silver…"
              value={form.color}
              onChange={set('color')}
            />
          </div>

          {/* ── Notes ── */}
          <div className="space-y-1.5">
            <Label htmlFor="notes" className="text-xs text-muted-foreground">Notes</Label>
            <textarea
              id="notes"
              rows={2}
              placeholder="Optional remarks…"
              value={form.notes}
              onChange={set('notes')}
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] resize-none"
            />
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="px-6 pb-6 pt-4 border-t border-border flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={handleClose} disabled={saving}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={submit}
            disabled={saving || !form.plate_number.trim() || !form.owner_name.trim()}
            className={`gap-2 transition-colors duration-300 ${selectedStatus.btnClass}`}
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            {saving ? 'Registering…' : `Register as ${selectedStatus.label}`}
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  )
}
