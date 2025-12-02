"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Users,
  MailIcon,
  Settings,
} from "lucide-react"

import { NavUser } from "@/components/nav-user"
import { OrganizationSwitcher } from "@/features/Organizations/presentation/components/OrganizationSwitcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { useOrganization } from "@/features/Organizations/application/hooks/useOrganization"
import { PermissionChecks } from "@/lib/permissions"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useGlobalLoader } from "@/context/GlobalLoaderContext"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { currentUserRole } = useOrganization()
  const pathname = usePathname()
  const { showLoader, hideLoader } = useGlobalLoader()

  // Check permissions
  const canAccessMembers = PermissionChecks.canAccessMembers(currentUserRole)
  const canManageInvitations = PermissionChecks.canManageInvitations(currentUserRole)

  const handleNavigation = (path: string) => {
    if (pathname !== path) {
      showLoader()
      // Hide loader after a short delay to allow transition
      setTimeout(() => {
        hideLoader()
      }, 1000)
    }
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <OrganizationSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard"}
                  className="data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground"
                  onClick={() => handleNavigation("/dashboard")}
                >
                  <Link href="/dashboard">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Outlines</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {canAccessMembers && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === "/dashboard/members"}
                    className="data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground"
                    onClick={() => handleNavigation("/dashboard/members")}
                  >
                    <Link href="/dashboard/members">
                      <Users className="h-4 w-4" />
                      <span>Members</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard/invitations"}
                  className="data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground"
                  onClick={() => handleNavigation("/dashboard/invitations")}
                >
                  <Link href="/dashboard/invitations">
                    <MailIcon className="h-4 w-4" />
                    <span>Invitations</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
