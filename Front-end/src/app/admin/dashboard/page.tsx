"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { BookingListsAdmin } from "@/components/BookingListsAdmin";

// Define our data structure for metrics and their connection to chart data
interface MetricData {
  day: number;
  newItems: number;
  comments: number;
  uploads: number;
  feeds: number;
}

// Sample data that would connect metrics to chart
const connectedData: MetricData[] = [
  { day: 0, newItems: 60, comments: 45, uploads: 100, feeds: 15 },
  { day: 1, newItems: 50, comments: 40, uploads: 95, feeds: 13 },
  { day: 2, newItems: 65, comments: 50, uploads: 110, feeds: 16 },
  { day: 3, newItems: 45, comments: 35, uploads: 85, feeds: 11 },
  { day: 4, newItems: 40, comments: 30, uploads: 80, feeds: 10 },
  { day: 5, newItems: 55, comments: 45, uploads: 105, feeds: 14 },
  { day: 6, newItems: 45, comments: 35, uploads: 90, feeds: 12 },
  { day: 7, newItems: 50, comments: 40, uploads: 95, feeds: 13 },
  { day: 8, newItems: 40, comments: 35, uploads: 85, feeds: 11 },
  { day: 9, newItems: 40, comments: 35, uploads: 85, feeds: 11 },
];

// Calculate totals to match the numbers in the image
const metrics = {
  Booking: 100, // Sum of all newItems in connectedData would equal this
  comments: 100, // Sum of all comments in connectedData would equal this
  uploads: 100, // Sum of all uploads in connectedData would equal this
  Rating: 100, // Sum of all feeds in connectedData would equal this
};

const AdminDashboard = () => {
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
    "newItems",
    "uploads",
  ]);

  const toggleMetric = (metric: string) => {
    if (selectedMetrics.includes(metric)) {
      setSelectedMetrics(selectedMetrics.filter((m) => m !== metric));
    } else {
      setSelectedMetrics([...selectedMetrics, metric]);
    }
  };

  return (
    <div className="p-4 space-y-8 w-screen pr-20 h-screen overflow-y-scroll">
      <h2 className="text-4xl font-bold text-gray-600">
        Dashboard{" "}
        <p className="text-gray-600 text-sm mt-1">
          List of all bookings in your company
        </p>
      </h2>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card
          className={`bg-green-300 cursor-pointer ${
            selectedMetrics.includes("newItems") ? "ring-2 ring-black" : ""
          }`}
          onClick={() => toggleMetric("newItems")}
        >
          <div className="p-6">
            <h3 className="text-4xl font-light text-white">
              {metrics.Booking}
            </h3>
            <p className="text-sm text-white">Booking</p>
          </div>
        </Card>

        <Card
          className={`bg-[#67b7e7] cursor-pointer ${
            selectedMetrics.includes("comments") ? "ring-2 ring-black" : ""
          }`}
          onClick={() => toggleMetric("comments")}
        >
          <div className="p-6">
            <h3 className="text-4xl font-light text-white">
              {metrics.comments}
            </h3>
            <p className="text-sm text-white">Comments</p>
          </div>
        </Card>

        <Card
          className={`bg-[#6c47c9] cursor-pointer ${
            selectedMetrics.includes("uploads") ? "ring-2 ring-black" : ""
          }`}
          onClick={() => toggleMetric("uploads")}
        >
          <div className="p-6">
            <h3 className="text-4xl font-light text-white">
              {metrics.uploads}
            </h3>
            <p className="text-sm text-white">Uploads</p>
          </div>
        </Card>

        <Card
          className={`bg-red-300 cursor-pointer ${
            selectedMetrics.includes("feeds") ? "ring-2 ring-black" : ""
          }`}
          onClick={() => toggleMetric("feeds")}
        >
          <div className="p-6">
            <h3 className="text-4xl font-light text-white">{metrics.Rating}</h3>
            <div className="inline-block px-2 py-0.5 rounded text-sm mt-1 text-white">
              Rating
            </div>
          </div>
        </Card>
      </div>
      <Card className="bg-white">
        <div className="p-6">
          <h2 className="text-lg font-medium mb-4">
            Connected Data Visualization
          </h2>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={connectedData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="colorNewItems"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="green" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="green" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient
                    id="colorComments"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#67b7e7" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#67b7e7" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorUploads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6c47c9" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#6c47c9" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorFeeds" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="red" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="red" stopOpacity={0.1} />
                  </linearGradient>
                </defs>

                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />

                {selectedMetrics.includes("newItems") && (
                  <Area
                    type="monotone"
                    dataKey="newItems"
                    stroke="#d1d5db"
                    fillOpacity={1}
                    fill="url(#colorNewItems)"
                  />
                )}

                {selectedMetrics.includes("comments") && (
                  <Area
                    type="monotone"
                    dataKey="comments"
                    stroke="#67b7e7"
                    fillOpacity={1}
                    fill="url(#colorComments)"
                  />
                )}

                {selectedMetrics.includes("uploads") && (
                  <Area
                    type="monotone"
                    dataKey="uploads"
                    stroke="#6c47c9"
                    fillOpacity={1}
                    fill="url(#colorUploads)"
                  />
                )}

                {selectedMetrics.includes("feeds") && (
                  <Area
                    type="monotone"
                    dataKey="feeds"
                    stroke="#93c5fd"
                    fillOpacity={1}
                    fill="url(#colorFeeds)"
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>
      <BookingListsAdmin />
    </div>
  );
};

export default AdminDashboard;
