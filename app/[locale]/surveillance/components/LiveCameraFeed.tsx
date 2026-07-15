'use client'

import { useEffect, useRef, useState } from 'react'
import { Camera, CameraOff, Maximize2, Radio, Scan } from 'lucide-react'
import { Button } from '@/components/ui/button/button'
import { BoundingBox } from '../types'

interface LiveCameraFeedProps {
  title?: string
  cameraName?: string
  boxes?: BoundingBox[]
  mode?: 'plate' | 'face'
  onCapture?: (blob: Blob) => void
  capturing?: boolean
}

export function LiveCameraFeed({
  title = 'Live Camera Feed',
  cameraName = 'Main Gate · CAM-01',
  boxes = [],
  mode = 'plate',
  onCapture,
  capturing = false,
}: LiveCameraFeedProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const start = async () => {
    setError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
      setStreaming(true)
    } catch (e) {
      setError('Camera unavailable. Showing simulated feed.')
      setStreaming(true)
    }
  }

  const stop = () => {
    const stream = videoRef.current?.srcObject as MediaStream | null
    stream?.getTracks().forEach((t) => t.stop())
    if (videoRef.current) videoRef.current.srcObject = null
    setStreaming(false)
  }

  const capture = () => {
    if (!videoRef.current || !onCapture) return
    const video = videoRef.current
    const canvas = canvasRef.current || document.createElement('canvas')
    canvas.width = video.videoWidth || 640
    canvas.height = video.videoHeight || 480
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    canvas.toBlob((blob) => {
      if (blob) onCapture(blob)
    }, 'image/jpeg', 0.92)
  }

  useEffect(() => {
    return () => stop()
  }, [])

  const toneColor = (t: BoundingBox['tone']) =>
    t === 'success'
      ? 'border-green-500 shadow-[0_0_18px_-2px_rgba(34,197,94,0.7)]'
      : t === 'danger'
        ? 'border-red-500 shadow-[0_0_18px_-2px_rgba(239,68,68,0.7)]'
        : 'border-yellow-500 shadow-[0_0_18px_-2px_rgba(234,179,8,0.7)]'

  const toneText = (t: BoundingBox['tone']) =>
    t === 'success' ? 'bg-green-500 text-green-50'
      : t === 'danger' ? 'bg-red-500 text-red-50'
        : 'bg-yellow-500 text-yellow-50'

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-black/60">
      {/* Hidden canvas for frame capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Header bar */}
      <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-3 py-2 text-xs">
        <div className="flex items-center gap-2 rounded-md bg-black/50 px-2 py-1 backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
          </span>
          <span className="font-mono uppercase tracking-widest text-white/90">LIVE</span>
          <span className="text-white/50">·</span>
          <span className="text-white/80">{cameraName}</span>
        </div>
        <div className="flex items-center gap-2 rounded-md bg-black/50 px-2 py-1 font-mono text-white/70 backdrop-blur">
          <Radio className="h-3 w-3" />
          {mode === 'plate' ? 'ALPR · YOLOv10' : 'Face Recognition · ArcFace'}
        </div>
      </div>

      {/* Video / placeholder */}
      <div className="relative aspect-video w-full">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          muted
          playsInline
        />
        {!streaming && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_center,#1e293b,#0f172a)]">
            <div className="rounded-full border border-border bg-card/60 p-4">
              <Camera className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <Button size="sm" variant="default" onClick={start}>
              Start Camera
            </Button>
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>
        )}

        {/* scan line */}
        {streaming && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-b from-primary/70 to-transparent animate-[scan_2s_linear_infinite]" />
          </div>
        )}

        {/* corner brackets */}
        <CornerBrackets />

        {/* bounding boxes */}
        {streaming && boxes.map((b) => (
          <div
            key={b.id}
            className={`absolute rounded-md border-2 transition-all ${toneColor(b.tone)}`}
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: `${b.w}%`,
              height: `${b.h}%`,
            }}
          >
            <div className={`absolute -top-6 left-0 flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-mono ${toneText(b.tone)}`}>
              <span>{b.label}</span>
              <span className="opacity-70">{b.confidence}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* footer */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-3 py-2 text-[10px] font-mono text-white/60">
        <span>{new Date().toLocaleString()}</span>
        <div className="flex items-center gap-1">
          {streaming && onCapture && (
            <Button
              size="sm"
              variant="default"
              className="h-7 gap-1 bg-green-600 text-white hover:bg-green-500"
              onClick={capture}
              disabled={capturing}
            >
              <Scan className="h-3 w-3" />
              {capturing ? 'Detecting…' : 'Capture & Detect'}
            </Button>
          )}
          {streaming ? (
            <Button size="sm" variant="ghost" className="h-7 text-white/80 hover:text-white" onClick={stop}>
              <CameraOff className="mr-1 h-3 w-3" /> Stop
            </Button>
          ) : null}
          <Button size="sm" variant="ghost" className="h-7 text-white/80 hover:text-white">
            <Maximize2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function CornerBrackets() {
  const base = 'absolute h-6 w-6 border-primary/70'
  return (
    <>
      <div className={`${base} left-3 top-10 border-l-2 border-t-2`} />
      <div className={`${base} right-3 top-10 border-r-2 border-t-2`} />
      <div className={`${base} left-3 bottom-10 border-l-2 border-b-2`} />
      <div className={`${base} right-3 bottom-10 border-r-2 border-b-2`} />
    </>
  )
}
