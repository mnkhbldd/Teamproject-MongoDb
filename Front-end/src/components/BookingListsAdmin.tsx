import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { CompanyList } from "./CompanyList";

interface Booking {
  id: string;
  username: string;
  date: string;
  time: string;
  status: string;
}

export const BookingListsAdmin = () => {
  const bookings: Booking[] = [];

  return (
    <div className="space-y-8 py-6">
      <div className="flex items-center justify-between">
        <CompanyList />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-gray-600">
          Bookings{" "}
          <p className="text-gray-600 text-sm mt-1">
            List of all bookings in your company
          </p>
        </h1>
      </div>

      <div className="rounded-lg shadow">
        <div className=" w-full -mx-6 px-6">
          <div className=" ">
            {bookings.length > 0 ? (
              <table className=" divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booking ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Username
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Select
                          value={booking.status}
                          onValueChange={(value) => {
                            console.log(`Updating status to: ${value}`);
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="canceled">Canceled</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-6 text-center text-gray-500 border rounded-lg">
                <p className="text-lg">No bookings available</p>
                <p className="mt-2 text-sm">
                  There are currently no bookings in your company
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
