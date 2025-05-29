"use client"

import { useState } from "react"
import { Bell, ChevronDown, CreditCard, HelpCircle, LayoutDashboard, LogOut, Settings, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SubscriptionManagement } from "@/components/subscription-management"
import { UserManagement } from "@/components/user-management"
import { SupportRequests } from "@/components/support-requests"
import { AdminManagement } from "@/components/admin-management"

export default function AdimnDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* Top Navigation */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl">Quick post Admin</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" size="icon" className="relative h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              4
            </span>
          </Button>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="hidden md:flex md:flex-col">
              <span className="text-sm font-medium">Admin User</span>
              <span className="text-xs text-muted-foreground">admin@socialpro.com</span>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden w-[250px] flex-col border-r bg-background md:flex">
          <nav className="grid gap-2 p-4 text-sm font-medium">
            <Button
              variant={activeTab === "overview" ? "default" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("overview")}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant={activeTab === "subscriptions" ? "default" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("subscriptions")}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Subscriptions
            </Button>
            <Button
              variant={activeTab === "users" ? "default" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("users")}
            >
              <Users className="mr-2 h-4 w-4" />
              Users
            </Button>
            <Button
              variant={activeTab === "support" ? "default" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("support")}
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              Support Requests
            </Button>
            <Button
              variant={activeTab === "admins" ? "default" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("admins")}
            >
              <Settings className="mr-2 h-4 w-4" />
              Admin Management
            </Button>
            <Button variant="ghost" className="justify-start text-red-500 mt-auto">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  {activeTab === "overview" && "Dashboard Overview"}
                  {activeTab === "subscriptions" && "Subscription Management"}
                  {activeTab === "users" && "User Management"}
                  {activeTab === "support" && "Support Requests"}
                  {activeTab === "admins" && "Admin Management"}
                </h1>
                <p className="text-muted-foreground">
                  {activeTab === "overview" && "Monitor your platform's performance and key metrics."}
                  {activeTab === "subscriptions" && "Manage user subscription plans and payments."}
                  {activeTab === "users" && "View and manage user accounts."}
                  {activeTab === "support" && "Respond to user support tickets."}
                  {activeTab === "admins" && "Manage admin accounts and permissions."}
                </p>
              </div>
              <TabsList className="hidden md:flex">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="support">Support</TabsTrigger>
                <TabsTrigger value="admins">Admins</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="h-full flex-col space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2,853</div>
                    <p className="text-xs text-muted-foreground">+12% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,429</div>
                    <p className="text-xs text-muted-foreground">+5% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Open Support Tickets</CardTitle>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-muted-foreground">-8% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$24,780</div>
                    <p className="text-xs text-muted-foreground">+18% from last month</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>User Growth</CardTitle>
                    <CardDescription>User acquisition over the past 30 days</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[200px] flex items-center justify-center">
                    <p className="text-muted-foreground">User growth chart visualization</p>
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Subscription Plans</CardTitle>
                    <CardDescription>Distribution of active subscription plans</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[200px] flex items-center justify-center">
                    <p className="text-muted-foreground">Subscription plan distribution chart</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="subscriptions" className="h-full flex-col space-y-6">
              <SubscriptionManagement />
            </TabsContent>

            <TabsContent value="users" className="h-full flex-col space-y-6">
              <UserManagement />
            </TabsContent>

            <TabsContent value="support" className="h-full flex-col space-y-6">
              <SupportRequests />
            </TabsContent>

            <TabsContent value="admins" className="h-full flex-col space-y-6">
              <AdminManagement />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
