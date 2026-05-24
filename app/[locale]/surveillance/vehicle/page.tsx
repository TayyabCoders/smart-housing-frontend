'use client'

import { useTranslations } from 'next-intl'
import { DynamicLayout } from '@/components/layout/dynamic-layout'
import SurveillanceContainer from '../components/SurveillanceContainer'

export default function VehiclePage() {
  const t = useTranslations('layout.sidebar')

  return (
    <DynamicLayout>
      <div className="flex-1 w-full flex flex-col h-full bg-background rounded-xl overflow-hidden border">
        <SurveillanceContainer defaultView="vehicle" />
      </div>
    </DynamicLayout>
  )
}
