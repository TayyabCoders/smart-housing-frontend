'use client'

import { useState } from 'react'
import { Activity, AlertTriangle, Car, Loader2, ScanFace, ShieldCheck, Upload, Users } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button/button'
import { Badge } from '@/components/ui/badge'
import { StatCard } from './StatCard'
import { DetectionRow } from './DetectionRow'
import { LiveCameraFeed } from './LiveCameraFeed'
import { alerts, recentFaces, recentVehicles, cameras } from '../lib/mock-data'
import { BoundingBox } from '../types'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import {
  detectPlate,
  registerVehicle,
  updateVehicleStatus,
  grantAccess,
  denyAccess,
  DetectResult,
} from '../lib/parking-api'
import { useAccessLog } from '../hooks/useAccessLog'

type SurveillanceView = 'all' | 'live' | 'vehicle' | 'face' | 'alerts' | 'logs'

interface SurveillanceContainerProps {
  defaultView?: SurveillanceView
}

export default function SurveillanceContainer({ defaultView = 'all' }: SurveillanceContainerProps) {
  const t = useTranslations('surveillance')
  const [camera, setCamera] = useState('gate-1')
  const { stats: accessStats } = useAccessLog()

  const faceBoxes: BoundingBox[] = [
    { id: 'b1', x: 38, y: 20, w: 22, h: 32, label: recentFaces[0].name, confidence: recentFaces[0].confidence, tone: 'success' },
    { id: 'b2', x: 12, y: 30, w: 16, h: 24, label: 'Unknown', confidence: 71, tone: 'danger' },
  ]

  const totalAlerts = accessStats.blacklist_hits + accessStats.unknown

  return (
    <div className="h-full overflow-y-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            {t('header.societyName')} · {t('header.societyLocation')}
          </p>
          <h1 className="mt-1 text-3xl font-semibold">{t('header.title')}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t('header.subtitle')}
          </p>
        </div>
        <Badge variant="outline" className="border-green-500/40 bg-green-500/10 text-green-500">
          ● 4 {t('header.camerasStreaming')}
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label={t('stats.vehiclesToday')} value={String(accessStats.detected_today || '—')} hint="Live from backend" icon={Car} tone="success" />
        <StatCard label={t('stats.facesVerified')} value="412" hint="98.6% match rate" icon={ScanFace} tone="success" />
        <StatCard label={t('stats.activeVisitors')} value={String(accessStats.visitors)} hint="Registered today" icon={Users} tone="warning" />
        <StatCard label={t('stats.alerts24h')} value={totalAlerts} hint={`${accessStats.blacklist_hits} blacklist hit`} icon={AlertTriangle} tone="danger" />
      </div>

      {/* Content based on view */}
      {defaultView === 'all' && <AllTab t={t} />}
      {defaultView === 'live' && <LiveTab cameras={cameras} t={t} />}
      {defaultView === 'vehicle' && <VehicleTab camera={camera} setCamera={setCamera} cameras={cameras} t={t} />}
      {defaultView === 'face' && <FaceTab camera={camera} setCamera={setCamera} boxes={faceBoxes} cameras={cameras} t={t} />}
      {defaultView === 'alerts' && <AlertsTab t={t} />}
      {defaultView === 'logs' && <LogsTab t={t} />}
    </div>
  )
}

