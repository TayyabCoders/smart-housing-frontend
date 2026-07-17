'use client'

import { useTranslations } from 'next-intl'
import { DynamicLayout } from '@/components/layout/dynamic-layout'
import SurveillanceContainer from '../components/SurveillanceContainer'
import { RoleGuard } from '@/lib/auth/role-guard'

export default function FacePage() {
  const t = useTranslations('layout.sidebar')

  return (
    <RoleGuard allowedRoles={["admin"]}>
      <DynamicLayout>
        <div className="flex-1 w-full flex flex-col h-full bg-background rounded-xl overflow-hidden border">
          <SurveillanceContainer defaultView="face" />
        </div>
      </DynamicLayout>
    </RoleGuard>
  )
}
