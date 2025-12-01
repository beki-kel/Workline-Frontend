'use client'

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { useOrganization } from "@/features/Organizations/application/hooks/useOrganization"
import { useOutlines } from "@/features/Dashboard/presentation/components/Outlines/application/hooks/useOutlines"
import { OutlinesTable } from "@/features/Dashboard/presentation/components/Outlines/presentation/components/OutlinesTable"
import { EmptyOrgState } from "@/features/Organizations/presentation/components/EmptyOrgState"
import { Skeleton } from "@/components/ui/skeleton"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function DashboardScreen() {
    const router = useRouter()
    const { data: session } = authClient.useSession()
    const { activeOrganizationId, isLoading: isOrgLoading } = useOrganization()
    const { outlines, isLoading: isOutlinesLoading } = useOutlines(activeOrganizationId || undefined)

    // Redirect to verify-email if user's email is not verified
    useEffect(() => {
        if (session?.user && !session.user.emailVerified) {
            router.push('/verify-email')
        }
    }, [session, router])

    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader title="Outlines" />
                <div className="flex flex-1 flex-col p-4 md:p-6">
                    {isOrgLoading ? (
                        <div className="space-y-4">
                            <Skeleton className="h-10 w-64" />
                            <Skeleton className="h-96 w-full" />
                        </div>
                    ) : !activeOrganizationId ? (
                        <EmptyOrgState />
                    ) : (
                        <OutlinesTable outlines={outlines} isLoading={isOutlinesLoading} />
                    )}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
