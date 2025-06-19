"use client";

import { useState, useEffect } from "react";
import { BookingData, generateBookingData } from "@/lib/booking-data";
import { BookingCard } from "./booking-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GrCurrency } from "react-icons/gr";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
  Search,
  Filter,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/app/hooks/use-toast";

export function BookingDashboard() {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<BookingData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Initializing booking dashboard...");
    const data = generateBookingData();
    setBookings(data);
    setFilteredBookings(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log(
      "Filtering bookings with search:",
      searchTerm,
      "status:",
      statusFilter
    );
    let filtered = bookings;

    if (searchTerm) {
      filtered = filtered.filter(
        (booking) =>
          booking.customerName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((booking) => booking.status === statusFilter);
    }

    setFilteredBookings(filtered);
  }, [bookings, searchTerm, statusFilter]);

  const handleStatusChange = (
    bookingId: string,
    newStatus: BookingData["status"]
  ) => {
    console.log(`Updating booking ${bookingId} status to ${newStatus}`);
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      )
    );

    toast({
      title: "Booking Updated",
      description: `Booking ${bookingId} has been ${newStatus}.`,
    });
  };

  const stats = {
    total: bookings.length,
    booked: bookings.filter((b) => b.status === "booked").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,

    revenue: bookings.reduce((sum, booking) => sum + booking.amount, 0),
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="space-y-2">
          <div className="h-8 w-[250px] mx-auto" />
          <div className="h-4 w-[400px] mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="h-4 w-[100px] mb-2" />
                <div className="h-8 w-[60px]" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8 h-screen overflow-scroll scrollbar-hide">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h1 className="text-4xl relative text-white font-bold text-shadow-2xl  tracking-tight">
          Booking Dashboard
        </h1>
        <p className="text-muted-foreground  ">
          Manage your bookings with style and efficiency
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card className="bg-gradient-to-r relative from-slate-300 to-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Bookings
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r relative from-slate-200 to-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Booked</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.booked}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-bl relative from-green-400 to-blue-500 ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Canceled</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold ">{stats.cancelled}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-b relative from-blue-400 to-slate-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <GrCurrency className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.revenue.toLocaleString()}
              {"  "}
              <span className="text-2xl font-bold">₮ </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col relative sm:flex-row gap-4 items-center justify-between"
      >
        <div className="flex flex-1 max-w-md text-white  gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-2 text-white"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <Filter color="white" className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="text-black">
              <SelectItem value="all">All Status</SelectItem>

              <SelectItem value="booked">Booked</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Badge variant="secondary" className="text-sm">
          {filteredBookings.length} results
        </Badge>
      </motion.div>

      {/* Bookings Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredBookings.map((booking, index) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index }}
          >
            <BookingCard
              booking={booking}
              onStatusChange={handleStatusChange}
            />
          </motion.div>
        ))}
      </motion.div>

      {filteredBookings.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-muted-foreground text-lg">
            No bookings found matching your criteria.
          </p>
        </motion.div>
      )}
    </div>
  );
}
