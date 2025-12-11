import * as React from "react"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import {
  LayoutGrid,
  Users,
  Map as MapIcon,
  Share2,
  Milestone,
  Dna,
  Banknote,
  History,
  MessageSquare,
  Settings,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/user-nav"
import { Logo } from "@/components/logo"

const menuItems = [
  { href: "/dashboard", icon: LayoutGrid, label: "Dashboard" },
  { href: "/dashboard/genogram", icon: Users, label: "Genogram" },
  { href: "/dashboard/ecomap", icon: MapIcon, label: "Ecomap" },
  { href: "/dashboard/social-network", icon: Share2, label: "Social Network" },
  { href: "/dashboard/life-road-map", icon: Milestone, label: "Life Road Map" },
  { href: "/dashboard/genetics", icon: Dna, label: "Genetics" },
  { href: "/dashboard/finances", icon: Banknote, label: "Finances" },
  { href: "/dashboard/history", icon: History, label: "Map History" },
  { href: "/dashboard/messaging", icon: MessageSquare, label: "Messaging" },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo />
            <span className="font-bold text-lg">Maplify</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild>
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1"></div>
          <UserNav />
        </header>
        <main className="p-4 md:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
