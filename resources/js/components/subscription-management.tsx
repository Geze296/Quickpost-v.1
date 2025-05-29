"use client"

import { useState } from "react"
import { Check, Edit, MoreHorizontal, Plus, Search, Trash } from "lucide-react"
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

export function SubscriptionManagement() {
  const [isAddPlanOpen, setIsAddPlanOpen] = useState(false)

  const subscriptionPlans = [
    {
      id: 1,
      name: "Basic",
      price: "$9.99",
      features: "5 social accounts, 100 scheduled posts",
      status: "Active",
      users: 845,
    },
    {
      id: 2,
      name: "Pro",
      price: "$19.99",
      features: "15 social accounts, unlimited posts",
      status: "Active",
      users: 512,
    },
    {
      id: 3,
      name: "Business",
      price: "$49.99",
      features: "Unlimited accounts, analytics, team access",
      status: "Active",
      users: 72,
    },
    {
      id: 4,
      name: "Enterprise",
      price: "$99.99",
      features: "Custom features, priority support",
      status: "Active",
      users: 23,
    },
    {
      id: 5,
      name: "Starter",
      price: "$4.99",
      features: "2 social accounts, 50 scheduled posts",
      status: "Inactive",
      users: 0,
    },
  ]

  const subscriptions = [
    {
      id: 1,
      user: "John Doe",
      email: "john@example.com",
      plan: "Pro",
      status: "Active",
      startDate: "2023-01-15",
      nextBilling: "2023-02-15",
    },
    {
      id: 2,
      user: "Jane Smith",
      email: "jane@example.com",
      plan: "Basic",
      status: "Active",
      startDate: "2023-02-10",
      nextBilling: "2023-03-10",
    },
    {
      id: 3,
      user: "Robert Johnson",
      email: "robert@example.com",
      plan: "Business",
      status: "Active",
      startDate: "2023-01-05",
      nextBilling: "2023-02-05",
    },
    {
      id: 4,
      user: "Emily Davis",
      email: "emily@example.com",
      plan: "Pro",
      status: "Canceled",
      startDate: "2023-01-20",
      nextBilling: "N/A",
    },
    {
      id: 5,
      user: "Michael Wilson",
      email: "michael@example.com",
      plan: "Enterprise",
      status: "Active",
      startDate: "2023-01-01",
      nextBilling: "2023-02-01",
    },
    {
      id: 6,
      user: "Sarah Brown",
      email: "sarah@example.com",
      plan: "Basic",
      status: "Past Due",
      startDate: "2023-01-25",
      nextBilling: "2023-02-25",
    },
    {
      id: 7,
      user: "David Miller",
      email: "david@example.com",
      plan: "Pro",
      status: "Active",
      startDate: "2023-02-01",
      nextBilling: "2023-03-01",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Input placeholder="Search subscriptions..." className="h-9 w-full md:w-[300px]" />
          <Button variant="outline" size="sm" className="h-9 px-2 lg:px-3">
            <Search className="h-4 w-4" />
            <span className="ml-2 hidden lg:inline">Search</span>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="h-9 w-[130px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
              <SelectItem value="past-due">Past Due</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" className="h-9">
            <Plus className="mr-2 h-4 w-4" />
            Add Subscription
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Subscription Plans</CardTitle>
          <CardDescription>Manage your subscription plans and pricing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-4">
            <Dialog open={isAddPlanOpen} onOpenChange={setIsAddPlanOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Plan
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Subscription Plan</DialogTitle>
                  <DialogDescription>Create a new subscription plan for your users.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="plan-name">Plan Name</Label>
                    <Input id="plan-name" placeholder="e.g., Premium" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="plan-price">Monthly Price</Label>
                    <Input id="plan-price" placeholder="e.g., 29.99" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="plan-features">Features</Label>
                    <Input id="plan-features" placeholder="e.g., 20 social accounts, unlimited posts" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="plan-status">Status</Label>
                    <Select defaultValue="active">
                      <SelectTrigger id="plan-status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddPlanOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddPlanOpen(false)}>Save Plan</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="hidden md:table-cell">Features</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Users</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptionPlans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.name}</TableCell>
                  <TableCell>{plan.price}/mo</TableCell>
                  <TableCell className="hidden md:table-cell">{plan.features}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        plan.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {plan.status}
                    </span>
                  </TableCell>
                  <TableCell>{plan.users}</TableCell>
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
                          {plan.status === "Active" ? (
                            <>
                              <span className="mr-2 h-4 w-4">❌</span>
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
          <CardTitle>User Subscriptions</CardTitle>
          <CardDescription>Manage individual user subscriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Start Date</TableHead>
                <TableHead className="hidden md:table-cell">Next Billing</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell>
                    <div className="font-medium">{subscription.user}</div>
                    <div className="text-sm text-muted-foreground">{subscription.email}</div>
                  </TableCell>
                  <TableCell>{subscription.plan}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        subscription.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : subscription.status === "Canceled"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {subscription.status}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{subscription.startDate}</TableCell>
                  <TableCell className="hidden md:table-cell">{subscription.nextBilling}</TableCell>
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
                          {subscription.status === "Active" ? (
                            <>
                              <span className="mr-2 h-4 w-4">❌</span>
                              Cancel
                            </>
                          ) : (
                            <>
                              <Check className="mr-2 h-4 w-4" />
                              Reactivate
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="mr-2 h-4 w-4"
                          >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>
                          View User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Showing <strong>7</strong> of <strong>100</strong> subscriptions
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
