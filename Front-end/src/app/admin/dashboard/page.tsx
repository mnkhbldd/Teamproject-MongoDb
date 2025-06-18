"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarDays, DollarSign, TrendingUp, Users } from "lucide-react";
import { BookingListsAdmin } from "@/components/BookingListsAdmin";

const mockBookings = [
  {
    _id: "684ffb08e14b423dee2f4989",
    user: "user_2yDXdHHp9AN0w9XYA2FktIY8j9Z",
    company: "684d3c1135154184ccdcd6b2",
    companyName: "Tech Solutions Inc",
    bookingDate: "2025-06-20T00:00:00.000+00:00",
    startTime: "09:00",
    endTime: "10:00",
    status: "booked",
    price: "75000",
    createdAt: "2025-06-16T11:07:52.635+00:00",
    updatedAt: "2025-06-16T11:07:52.635+00:00",
  },
  {
    _id: "684ffb08e14b423dee2f4990",
    user: "user_3xEYeIIq0BO1x0YZB3GluJZ9k0A",
    company: "684d3c1135154184ccdcd6b3",
    companyName: "Digital Marketing Pro",
    bookingDate: "2025-06-21T00:00:00.000+00:00",
    startTime: "14:00",
    endTime: "15:30",
    status: "booked",
    price: "120000",
    createdAt: "2025-06-16T12:15:30.123+00:00",
    updatedAt: "2025-06-16T12:15:30.123+00:00",
  },
  {
    _id: "684ffb08e14b423dee2f4991",
    user: "user_4zFZfJJr1CP2y1ZAC4HmvKA0l1B",
    company: "684d3c1135154184ccdcd6b4",
    companyName: "Creative Studio",
    bookingDate: "2025-06-19T00:00:00.000+00:00",
    startTime: "10:30",
    endTime: "12:00",
    status: "cancelled",
    price: "95000",
    createdAt: "2025-06-15T09:30:15.456+00:00",
    updatedAt: "2025-06-16T08:45:22.789+00:00",
  },
  {
    _id: "684ffb08e14b423dee2f4992",
    user: "user_5aGAgKKs2DQ3z2ABC5InwLB1m2C",
    company: "684d3c1135154184ccdcd6b2",
    companyName: "Tech Solutions Inc",
    bookingDate: "2025-06-22T00:00:00.000+00:00",
    startTime: "16:00",
    endTime: "17:00",
    status: "booked",
    price: "85000",
    createdAt: "2025-06-16T14:20:45.321+00:00",
    updatedAt: "2025-06-16T14:20:45.321+00:00",
  },
];

const companies = [
  { id: "684d3c1135154184ccdcd6b2", name: "Tech Solutions Inc" },
  { id: "684d3c1135154184ccdcd6b3", name: "Digital Marketing Pro" },
  { id: "684d3c1135154184ccdcd6b4", name: "Creative Studio" },
];

export default function AdminDashboard() {
  const [bookings, setBookings] = useState(mockBookings);
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBookings = bookings.filter((booking) => {
    const matchesCompany =
      selectedCompany === "all" || booking.company === selectedCompany;
    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;
    const matchesSearch =
      searchTerm === "" ||
      booking.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.user.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCompany && matchesStatus && matchesSearch;
  });

  const totalBookings = filteredBookings.length;
  const bookedCount = filteredBookings.filter(
    (b) => b.status === "booked"
  ).length;
  const cancelledCount = filteredBookings.filter(
    (b) => b.status === "cancelled"
  ).length;
  const totalRevenue = filteredBookings
    .filter((b) => b.status === "booked")
    .reduce((sum, b) => sum + Number.parseInt(b.price), 0);

  const handleStatusChange = (bookingId: string, newStatus: string) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking._id === bookingId
          ? {
              ...booking,
              status: newStatus,
              updatedAt: new Date().toISOString(),
            }
          : booking
      )
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("mn-MN", {
      style: "currency",
      currency: "MNT",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-y-scroll">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Booking Dashboard
          </h2>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Bookings
              </CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBookings}</div>
              <p className="text-xs text-muted-foreground">
                {bookedCount} active, {cancelledCount} cancelled
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Bookings
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bookedCount}</div>
              <p className="text-xs text-muted-foreground">
                {totalBookings > 0
                  ? Math.round((bookedCount / totalBookings) * 100)
                  : 0}
                % of total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(totalRevenue)}
              </div>
              <p className="text-xs text-muted-foreground">
                From active bookings only
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Companies</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{companies.length}</div>
              <p className="text-xs text-muted-foreground">Active companies</p>
            </CardContent>
          </Card>
        </div>
        <BookingListsAdmin />

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>
              Filter bookings by company, status, or search term
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="search">Search</Label>
                <Input
                  id="search"
                  placeholder="Search by company or user..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Select
                  value={selectedCompany}
                  onValueChange={setSelectedCompany}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Companies</SelectItem>
                    {companies.map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="booked">Booked</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>&nbsp;</Label>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCompany("all");
                    setStatusFilter("all");
                    setSearchTerm("");
                  }}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bookings Table */}
        <Card>
          <CardHeader>
            <CardTitle>Bookings ({filteredBookings.length})</CardTitle>
            <CardDescription>
              Manage all bookings across your companies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center py-8 text-muted-foreground"
                      >
                        No bookings found matching your criteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBookings.map((booking) => (
                      <TableRow key={booking._id}>
                        <TableCell className="font-medium">
                          {booking.companyName}
                        </TableCell>
                        <TableCell>{formatDate(booking.bookingDate)}</TableCell>
                        <TableCell>
                          {booking.startTime} - {booking.endTime}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {booking.user.slice(-8)}...
                        </TableCell>
                        <TableCell>
                          {formatCurrency(Number.parseInt(booking.price))}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              booking.status === "booked"
                                ? "default"
                                : "destructive"
                            }
                          >
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={booking.status}
                            onValueChange={(value) =>
                              handleStatusChange(booking._id, value)
                            }
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="booked">Booked</SelectItem>
                              <SelectItem value="cancelled">
                                Cancelled
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
