"use client";

import {
  BookingData,
  formatCurrency,
  formatDateTime,
} from "@/lib/booking-data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  User,
  CheckCircle,
  XCircle,
  Clock4,
} from "lucide-react";
import { motion } from "framer-motion";

interface BookingCardProps {
  booking: BookingData;
  onStatusChange?: (
    bookingId: string,
    newStatus: BookingData["status"]
  ) => void;
}

export function BookingCard({ booking, onStatusChange }: BookingCardProps) {
  console.log("Rendering BookingCard for:", booking.id);

  const getStatusColor = (status: BookingData["status"]) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "confirmed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: BookingData["status"]) => {
    switch (status) {
      case "pending":
        return <Clock4 className="w-3 h-3" />;
      case "confirmed":
        return <CheckCircle className="w-3 h-3" />;
      case "cancelled":
        return <XCircle className="w-3 h-3" />;
    }
  };

  const handleStatusChange = (newStatus: BookingData["status"]) => {
    console.log(`Changing status for ${booking.id} to ${newStatus}`);
    onStatusChange?.(booking.id, newStatus);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-0 shadow-sm bg-gradient-to-r from-slate-400 to-white">
        {/* Premium gradient bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-premium-gradient" />

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-lg text-gray-900 group-hover:text-premium-indigo transition-colors">
                {booking.service}
              </h3>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>{booking.customerName}</span>
                {booking.verified && (
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900 tabular-nums">
                {formatCurrency(booking.amount, booking.currency)}
              </div>
              <Badge
                variant="outline"
                className={`mt-1 gap-1 ${getStatusColor(booking.status)}`}
              >
                {getStatusIcon(booking.status)}
                {booking.status}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{formatDateTime(booking.datetime)}</span>
            </div>

            {booking.location && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{booking.location}</span>
              </div>
            )}

            {booking.status === "pending" && (
              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  onClick={() => handleStatusChange("confirmed")}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Confirm
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleStatusChange("cancelled")}
                  className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
