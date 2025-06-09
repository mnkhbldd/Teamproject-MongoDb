import React from "react";
import { format, addDays, isWeekend, startOfDay, isSameDay } from "date-fns";
import { ChevronRight } from "lucide-react";

interface Booking {
  id: string;
  date: Date;
  time: string;
  status: "pending" | "confirmed" | "cancelled";
  price: number;
  isSale: boolean;
}

export const BookingDate = () => {
  const [currentStartDate, setCurrentStartDate] = React.useState<Date>(
    startOfDay(new Date())
  );
  const [days, setDays] = React.useState<Date[]>([]);
  const [bookings, setBookings] = React.useState<Booking[]>([]);

  React.useEffect(() => {
    const newDays = Array.from({ length: 7 }, (_, i) =>
      addDays(currentStartDate, i)
    );
    setDays(newDays);
  }, [currentStartDate]);

  const handleNextWeek = () => {
    setCurrentStartDate((prev) => addDays(prev, 7));
  };

  const handlePreviousWeek = () => {
    setCurrentStartDate((prev) => addDays(prev, -7));
  };

  const timeSlots = React.useMemo(() => {
    return Array.from({ length: 13 }, (_, i) => {
      const hour = i + 9;
      const nextHour =
        hour + 1 > 23 ? "00" : (hour + 1).toString().padStart(2, "0");

      return {
        time: `${hour.toString().padStart(2, "0")}:00-${nextHour}:00`,
        price: 75000,
        isSale: false,
      };
    });
  }, []);

  const handleSlotClick = (date: Date, timeSlot: string) => {
    const existingBooking = bookings.find(
      (booking) => isSameDay(booking.date, date) && booking.time === timeSlot
    );

    if (existingBooking) return;

    const newBooking: Booking = {
      id: `${date.toISOString()}-${timeSlot}-${Date.now()}`,
      date: startOfDay(date),
      time: timeSlot,
      status: "pending",
      price: timeSlots.find((ts) => ts.time === timeSlot)?.price || 75000,
      isSale: timeSlots.find((ts) => ts.time === timeSlot)?.isSale || false,
    };

    setBookings((prev) => [...prev, newBooking]);
    console.log(bookings);
  };

  const getBookingForSlot = (date: Date, time: string) => {
    return (
      bookings.find(
        (booking) => isSameDay(booking.date, date) && booking.time === time
      ) || null
    );
  };

  const getStatusClass = (booking: Booking | null) => {
    if (!booking) return "bg-white hover:bg-blue-50 cursor-pointer";

    switch (booking.status) {
      case "confirmed":
        return "bg-green-100 text-green-800 cursor-not-allowed";
      case "pending":
        return "bg-yellow-100 text-yellow-800 cursor-not-allowed";
      default:
        return "bg-red-100 text-red-800 cursor-not-allowed";
    }
  };

  const handleConfirmBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status: "confirmed" as const }
          : booking
      )
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="mb-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">📅 Booked Time Slots</h3>
        {bookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {bookings.map((booking, index) => (
              <div
                key={index}
                className="p-3 bg-white rounded border flex flex-col gap-2"
              >
                <div className="font-medium">
                  {format(booking.date, "MMM d, yyyy")}
                </div>
                <div>Time: {booking.time}</div>
                <div>Price: {booking.price.toLocaleString()} ₮</div>
                <div className="flex items-center gap-2">
                  <span>Status: </span>
                  <span
                    className={`font-medium ${
                      booking.status === "confirmed"
                        ? "text-green-600"
                        : booking.status === "pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)}
                  </span>
                </div>
                {booking.status === "pending" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleConfirmBooking(booking.id);
                    }}
                    className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                  >
                    Confirm Booking
                  </button>
                )}
                {booking.isSale && (
                  <div className="text-red-600 font-medium">On Sale!</div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No bookings yet. Click on a time slot to book it.
          </p>
        )}
      </div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Ulaanbaatar</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={handlePreviousWeek}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Previous week"
          >
            <ChevronRight className="h-5 w-5 rotate-180" />
          </button>
          <button
            onClick={handleNextWeek}
            className="flex items-center text-blue-600 hover:bg-blue-50 px-3 py-1 rounded"
          >
            Next week <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-8 gap-2">
        <div className="h-16"></div>

        {days.map((day, i) => (
          <div
            key={i}
            className={`text-center p-2 font-medium ${
              isWeekend(day) ? "text-red-600" : ""
            }`}
          >
            <div className="text-sm">{format(day, "EEEE")}</div>
            <div className="text-lg font-bold">{format(day, "MMM d")}</div>
          </div>
        ))}

        {timeSlots.map((timeSlot, timeIndex) => (
          <React.Fragment key={timeSlot.time}>
            <div className="flex items-center justify-end pr-2 text-sm text-gray-500">
              {timeSlot.time}
            </div>

            {days.map((_, dayIndex) => {
              const currentBooking = getBookingForSlot(
                days[dayIndex],
                timeSlot.time
              );
              const slotBooked = !!currentBooking;

              return (
                <div
                  key={`${dayIndex}-${timeIndex}`}
                  className={`border rounded p-1 ${getStatusClass(
                    currentBooking
                  )}`}
                  onClick={() =>
                    !slotBooked &&
                    handleSlotClick(days[dayIndex], timeSlot.time)
                  }
                >
                  {!slotBooked ? (
                    <div className="w-full h-full text-center">
                      {timeSlot.isSale && (
                        <div className="text-xs text-red-600 font-medium">
                          SALE
                        </div>
                      )}
                      <div className="font-medium">
                        {timeSlot.price.toLocaleString()} ₮
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-sm">
                      {currentBooking?.status === "pending"
                        ? "Pending..."
                        : "Booked"}
                    </div>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
