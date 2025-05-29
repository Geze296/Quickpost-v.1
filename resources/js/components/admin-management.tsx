"use client"

import { useState } from "react"
import { Check, Edit, Key, MoreHorizontal, Search, Shield, Trash, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"

export function AdminManagement() {
  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false)

  const admins = [
    {
      id: 1,
      name: "Admin User",
      email: "admin@socialpro.com",
      role: "Super Admin",
      status: "Active",
      lastLogin: "May 23, 2023, 10:30 AM",
      avatar: "/placeholder-user.jpg",
    },
    {
      id: 2,
      name: "Sarah Manager",
      email: "sarah@socialpro.com",
      role: "Manager",
      status: "Active",
      lastLogin: "May 22, 2023, 3:45 PM",
      avatar: "/placeholder-user.jpg",
    },
    {
      id: 3,
      name: "Tom Support",
      email: "tom@socialpro.com",
      role: "Support Agent",
      status: "Active",
      lastLogin: "May 23, 2023, 9:15 AM",
      avatar: "/placeholder-user.jpg",
    },
    {
      id: 4,
      name: "Jessica Analyst",
      email: "jessica@socialpro.com",
      role: "Analyst",
      status: "Inactive",
      lastLogin: "May 10, 2023, 11:20 AM",
      avatar: "/placeholder-user.jpg",
    },
    {
      id: 5,
      name: "Mark Developer",
      email: "mark@socialpro.com",
      role: "Developer",
      status: "Active",
      lastLogin: "May 23, 2023, 8:05 AM",
      avatar: "/placeholder-user.jpg",
    },
  ]

  const permissions = [
    { id: "user-management", name: "User Management", description: "View and manage user accounts" },
    {
      id: "subscription-management",
      name: "Subscription Management",
      description: "Manage subscription plans and billing",
    },
    { id: "support-tickets", name: "Support Tickets", description: "Respond to user support requests" },
    { id: "content-moderation", name: "Content Moderation", description: "Moderate user-generated content" },
    { id: "analytics-access", name: "Analytics Access", description: "Access platform analytics and reports" },
    { id: "admin-management", name: "Admin Management", description: "Add and manage admin accounts" },
    { id: "system-settings", name: "System Settings", description: "Configure system-wide settings" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Input placeholder="Search admins..." className="h-9 w-full md:w-[300px]" />
          <Button variant="outline" size="sm" className="h-9 px-2 lg:px-3">
            <Search className="h-4 w-4" />
            <span className="ml-2 hidden lg:inline">Search</span>
          </Button>
        </div>
        <Dialog open={isAddAdminOpen} onOpenChange={setIsAddAdminOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="h-9">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Admin
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Admin</DialogTitle>
              <DialogDescription>Create a new administrator account with specific permissions.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="John" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Doe" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="admin@example.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Admin Role</Label>
                <Select defaultValue="support-agent">
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="super-admin">Super Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="support-agent">Support Agent</SelectItem>
                    <SelectItem value="analyst">Analyst</SelectItem>
                    <SelectItem value="developer">Developer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Permissions</Label>
                <Card>
                  <CardContent className="p-3 max-h-[200px] overflow-y-auto">
                    <div className="space-y-3">
                      {permissions.map((permission) => (
                        <div key={permission.id} className="flex items-start space-x-2">
                          <Checkbox id={permission.id} />
                          <div className="grid gap-1.5 leading-none">
                            <Label htmlFor={permission.id} className="text-sm font-medium">
                              {permission.name}
                            </Label>
                            <p className="text-xs text-muted-foreground">{permission.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddAdminOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddAdminOpen(false)}>Create Admin</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Admin Accounts</CardTitle>
          <CardDescription>Manage administrator accounts and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Admin</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={admin.avatar || "/placeholder.svg"} alt={admin.name} />
                        <AvatarFallback>
                          {admin.name.charAt(0)}
                          {admin.name.split(" ")[1]?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{admin.name}</div>
                        <div className="text-sm text-muted-foreground">{admin.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {admin.role === "Super Admin" ? <Shield className="h-4 w-4 text-primary" /> : null}
                      {admin.role}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        admin.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {admin.status}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{admin.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Key className="mr-2 h-4 w-4" />
                          Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          {admin.status === "Active" ? (
                            <>
                              <span className="mr-2">❌</span>
                              Deactivate
                            </>
                          ) : (
                            <>
                              <Check className="mr-2 h-4 w-4" />
                              Activate
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>Configure permissions for each admin role</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Permission</TableHead>
                <TableHead>Super Admin</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead>Support Agent</TableHead>
                <TableHead>Analyst</TableHead>
                <TableHead>Developer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissions.map((permission) => (
                <TableRow key={permission.id}>
                  <TableCell>
                    <div className="font-medium">{permission.name}</div>
                    <div className="text-sm text-muted-foreground">{permission.description}</div>
                  </TableCell>
                  <TableCell>
                    <Checkbox defaultChecked disabled />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      defaultChecked={permission.id !== "admin-management" && permission.id !== "system-settings"}
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      defaultChecked={
                        permission.id === "user-management" ||
                        permission.id === "support-tickets" ||
                        permission.id === "content-moderation"
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox defaultChecked={permission.id === "analytics-access"} />
                  </TableCell>
                  <TableCell>
                    <Checkbox defaultChecked={permission.id === "system-settings"} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Save Permission Changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
