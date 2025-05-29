"use client"

import { useState } from "react"
import { Archive, Check, Clock, MessageSquare, MoreHorizontal, Search, Star, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function SupportRequests() {
  const [selectedTicket, setSelectedTicket] = useState(null)

  const tickets = [
    {
      id: 1,
      user: "John Doe",
      email: "john@example.com",
      subject: "Cannot connect Instagram account",
      status: "Open",
      priority: "High",
      created: "May 20, 2023",
      lastUpdate: "May 21, 2023",
      avatar: "/placeholder-user.jpg",
      messages: [
        {
          id: 1,
          from: "user",
          message:
            "I'm having trouble connecting my Instagram account to the platform. I keep getting an authentication error. Can you help?",
          time: "May 20, 2023 10:30 AM",
        },
        {
          id: 2,
          from: "admin",
          message:
            "Hi John, I'm sorry to hear you're having trouble. Could you please provide a screenshot of the error message you're seeing?",
          time: "May 20, 2023 11:15 AM",
        },
        {
          id: 3,
          from: "user",
          message: "Here's the screenshot. It says 'Authentication failed: Invalid credentials'.",
          time: "May 20, 2023 11:45 AM",
        },
      ],
    },
    {
      id: 2,
      user: "Jane Smith",
      email: "jane@example.com",
      subject: "Billing issue with subscription",
      status: "Open",
      priority: "Medium",
      created: "May 19, 2023",
      lastUpdate: "May 20, 2023",
      avatar: "/placeholder-user.jpg",
      messages: [
        {
          id: 1,
          from: "user",
          message: "I was charged twice for my monthly subscription. Can you please check and refund the extra charge?",
          time: "May 19, 2023 09:20 AM",
        },
      ],
    },
    {
      id: 3,
      user: "Robert Johnson",
      email: "robert@example.com",
      subject: "Feature request: Twitter analytics",
      status: "In Progress",
      priority: "Low",
      created: "May 18, 2023",
      lastUpdate: "May 19, 2023",
      avatar: "/placeholder-user.jpg",
      messages: [],
    },
    {
      id: 4,
      user: "Emily Davis",
      email: "emily@example.com",
      subject: "Cannot schedule posts",
      status: "Open",
      priority: "High",
      created: "May 21, 2023",
      lastUpdate: "May 21, 2023",
      avatar: "/placeholder-user.jpg",
      messages: [],
    },
    {
      id: 5,
      user: "Michael Wilson",
      email: "michael@example.com",
      subject: "Account access issues",
      status: "Closed",
      priority: "High",
      created: "May 15, 2023",
      lastUpdate: "May 17, 2023",
      avatar: "/placeholder-user.jpg",
      messages: [],
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1 space-y-6">
        <div className="flex items-center gap-2">
          <Input placeholder="Search tickets..." className="h-9" />
          <Button variant="outline" size="sm" className="h-9 px-2 lg:px-3">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="open">Open</TabsTrigger>
            <TabsTrigger value="progress">In Progress</TabsTrigger>
            <TabsTrigger value="closed">Closed</TabsTrigger>
          </TabsList>

          <div className="space-y-2">
            {tickets.map((ticket) => (
              <Card
                key={ticket.id}
                className={`cursor-pointer hover:bg-muted/50 transition-colors ${selectedTicket?.id === ticket.id ? "border-primary" : ""}`}
                onClick={() => setSelectedTicket(ticket)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium line-clamp-1">{ticket.subject}</div>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        ticket.status === "Open"
                          ? "bg-blue-100 text-blue-800"
                          : ticket.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={ticket.avatar || "/placeholder.svg"} alt={ticket.user} />
                      <AvatarFallback>{ticket.user.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="line-clamp-1">{ticket.user}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{ticket.created}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          ticket.priority === "High"
                            ? "bg-red-500"
                            : ticket.priority === "Medium"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }`}
                      ></span>
                      <span>{ticket.priority}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Tabs>
      </div>

      <div className="md:col-span-2">
        {selectedTicket ? (
          <Card className="h-full flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div>
                <CardTitle>{selectedTicket.subject}</CardTitle>
                <CardDescription>
                  Ticket #{selectedTicket.id} • {selectedTicket.created}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue={selectedTicket.status.toLowerCase().replace(" ", "-")}>
                  <SelectTrigger className="h-8 w-[130px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Star className="mr-2 h-4 w-4" />
                      Mark as Priority
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Send Email
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Archive className="mr-2 h-4 w-4" />
                      Archive Ticket
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto p-4 border-t border-b">
              <div className="flex items-center gap-3 mb-4">
                <Avatar>
                  <AvatarImage src={selectedTicket.avatar || "/placeholder.svg"} alt={selectedTicket.user} />
                  <AvatarFallback>
                    {selectedTicket.user.charAt(0)}
                    {selectedTicket.user.split(" ")[1]?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{selectedTicket.user}</div>
                  <div className="text-sm text-muted-foreground">{selectedTicket.email}</div>
                </div>
              </div>

              <div className="space-y-4">
                {selectedTicket.messages.length > 0 ? (
                  selectedTicket.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.from === "admin" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${message.from === "admin" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                      >
                        <div className="text-sm">{message.message}</div>
                        <div className="text-xs mt-1 opacity-70">{message.time}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">No messages in this ticket yet.</div>
                )}
              </div>
            </CardContent>
            <CardFooter className="p-4">
              <div className="grid w-full gap-2">
                <Textarea placeholder="Type your response..." className="min-h-[100px]" />
                <div className="flex justify-end gap-2">
                  <Button variant="outline">
                    <X className="mr-2 h-4 w-4" />
                    Close Ticket
                  </Button>
                  <Button>
                    <Check className="mr-2 h-4 w-4" />
                    Send Response
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        ) : (
          <Card className="h-full flex items-center justify-center">
            <CardContent className="text-center p-6">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No Ticket Selected</h3>
              <p className="text-muted-foreground">
                Select a support ticket from the list to view details and respond.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
