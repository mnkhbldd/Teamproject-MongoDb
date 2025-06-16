import { Request, Response } from "express";
import BookingModel from "../model/booking";
import CompanyModel from "../model/company";

interface RequestWithUserId extends Request {
  userId: string;
}

export const createBooking = async (
  req: RequestWithUserId,
  res: Response
): Promise<void> => {
  try {
    const { companyId, bookingDate, startTime, endTime, price } = req.body;

    const userId = req.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "User ID is required",
      });
      return;
    }

    const booking = await BookingModel.create({
      user: userId,
      company: companyId,
      bookingDate,
      startTime,
      endTime,
      price,
      status: "booked",
    });

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

export const getBookingsByUser = async (
  req: RequestWithUserId,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId;
    const bookings = await BookingModel.find({ user: userId })
      .populate("company", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

export const getBookingsByCompany = async (
  req: RequestWithUserId,
  res: Response
): Promise<void> => {
  try {
    const { companyId } = req.params;
    const bookings = await BookingModel.find({ company: companyId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

export const updateBookingStatus = async (
  req: RequestWithUserId,
  res: Response
): Promise<void> => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;
    const userId = req.userId;

    const booking = await BookingModel.findOneAndUpdate(
      { _id: bookingId, company: { $exists: true } },
      { status },
      { new: true }
    );

    if (!booking) {
      res.status(404).json({
        success: false,
        message: "Booking not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};