function AllTab({ t }: { t: any }) {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{t('overview.title')}</p>
        <h1 className="mt-1 flex items-center gap-2 text-2xl font-semibold">
          <Activity className="h-6 w-6 text-primary" />
          {t('overview.subtitle')}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Complete view of all surveillance data.</p>
      </header>

      {/* Combined Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Total Detections" value="660" tone="success" />
        <StatCard label="Vehicles" value="248" />
        <StatCard label="Faces" value="412" />
        <StatCard label="Alerts" value={alerts.length} tone="danger" />
      </div>

      {/* Recent Vehicles */}
      <section className="rounded-xl border border-border bg-card/50 p-5">
        <header className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">{t('overview.recentVehicles')}</h2>
        </header>
        <div className="space-y-2">
          {recentVehicles.map((v) => (
            <DetectionRow
              key={v.id}
              kind="vehicle"
              primary={v.plate}
              secondary={v.owner}
              meta={`${v.vehicleType}${v.flat ? ' · ' + v.flat : ''}`}
              time={v.time}
              camera={v.camera}
              confidence={v.confidence}
              status={v.status}
            />
          ))}
        </div>
      </section>

      {/* Recent Faces */}
      <section className="rounded-xl border border-border bg-card/50 p-5">
        <header className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">{t('overview.recentFaces')}</h2>
        </header>
        <div className="space-y-2">
          {recentFaces.map((f) => (
            <DetectionRow
              key={f.id}
              kind="face"
              primary={f.name}
              secondary={f.role}
              meta={f.flat ?? '—'}
              time={f.time}
              camera={f.camera}
              confidence={f.confidence}
              status={f.status}
            />
          ))}
        </div>
      </section>

      {/* All Alerts */}
      <section className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
        <header className="mb-3 flex items-center gap-2">
          <Activity className="h-4 w-4 text-red-500" />
          <h2 className="text-sm font-semibold uppercase tracking-widest text-red-500">{t('overview.recentAlerts')}</h2>
        </header>
        <ul className="space-y-2">
          {alerts.map((a) => (
            <li key={a.id} className="flex items-start gap-3 rounded-lg border border-border bg-card/60 p-3">
              <AlertTriangle className={`mt-0.5 h-4 w-4 ${a.severity === 'high' ? 'text-red-500' : a.severity === 'medium' ? 'text-yellow-500' : 'text-muted-foreground'}`} />
              <div className="flex-1">
                <div className="text-sm font-medium">{a.title}</div>
                <div className="text-xs text-muted-foreground">{a.description}</div>
              </div>
              <div className="text-right font-mono text-xs text-muted-foreground">
                <div>{a.time}</div>
                <div className="text-[10px] uppercase tracking-widest">{a.camera}</div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

function LiveTab({ cameras, t }: { cameras: any[]; t: any }) {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{t('overview.title')}</p>
        <h1 className="mt-1 text-2xl font-semibold">{t('live.title')} · {t('live.subtitle')}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t('live.subtitle2')}</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {cameras.map((c, i) => (
          <LiveCameraFeed
            key={c.id}
            cameraName={`${c.name} · CAM-${String(i + 1).padStart(2, '0')}`}
            mode={i % 2 === 0 ? 'plate' : 'face'}
          />
        ))}
      </div>
    </div>
  )
}

function VehicleTab({ camera, setCamera, cameras, t }: { camera: string; setCamera: (v: string) => void; cameras: any[]; t: any }) {
  const [detection, setDetection] = useState<DetectResult | null>(null)
  const [detecting, setDetecting] = useState(false)
  const { activity, stats, loading: activityLoading, error: activityError, refresh: refreshActivity } = useAccessLog()

  const handleCapture = async (blob: Blob) => {
    setDetecting(true)
    try {
      const res = await detectPlate(blob, 'live-capture.jpg')
      setDetection(res)
      if (res.detected) toast.success(`Plate detected: ${res.plate_number}`)
      else toast.warning('No plate detected — try re-framing the vehicle')
    } catch (e: any) {
      toast.error(e.message)
    } finally {
      setDetecting(false)
    }
  }

  const vehicleBoxes: BoundingBox[] = detection?.detected ? [
    {
      id: 'b1',
      x: 28,
      y: 48,
      w: 44,
      h: 18,
      label: detection.plate_number!,
      confidence: Math.round((detection.confidence ?? 0.92) * 100),
      tone: (detection.resident_status === 'blacklist' || detection.resident_status === 'unknown')
        ? 'danger'
        : 'success',
    },
  ] : []

  const ACTION_STYLE: Record<string, string> = {
    GRANTED: 'border-green-500/30 bg-green-500/15 text-green-500',
    DENIED: 'border-red-500/30 bg-red-500/15 text-red-500',
  }

  const STATUS_BADGE: Record<string, string> = {
    resident: 'border-green-500/40 text-green-500',
    visitor: 'border-yellow-500/40 text-yellow-500',
    staff: 'border-blue-500/40 text-blue-500',
    blacklist: 'border-red-500/40 text-red-500',
    unknown: 'border-muted-foreground/40 text-muted-foreground',
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{t('overview.title')}</p>
          <h1 className="mt-1 flex items-center gap-2 text-2xl font-semibold">
            <Car className="h-6 w-6 text-green-500" />
            {t('vehicle.title')}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={camera}
            onChange={(e) => setCamera(e.target.value)}
            className="w-44 px-3 py-2 rounded-md border border-border bg-background"
          >
            {cameras.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} · {c.location}
              </option>
            ))}
          </select>
          <Button onClick={() => toast(t('common.vehicleRegistrationComingSoon'))}>
            {t('vehicle.registerVehicle')}
          </Button>
        </div>
      </header>

      {/* Live stats from today's access log */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Detected Today" value={String(stats.detected_today)} tone="success" icon={Car} />
        <StatCard label="Residents" value={String(stats.residents)} />
        <StatCard label="Visitors" value={String(stats.visitors)} tone="warning" icon={Users} />
        <StatCard label="Blacklist Hits" value={String(stats.blacklist_hits)} tone="danger" icon={AlertTriangle} />
      </div>

      <Tabs defaultValue="live" className="w-full">
        <TabsList>
          <TabsTrigger value="live">{t('tabs.liveCamera')}</TabsTrigger>
          <TabsTrigger value="upload">{t('tabs.uploadImage')}</TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <LiveCameraFeed
                cameraName={`${cameras.find((c) => c.id === camera)?.name} · CAM-01`}
                boxes={vehicleBoxes}
                mode="plate"
                onCapture={handleCapture}
                capturing={detecting}
              />
            </div>
            <VehicleDetectionPanel
              detection={detection}
              detecting={detecting}
              onRefreshLogs={refreshActivity}
              t={t}
            />
          </div>
        </TabsContent>

        <TabsContent value="upload" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <VehicleUploadPane onDetected={setDetection} detecting={detecting} setDetecting={setDetecting} t={t} />
            </div>
            <VehicleDetectionPanel
              detection={detection}
              detecting={detecting}
              onRefreshLogs={refreshActivity}
              t={t}
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Recent Access Activity */}
      <section className="rounded-xl border border-border bg-card/50 p-5">
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Recent Activity</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">All gate access events — grants and denials</p>
          </div>
          <Button size="sm" variant="outline" onClick={refreshActivity} disabled={activityLoading}>
            {activityLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Refresh'}
          </Button>
        </header>

        {activityError && (
          <p className="mb-3 text-xs text-red-500">Backend unavailable: {activityError}</p>
        )}

        {activity.length === 0 && !activityLoading ? (
          <p className="py-4 text-center text-sm text-muted-foreground">
            No activity yet. Detect a vehicle and open the gate or block it.
          </p>
        ) : (
          <div className="space-y-2">
            {activity.map((log) => (
              <div
                key={log.id}
                className={`flex items-center gap-3 rounded-lg border px-4 py-3 ${ACTION_STYLE[log.action] ?? 'border-border bg-card/40'}`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono font-bold text-sm">{log.plate_number}</span>
                    <Badge variant="outline" className={`text-[10px] uppercase tracking-widest ${STATUS_BADGE[log.vehicle_status] ?? ''}`}>
                      {log.vehicle_status}
                    </Badge>
                    {log.owner_name && (
                      <span className="text-xs text-muted-foreground">{log.owner_name}{log.flat_no ? ` · ${log.flat_no}` : ''}</span>
                    )}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className={`text-xs font-semibold uppercase tracking-widest ${log.action === 'GRANTED' ? 'text-green-500' : 'text-red-500'}`}>
                    {log.action === 'GRANTED' ? '✓ Gate Opened' : '✗ Blocked'}
                  </div>
                  <div className="text-[10px] text-muted-foreground font-mono">
                    {new Date(log.accessed_at).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

function FaceTab({ camera, setCamera, boxes, cameras, t }: { camera: string; setCamera: (v: string) => void; boxes: BoundingBox[]; cameras: any[]; t: any }) {
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{t('overview.title')}</p>
          <h1 className="mt-1 flex items-center gap-2 text-2xl font-semibold">
            <ScanFace className="h-6 w-6 text-primary" />
            {t('face.title')}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={camera}
            onChange={(e) => setCamera(e.target.value)}
            className="w-44 px-3 py-2 rounded-md border border-border bg-background"
          >
            {cameras.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} · {c.location}
              </option>
            ))}
          </select>
          <Button onClick={() => toast(t('common.enrollingNewFace'))}>{t('face.enrollFace')}</Button>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label={t('stats.facesToday')} value="412" tone="success" />
        <StatCard label={t('stats.residents')} value="298" />
        <StatCard label={t('stats.unknown')} value="9" tone="warning" />
        <StatCard label={t('stats.watchlist')} value="2" tone="danger" />
      </div>

      <Tabs defaultValue="live" className="w-full">
        <TabsList>
          <TabsTrigger value="live">{t('tabs.liveCamera')}</TabsTrigger>
          <TabsTrigger value="upload">{t('tabs.uploadImage')}</TabsTrigger>
          <TabsTrigger value="watchlist">{t('tabs.watchlist')}</TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              <LiveCameraFeed
                cameraName={`${cameras.find((c) => c.id === camera)?.name} · CAM-FR`}
                boxes={boxes}
                mode="face"
              />
              <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4">
                <div className="flex items-center gap-2 text-red-500">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="font-semibold uppercase tracking-widest text-xs">{t('face.unknownDetected')}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t('face.unknownDesc')}
                </p>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline">{t('face.registerVisitor')}</Button>
                  <Button size="sm" variant="destructive">{t('face.denyEntry')}</Button>
                </div>
              </div>
            </div>
            <FaceIdentityPanel t={t} />
          </div>
        </TabsContent>

        <TabsContent value="upload" className="mt-4">
          <FaceUploadPane t={t} />
        </TabsContent>

        <TabsContent value="watchlist" className="mt-4">
          <Watchlist t={t} />
        </TabsContent>
      </Tabs>

      <section className="rounded-xl border border-border bg-card/50 p-5">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">{t('face.recentIdentifications')}</h2>
        <div className="space-y-2">
          {recentFaces.map((f) => (
            <DetectionRow
              key={f.id}
              kind="face"
              primary={f.name}
              secondary={f.role}
              meta={f.flat ?? '—'}
              time={f.time}
              camera={f.camera}
              confidence={f.confidence}
              status={f.status}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

function AlertsTab({ t }: { t: any }) {
  const { activity, loading, error, refresh } = useAccessLog()

  // Only blacklist and unknown detections are security alerts
  const securityAlerts = activity.filter(
    (log) => log.vehicle_status === 'blacklist' || log.vehicle_status === 'unknown',
  )

  const alertConfig: Record<string, {
    icon: React.ElementType
    label: string
    ring: string
    iconBg: string
    badgeClass: string
    title: () => string
    desc: (log: any) => string
  }> = {
    blacklist: {
      icon: ShieldCheck,
      label: 'BLACKLIST',
      ring: 'border-red-500/40 bg-red-500/5',
      iconBg: 'bg-red-500/20 text-red-500',
      badgeClass: 'border-red-500/40 text-red-500',
      title: () => `Blacklisted vehicle detected`,
      desc: (log) => `Plate ${log.plate_number} attempted entry · Access ${log.action === 'GRANTED' ? 'was granted' : 'DENIED'}`,
    },
    unknown: {
      icon: AlertTriangle,
      label: 'UNKNOWN',
      ring: 'border-yellow-500/40 bg-yellow-500/5',
      iconBg: 'bg-yellow-500/20 text-yellow-500',
      badgeClass: 'border-yellow-500/40 text-yellow-500',
      title: () => `Unknown vehicle detected`,
      desc: (log) => `Plate ${log.plate_number} is not registered in the system · Action: ${log.action}`,
    },
  }

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{t('overview.title')}</p>
          <h1 className="mt-1 text-2xl font-semibold">{t('alerts.title')}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Blacklisted and unknown vehicle detections from gate cameras.
          </p>
        </div>
        <Button size="sm" variant="outline" onClick={refresh} disabled={loading}>
          {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Refresh'}
        </Button>
      </header>

      {/* Summary chips */}
      <div className="flex gap-3 flex-wrap">
        <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm">
          <ShieldCheck className="h-4 w-4 text-red-500" />
          <span className="font-semibold text-red-500">{securityAlerts.filter(a => a.vehicle_status === 'blacklist').length}</span>
          <span className="text-muted-foreground">Blacklist hits</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm">
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
          <span className="font-semibold text-yellow-500">{securityAlerts.filter(a => a.vehicle_status === 'unknown').length}</span>
          <span className="text-muted-foreground">Unknown vehicles</span>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-500">
          Backend unavailable: {error}. Make sure the FastAPI server is running on port 8000.
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center p-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : securityAlerts.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-card/30 py-16 text-center">
          <ShieldCheck className="h-10 w-10 text-green-500" />
          <p className="font-semibold text-green-500">No Security Alerts</p>
          <p className="text-sm text-muted-foreground">All detected vehicles are registered residents, visitors, or staff.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {securityAlerts.map((log) => {
            const cfg = alertConfig[log.vehicle_status]
            if (!cfg) return null
            const Icon = cfg.icon
            return (
              <li key={log.id} className={`flex items-start gap-4 rounded-xl border p-4 ${cfg.ring}`}>
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${cfg.iconBg}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className={`text-[10px] uppercase tracking-widest ${cfg.badgeClass}`}>
                      {cfg.label}
                    </Badge>
                    <span className="font-mono text-xs text-muted-foreground">
                      Gate Camera · {new Date(log.accessed_at).toLocaleTimeString()}
                    </span>
                    <span className={`text-[10px] font-semibold uppercase tracking-widest ${log.action === 'DENIED' ? 'text-red-500' : 'text-green-500'}`}>
                      {log.action}
                    </span>
                  </div>
                  <h3 className="mt-1 font-semibold">
                    {cfg.title()} — <span className="font-mono">{log.plate_number}</span>
                  </h3>
                  <p className="text-sm text-muted-foreground">{cfg.desc(log)}</p>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

function LogsTab({ t }: { t: any }) {
  const { activity, stats, loading, error, refresh } = useAccessLog()

  const actionStyle: Record<string, string> = {
    GRANTED: 'border-green-500/30 bg-green-500/15 text-green-500',
    DENIED: 'border-red-500/30 bg-red-500/15 text-red-500',
  }

  const statusStyle: Record<string, string> = {
    resident: 'border-green-500/30 bg-green-500/15 text-green-500',
    staff: 'border-blue-500/30 bg-blue-500/15 text-blue-500',
    visitor: 'border-yellow-500/30 bg-yellow-500/15 text-yellow-500',
    blacklist: 'border-red-500/30 bg-red-500/15 text-red-500',
    unknown: 'border-border bg-muted text-muted-foreground',
  }

  const faceStatusStyles: Record<string, string> = {
    resident: 'border-green-500/30 bg-green-500/15 text-green-500',
    staff: 'border-primary/30 bg-primary/15 text-primary',
    visitor: 'border-yellow-500/30 bg-yellow-500/15 text-yellow-500',
    blacklist: 'border-red-500/30 bg-red-500/15 text-red-500',
    unknown: 'border-border bg-muted text-muted-foreground',
  }

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{t('overview.title')}</p>
          <h1 className="mt-1 text-2xl font-semibold">{t('logs.title')}</h1>
        </div>
        <Button size="sm" variant="outline" onClick={() => refresh()} disabled={loading}>
          {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Refresh'}
        </Button>
      </header>

      {/* Today summary */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {[
          { label: 'Total Today', value: stats.detected_today },
          { label: 'Residents', value: stats.residents },
          { label: 'Visitors', value: stats.visitors },
          { label: 'Staff', value: stats.staff },
          { label: 'Blacklist Hits', value: stats.blacklist_hits },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-lg border border-border bg-card/40 px-4 py-3 text-center">
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{label}</div>
            <div className="mt-1 text-2xl font-bold">{value}</div>
          </div>
        ))}
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-500">
          Backend unavailable: {error}. Make sure the FastAPI server is running on port 8000.
        </div>
      )}

      <Tabs defaultValue="access">
        <TabsList>
          <TabsTrigger value="access">Access Log ({activity.length})</TabsTrigger>
          <TabsTrigger value="faces">Faces</TabsTrigger>
        </TabsList>

        <TabsContent value="access" className="mt-4">
          {loading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : activity.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No access events yet. Use Vehicle Recognition to grant or deny entry.
            </p>
          ) : (
            <Table
              headers={['Plate', 'Status', 'Owner', 'Flat', 'Action', 'Time']}
              rows={activity.map((log) => [
                <span className="font-mono font-semibold">{log.plate_number}</span>,
                <Badge variant="outline" className={statusStyle[log.vehicle_status] ?? ''}>{log.vehicle_status}</Badge>,
                <span>{log.owner_name ?? '—'}</span>,
                <span>{log.flat_no ?? '—'}</span>,
                <Badge variant="outline" className={actionStyle[log.action] ?? ''}>
                  {log.action === 'GRANTED' ? '✓ Granted' : '✗ Denied'}
                </Badge>,
                new Date(log.accessed_at).toLocaleString(),
              ])}
            />
          )}
        </TabsContent>

        <TabsContent value="faces" className="mt-4">
          <Table
            headers={['Name', 'Role', 'Flat', 'Camera', 'Time', 'Confidence', 'Status']}
            rows={recentFaces.map((f) => [
              <span className="font-semibold">{f.name}</span>,
              f.role,
              f.flat ?? '—',
              f.camera,
              f.time,
              `${f.confidence}%`,
              <Badge variant="outline" className={faceStatusStyles[f.status]}>{f.status}</Badge>,
            ])}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function Table({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card/40">
      <table className="w-full text-sm">
        <thead className="bg-muted/40 text-[10px] uppercase tracking-widest text-muted-foreground">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-border hover:bg-accent/30">
              {r.map((cell, j) => (
                <td key={j} className="px-4 py-3 align-middle">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


const STATUS_CONFIG: Record<string, { label: string; badgeClass: string; panelClass: string; textClass: string }> = {
  resident: {
    label: 'RESIDENT',
    badgeClass: 'bg-green-500 text-green-50',
    panelClass: 'border-green-500/30 bg-green-500/5',
    textClass: 'text-green-500',
  },
  visitor: {
    label: 'VISITOR',
    badgeClass: 'bg-yellow-500 text-yellow-900',
    panelClass: 'border-yellow-500/30 bg-yellow-500/5',
    textClass: 'text-yellow-500',
  },
  staff: {
    label: 'STAFF',
    badgeClass: 'bg-blue-500 text-blue-50',
    panelClass: 'border-blue-500/30 bg-blue-500/5',
    textClass: 'text-blue-500',
  },
  blacklist: {
    label: 'BLACKLISTED',
    badgeClass: 'bg-red-600 text-red-50',
    panelClass: 'border-red-500/30 bg-red-500/5',
    textClass: 'text-red-500',
  },
  unknown: {
    label: 'UNKNOWN',
    badgeClass: 'bg-red-500 text-red-50',
    panelClass: 'border-red-500/30 bg-red-500/5',
    textClass: 'text-red-500',
  },
}

function VehicleDetectionPanel({
  detection,
  detecting,
  onRefreshLogs,
  t,
}: {
  detection: DetectResult | null
  detecting: boolean
  onRefreshLogs: () => void
  t: any
}) {
  const [recording, setRecording] = useState(false)
  const [actioning, setActioning] = useState(false)

  const handleOpenGate = async () => {
    if (!detection?.plate_number) return
    setRecording(true)
    try {
      await grantAccess({
        plate_number: detection.plate_number,
        vehicle_status: detection.resident_status ?? 'unknown',
        owner_name: detection.owner_name,
        flat_no: detection.flat_number,
        snapshot_url: detection.snapshot_url,
      })
      toast.success(`Gate opened for ${detection.plate_number}`)
      onRefreshLogs()
    } catch (e: any) {
      toast.error(e.message)
    } finally {
      setRecording(false)
    }
  }

  const handleMarkAsVisitor = async () => {
    if (!detection?.plate_number) return
    setActioning(true)
    try {
      await registerVehicle({ plate_number: detection.plate_number, owner_name: 'Visitor', status: 'visitor' })
      await grantAccess({
        plate_number: detection.plate_number,
        vehicle_status: 'visitor',
        snapshot_url: detection.snapshot_url,
      })
      toast.success(`${detection.plate_number} registered as Visitor · Gate opened`)
      onRefreshLogs()
    } catch (e: any) {
      toast.error(e.message)
    } finally {
      setActioning(false)
    }
  }

  const handleBlock = async () => {
    if (!detection?.plate_number) return
    setActioning(true)
    try {
      const currentStatus = detection.resident_status
      if (currentStatus && currentStatus !== 'unknown') {
        await updateVehicleStatus(detection.plate_number, 'blacklist')
      } else {
        await registerVehicle({ plate_number: detection.plate_number, owner_name: 'Unknown', status: 'blacklist' })
      }
      await denyAccess({
        plate_number: detection.plate_number,
        vehicle_status: 'blacklist',
        snapshot_url: detection.snapshot_url,
      })
      toast.error(`${detection.plate_number} blocked · Entry denied`)
      onRefreshLogs()
    } catch (e: any) {
      toast.error(e.message)
    } finally {
      setActioning(false)
    }
  }

  const handleUnblock = async () => {
    if (!detection?.plate_number) return
    setActioning(true)
    try {
      await updateVehicleStatus(detection.plate_number, 'visitor')
      toast.success(`${detection.plate_number} unblocked → marked as Visitor`)
    } catch (e: any) {
      toast.error(e.message)
    } finally {
      setActioning(false)
    }
  }

  if (detecting) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card/50 p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Running YOLO detection…</p>
      </div>
    )
  }

  if (!detection || !detection.detected) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-card/30 p-8 text-center">
        <Car className="h-8 w-8 text-muted-foreground" />
        <p className="text-sm font-medium text-muted-foreground">Awaiting Detection</p>
        <p className="text-xs text-muted-foreground">
          {detection?.detected === false
            ? detection.message
            : 'Start camera and click "Capture & Detect", or upload an image.'}
        </p>
      </div>
    )
  }

  const residentStatus = detection.resident_status ?? 'unknown'
  const cfg = STATUS_CONFIG[residentStatus] ?? STATUS_CONFIG.unknown
  const confidence = Math.round((detection.confidence ?? 0.92) * 100)
  const isBlocked = residentStatus === 'blacklist'
  const isUnknown = residentStatus === 'unknown'
  const isKnown = !isBlocked && !isUnknown

  return (
    <div className={`flex flex-col gap-3 rounded-xl border p-5 ${cfg.panelClass}`}>
      <div className="flex items-center justify-between">
        <Badge className={cfg.badgeClass}>● {cfg.label}</Badge>
        <span className="font-mono text-xs text-muted-foreground">{new Date().toLocaleTimeString()}</span>
      </div>

      <div>
        <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{t('vehicle.plate')}</div>
        <div className="font-mono text-3xl font-bold tracking-widest">{detection.plate_number}</div>
      </div>

      {detection.owner_name && (
        <div className="grid grid-cols-2 gap-3 text-sm">
          <Field label="Owner" value={detection.owner_name} />
          {detection.flat_number && <Field label="Flat" value={detection.flat_number} />}
          {detection.vehicle_type && <Field label="Type" value={detection.vehicle_type} />}
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 text-sm">
        <Field label="Method" value="YOLOv10 + OCR" />
        <div className="flex items-center justify-between rounded-lg bg-card/60 px-3 py-2">
          <span className="text-xs text-muted-foreground">Confidence</span>
          <span className={`font-mono text-sm font-semibold ${cfg.textClass}`}>{confidence}%</span>
        </div>
      </div>

      {isBlocked && (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-500">
          ⛔ Entry Denied — Vehicle is Blacklisted
        </div>
      )}

      {!isBlocked && (
        <Button className="w-full" onClick={handleOpenGate} disabled={recording || actioning}>
          {recording ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : null}
          {t('vehicle.openGate')}
        </Button>
      )}

      {isUnknown && (
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 text-xs" onClick={handleMarkAsVisitor} disabled={actioning}>
            {actioning ? <Loader2 className="mr-1 h-3 w-3 animate-spin" /> : null}
            Mark as Visitor
          </Button>
          <Button variant="destructive" className="flex-1 text-xs" onClick={handleBlock} disabled={actioning}>
            Block
          </Button>
        </div>
      )}

      {isKnown && (
        <Button variant="destructive" size="sm" onClick={handleBlock} disabled={actioning}>
          {actioning ? <Loader2 className="mr-1 h-3 w-3 animate-spin" /> : null}
          Block this Vehicle
        </Button>
      )}

      {isBlocked && (
        <Button variant="outline" size="sm" onClick={handleUnblock} disabled={actioning}>
          {actioning ? <Loader2 className="mr-1 h-3 w-3 animate-spin" /> : null}
          Unblock Vehicle
        </Button>
      )}
    </div>
  )
}

function FaceIdentityPanel({ t }: { t: any }) {
  const f = recentFaces[0]
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-green-500/30 bg-green-500/5 p-5">
      <div className="flex items-center justify-between">
        <Badge className="bg-green-500 text-green-50">● {t('face.verified')}</Badge>
        <span className="font-mono text-xs text-muted-foreground">{f.time}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <ScanFace className="h-8 w-8 text-muted-foreground" />
        </div>
        <div>
          <div className="text-lg font-semibold">{f.name}</div>
          <div className="text-sm text-muted-foreground">{f.role} · {f.flat}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <Field label={t('vehicle.camera')} value={f.camera} />
        <Field label={t('vehicle.matchConfidence')} value={`${f.confidence}%`} />
      </div>
      <div className="flex gap-2">
        <Button className="flex-1" onClick={() => toast.success(t('common.accessGranted'))}>
          {t('face.allow')}
        </Button>
        <Button variant="destructive" className="flex-1" onClick={() => toast.error(t('common.accessDenied'))}>
          {t('face.deny')}
        </Button>
      </div>
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  )
}

function VehicleUploadPane({
  onDetected,
  detecting,
  setDetecting,
  t,
}: {
  onDetected: (r: DetectResult) => void
  detecting: boolean
  setDetecting: (v: boolean) => void
  t: any
}) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const onFile = (f: File | null) => {
    setFile(f)
    setPreview(f ? URL.createObjectURL(f) : null)
  }

  const runDetection = async () => {
    if (!file) return
    setDetecting(true)
    try {
      const res = await detectPlate(file, file.name)
      onDetected(res)
      if (res.detected) toast.success(`Detected: ${res.plate_number}`)
      else toast.warning('No plate detected in this image')
    } catch (e: any) {
      toast.error(e.message)
    } finally {
      setDetecting(false)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <label className="flex aspect-video cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-card/40 text-center transition-colors hover:bg-card/70">
        {preview ? (
          <img src={preview} alt="upload" className="h-full w-full rounded-lg object-contain" />
        ) : (
          <>
            <Upload className="h-8 w-8 text-muted-foreground" />
            <div className="text-sm">{t('vehicle.uploadTitle')}</div>
            <div className="text-xs text-muted-foreground">{t('vehicle.uploadHint')}</div>
          </>
        )}
        <input type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0] ?? null)} />
      </label>
      {file && (
        <Button className="w-full" onClick={runDetection} disabled={detecting}>
          {detecting ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : null}
          {detecting ? 'Detecting…' : t('vehicle.runDetection')}
        </Button>
      )}
    </div>
  )
}

function FaceUploadPane({ t }: { t: any }) {
  const [preview, setPreview] = useState<string | null>(null)
  return (
    <label className="flex aspect-video cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-card/40 text-center hover:bg-card/70">
      {preview ? (
        <img src={preview} alt="" className="h-full w-full rounded-lg object-contain" />
      ) : (
        <>
          <Upload className="h-8 w-8 text-muted-foreground" />
          <div className="text-sm">{t('face.uploadTitle')}</div>
          <div className="text-xs text-muted-foreground">{t('face.uploadHint')}</div>
        </>
      )}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          setPreview(f ? URL.createObjectURL(f) : null)
        }}
      />
    </label>
  )
}

function Watchlist({ t }: { t: any }) {
  const watch = recentFaces.filter((f) => f.status === 'blacklist')
  return (
    <div className="space-y-2 rounded-xl border border-red-500/30 bg-red-500/5 p-4">
      <h3 className="text-sm font-semibold uppercase tracking-widest text-red-500">{t('face.watchlistTitle')}</h3>
      {watch.length === 0 && <p className="text-sm text-muted-foreground">{t('face.noFlagged')}</p>}
      {watch.map((f) => (
        <DetectionRow
          key={f.id}
          kind="face"
          primary={f.name}
          secondary={f.role}
          meta={t('face.permanentlyDenied')}
          time={f.time}
          camera={f.camera}
          confidence={f.confidence}
          status={f.status}
        />
      ))}
    </div>
  )
}
