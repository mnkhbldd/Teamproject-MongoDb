import React from "react";
import { format, addDays, isWeekend, startOfDay, isSameDay } from "date-fns";
import { ChevronRight, Wallet } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import axiosInstance from "@/utils/axios";
import { useParams } from "next/navigation";

interface Booking {
  id: string;
  date: Date;
  time: string;
  status: "pending" | "confirmed" | "cancelled" | "selected";
  price: number;
  isSale: boolean;
}

export const BookingDate = () => {
  const [currentStartDate, setCurrentStartDate] = React.useState<Date>(
    startOfDay(new Date())
  );
  const [days, setDays] = React.useState<Date[]>([]);
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const params = useParams();

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

    if (existingBooking) {
      setBookings((prev) =>
        prev.filter((booking) => booking.id !== existingBooking.id)
      );
    } else {
      const newBooking: Booking = {
        id: `${date.toISOString()}-${timeSlot}-${Date.now()}`,
        date: startOfDay(date),
        time: timeSlot,
        status: "pending",
        price: timeSlots.find((ts) => ts.time === timeSlot)?.price || 75000,
        isSale: timeSlots.find((ts) => ts.time === timeSlot)?.isSale || false,
      };

      setBookings((prev) => [...prev, newBooking]);
    }
  };

  const handleRemoveBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));
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
        return "bg-blue-500 text-white cursor-not-allowed";
      default:
        return "bg-red-100 text-red-800 cursor-not-allowed";
    }
  };

  const handleBooking = () => {
    const fetchBooking = async () => {
      try {
        const bookingData = bookings.map((booking) => ({
          companyId: params.id,
          bookingDate: booking.date.toISOString().split("T")[0],
          startTime: booking.time.split("-")[0].trim(),
          endTime: booking.time.split("-")[1].trim(),
          price: booking.price,
        }));

        const res = await axiosInstance.post("/booking/create-bookings", {
          bookings: bookingData,
        });
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooking();
  };

  const fetchBookingData = () => {
    const fetchBooking = async () => {
      try {
        const res = await axiosInstance.get(
          `/booking/company-bookings/${params.id}`
        );
        setBookings(res.data.bookings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooking();
  };

  React.useEffect(() => {
    fetchBookingData();
  }, []);

  return (
    <div className="w-full">
      <div className="mb-8 p-4 bg-gray-100 rounded-lg">
        <div className="flex items-center justify-between pb-2">
          <h3 className="text-lg font-semibold mb-2">📅 Booked Time Slots</h3>
          {bookings.length > 0 && (
            <Sheet>
              <SheetTrigger className="bg-blue-500 text-white border-2 border-red-500 px-5 py-1 rounded text-sm hover:bg-blue-600">
                Cashout
              </SheetTrigger>
              <SheetContent className="!w-[900px] !sm:w-[940px] z-50">
                <SheetHeader>
                  <SheetTitle>Are you absolutely sure?</SheetTitle>
                  <SheetDescription></SheetDescription>
                  <div className="flex flex-col gap-2 overflow-y-scroll h-[500px] ">
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
                                ? "text-blue-600"
                                : booking.status === "selected"
                                ? "text-blue-600"
                                : "text-red-600"
                            }`}
                          >
                            {booking.status.charAt(0).toUpperCase() +
                              booking.status.slice(1)}
                          </span>
                        </div>

                        {booking.isSale && (
                          <div className="text-xs text-red-600 font-medium">
                            SALE
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="gap-10 flex flex-col items-center justify-between">
                      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 w-full">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between ">
                            <div>
                              <p className="text-sm text-green-700 font-medium">
                                Total Price
                              </p>
                              <p className="text-2xl font-bold text-green-800">
                                {bookings
                                  .reduce((acc, curr) => acc + curr.price, 0)
                                  .toLocaleString()}{" "}
                                ₮
                              </p>
                            </div>
                            <Wallet className="h-8 w-8 text-green-600" />
                          </div>
                        </CardContent>
                      </Card>
                      <Button
                        className="w-full"
                        onClick={() => {
                          setBookings([]);
                          handleBooking();
                        }}
                      >
                        Confirm Cashout
                      </Button>
                    </div>
                  </div>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          )}
        </div>
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
                        ? "text-blue-600"
                        : booking.status === "selected"
                        ? "text-blue-600"
                        : "text-red-600"
                    }`}
                  >
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveBooking(booking.id);
                  }}
                  className="mt-2 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                >
                  Remove
                </button>
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
                        ? "Selected"
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
