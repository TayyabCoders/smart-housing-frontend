'use client'

import { useState } from 'react'
import { Activity, AlertTriangle, Car, ScanFace, ShieldCheck, Upload, Users } from 'lucide-react'
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

type SurveillanceView = 'all' | 'live' | 'vehicle' | 'face' | 'alerts' | 'logs'

interface SurveillanceContainerProps {
  defaultView?: SurveillanceView
}

export default function SurveillanceContainer({ defaultView = 'all' }: SurveillanceContainerProps) {
  const t = useTranslations('surveillance')
  const [camera, setCamera] = useState('gate-1')
  const blacklistHits = alerts.filter((a) => a.kind === 'blacklist').length

  const faceBoxes: BoundingBox[] = [
    { id: 'b1', x: 38, y: 20, w: 22, h: 32, label: recentFaces[0].name, confidence: recentFaces[0].confidence, tone: 'success' },
    { id: 'b2', x: 12, y: 30, w: 16, h: 24, label: 'Unknown', confidence: 71, tone: 'danger' },
  ]

  const vehicleBoxes: BoundingBox[] = [
    { id: 'b1', x: 32, y: 55, w: 36, h: 14, label: recentVehicles[0].plate, confidence: recentVehicles[0].confidence, tone: 'success' },
  ]

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
        <StatCard label={t('stats.vehiclesToday')} value="248" hint="+12 vs yesterday" icon={Car} tone="success" />
        <StatCard label={t('stats.facesVerified')} value="412" hint="98.6% match rate" icon={ScanFace} tone="success" />
        <StatCard label={t('stats.activeVisitors')} value="17" hint="3 awaiting approval" icon={Users} tone="warning" />
        <StatCard label={t('stats.alerts24h')} value={alerts.length} hint={`${blacklistHits} blacklist hit`} icon={AlertTriangle} tone="danger" />
      </div>

      {/* Content based on view */}
      {defaultView === 'all' && <AllTab t={t} />}
      {defaultView === 'live' && <LiveTab cameras={cameras} t={t} />}
      {defaultView === 'vehicle' && <VehicleTab camera={camera} setCamera={setCamera} boxes={vehicleBoxes} cameras={cameras} t={t} />}
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

function VehicleTab({ camera, setCamera, boxes, cameras, t }: { camera: string; setCamera: (v: string) => void; boxes: BoundingBox[]; cameras: any[]; t: any }) {
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

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label={t('stats.detectedToday')} value="248" tone="success" />
        <StatCard label={t('stats.residents')} value="186" />
        <StatCard label={t('stats.visitors')} value="54" tone="warning" />
        <StatCard label={t('stats.blacklistHits')} value="3" tone="danger" />
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
                boxes={boxes}
                mode="plate"
              />
            </div>
            <VehicleDetectionPanel t={t} />
          </div>
        </TabsContent>

        <TabsContent value="upload" className="mt-4">
          <VehicleUploadPane t={t} />
        </TabsContent>
      </Tabs>

      <section className="rounded-xl border border-border bg-card/50 p-5">
        <header className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">{t('vehicle.recentEntries')}</h2>
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
  const kindMeta: Record<string, any> = {
    blacklist: { icon: ShieldCheck, tone: 'danger', label: t('alerts.blacklist') },
    unknown: { icon: AlertTriangle, tone: 'warning', label: t('alerts.unknown') },
    tailgate: { icon: AlertTriangle, tone: 'warning', label: t('alerts.tailgate') },
    expired: { icon: Activity, tone: 'default', label: t('alerts.expired') },
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{t('overview.title')}</p>
        <h1 className="mt-1 text-2xl font-semibold">{t('alerts.title')}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t('alerts.subtitle')}</p>
      </header>

      <ul className="space-y-3">
        {alerts.map((a) => {
          const m = kindMeta[a.kind]
          const Icon = m.icon
          const ring = a.severity === 'high'
            ? 'border-red-500/40 bg-red-500/5'
            : a.severity === 'medium'
              ? 'border-yellow-500/40 bg-yellow-500/5'
              : 'border-border bg-card/50'
          return (
            <li key={a.id} className={`flex items-start gap-4 rounded-xl border p-4 ${ring}`}>
              <div className={`flex h-10 w-10 items-center justify-center rounded-md ${
                a.severity === 'high' ? 'bg-red-500/20 text-red-500'
                : a.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-500'
                : 'bg-muted text-muted-foreground'
              }`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] uppercase tracking-widest">{m.label}</Badge>
                  <span className="font-mono text-xs text-muted-foreground">{a.camera} · {a.time}</span>
                </div>
                <h3 className="mt-1 font-semibold">{a.title}</h3>
                <p className="text-sm text-muted-foreground">{a.description}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Button size="sm" variant="outline">{t('alerts.review')}</Button>
                <Button size="sm" variant="ghost">{t('alerts.dismiss')}</Button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function LogsTab({ t }: { t: any }) {
  const statusStyles: Record<string, string> = {
    resident: 'border-green-500/30 bg-green-500/15 text-green-500',
    staff: 'border-primary/30 bg-primary/15 text-primary',
    visitor: 'border-yellow-500/30 bg-yellow-500/15 text-yellow-500',
    blacklist: 'border-red-500/30 bg-red-500/15 text-red-500',
    unknown: 'border-border bg-muted text-muted-foreground',
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{t('overview.title')}</p>
        <h1 className="mt-1 text-2xl font-semibold">{t('logs.title')}</h1>
      </header>

      <Tabs defaultValue="vehicles">
        <TabsList>
          <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
          <TabsTrigger value="faces">Faces</TabsTrigger>
        </TabsList>

        <TabsContent value="vehicles" className="mt-4">
          <Table
            headers={['Plate', 'Owner', 'Type', 'Camera', 'Time', 'Confidence', 'Status']}
            rows={recentVehicles.map((v) => [
              <span className="font-mono font-semibold">{v.plate}</span>,
              v.owner,
              v.vehicleType,
              v.camera,
              v.time,
              `${v.confidence}%`,
              <Badge variant="outline" className={statusStyles[v.status]}>{v.status}</Badge>,
            ])}
          />
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
              <Badge variant="outline" className={statusStyles[f.status]}>{f.status}</Badge>,
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

interface ModuleCardProps {
  title: string
  subtitle: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  accent: 'success' | 'primary' | 'danger'
}

function ModuleCard({ title, subtitle, description, icon: Icon, accent }: ModuleCardProps) {
  const ring = {
    success: 'hover:ring-green-500/40 hover:shadow-[0_0_24px_-8px_rgba(34,197,94,0.5)]',
    primary: 'hover:ring-primary/40 hover:shadow-[0_0_24px_-8px_rgba(59,130,246,0.5)]',
    danger: 'hover:ring-red-500/40 hover:shadow-[0_0_24px_-8px_rgba(239,68,68,0.5)]',
  }[accent]
  const iconTone = {
    success: 'text-green-500 bg-green-500/15',
    primary: 'text-primary bg-primary/15',
    danger: 'text-red-500 bg-red-500/15',
  }[accent]

  return (
    <div className={`group flex flex-col rounded-xl border border-border bg-card p-5 ring-1 ring-border transition-all ${ring}`}>
      <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${iconTone}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{subtitle}</div>
      <div className="mt-1 text-lg font-semibold">{title}</div>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

function VehicleDetectionPanel({ t }: { t: any }) {
  const v = recentVehicles[0]
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-green-500/30 bg-green-500/5 p-5">
      <div className="flex items-center justify-between">
        <Badge className="bg-green-500 text-green-50">● {t('vehicle.detected')}</Badge>
        <span className="font-mono text-xs text-muted-foreground">{v.time}</span>
      </div>
      <div>
        <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{t('vehicle.plate')}</div>
        <div className="font-mono text-3xl font-bold tracking-widest">{v.plate}</div>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <Field label={t('vehicle.owner')} value={v.owner} />
        <Field label={t('vehicle.flat')} value={v.flat ?? '—'} />
        <Field label={t('vehicle.type')} value={v.vehicleType} />
        <Field label={t('vehicle.camera')} value={v.camera} />
      </div>
      <div className="flex items-center justify-between rounded-lg bg-card/60 p-3">
        <span className="text-xs text-muted-foreground">{t('vehicle.matchConfidence')}</span>
        <span className="font-mono text-lg font-semibold text-green-500">{v.confidence}%</span>
      </div>
      <div className="flex gap-2">
        <Button className="flex-1" onClick={() => toast.success(t('common.gateOpened'))}>
          {t('vehicle.openGate')}
        </Button>
        <Button variant="destructive" className="flex-1" onClick={() => toast.error(t('common.entryBlocked'))}>
          {t('vehicle.block')}
        </Button>
      </div>
      <Button variant="outline" onClick={() => toast(t('common.visitorLogged'))}>
        {t('vehicle.markAsVisitor')}
      </Button>
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

function VehicleUploadPane({ t }: { t: any }) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const onFile = (f: File | null) => {
    setFile(f)
    setPreview(f ? URL.createObjectURL(f) : null)
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <label className="lg:col-span-2 flex aspect-video cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-card/40 text-center transition-colors hover:bg-card/70">
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
      <div className="space-y-3 rounded-xl border border-border bg-card/60 p-5">
        <div className="text-sm font-semibold">{t('vehicle.detectionResult')}</div>
        {file ? (
          <div className="space-y-2 text-sm">
            <Field label={t('vehicle.file')} value={file.name} />
            <Field label={t('vehicle.status')} value={t('vehicle.awaitingResponse')} />
            <Button className="w-full" onClick={() => toast(t('vehicle.sentToFastAPI'))}>{t('vehicle.runDetection')}</Button>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">{t('vehicle.uploadHint2')}</p>
        )}
      </div>
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
