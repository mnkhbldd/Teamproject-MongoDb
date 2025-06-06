"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const AdminDashboard = () => {
  const campaignData = [
    { day: 0, pv: 15, mac: 4 },
    { day: 1, pv: 8, mac: 6 },
    { day: 2, pv: 12, mac: 7 },
    { day: 3, pv: 8, mac: 5 },
    { day: 4, pv: 9, mac: 3 },
    { day: 5, pv: 11, mac: 7 },
    { day: 6, pv: 8, mac: 5 },
    { day: 7, pv: 9, mac: 6 },
    { day: 8, pv: 8, mac: 4 },
    { day: 9, pv: 7, mac: 5 },
  ];

  return (
    <div className="w-screen bg-gray-200 h-screen rounded-lg">
      <div className="mb-6 flex items-center justify-between px-4 pt-4">
        <div>
          <h1 className="text-3xl font-medium text-gray-700">Dashboard</h1>
          <p className="text-gray-500">Welcome to angular application</p>
        </div>
      </div>

      <div className="flex gap-4 px-8 w-screen">
        <div className="flex gap-4">
          <div className="flex flex-col gap-4">
            <Card>
              <CardContent className="p-6 w-80">
                <div className="text-5xl font-light text-gray-500">521</div>
                <div className="mt-2 text-sm text-gray-500">New Items</div>
              </CardContent>
            </Card>

            <Card className="bg-[hsl(250,60%,50%)] text-white">
              <CardContent className="p-6 w-80">
                <div>
                  <div className="text-5xl font-light">930</div>
                  <div className="mt-2 text-sm">Uploads</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-4">
            <Card className="bg-[hsl(199,89%,60%)] text-white">
              <CardContent className="p-6 w-80">
                <div className="text-5xl font-light">432</div>
                <div className="mt-2 text-sm">Comments</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 w-80">
                <div className="text-5xl font-light text-gray-500">129</div>
                <div className="mt-2 text-sm text-gray-500">Feeds</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="w-screen">
          <Card className="">
            <CardHeader className="pb-4">
              <CardTitle>Latest Campaign</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  pv: {
                    label: "PV",
                    color: "hsl(199, 89%, 60%)", // Light blue color
                  },
                  mac: {
                    label: "Mac",
                    color: "hsl(250, 60%, 50%)", // Purple color
                  },
                }}
                className="h-[250px] w-full"
              >
                <AreaChart
                  data={campaignData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="hsl(199, 89%, 60%)"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(199, 89%, 60%)"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                    <linearGradient id="colorMac" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="hsl(250, 60%, 50%)"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(250, 60%, 50%)"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tickMargin={10}
                  />
                  <YAxis
                    domain={[0, 20]}
                    axisLine={false}
                    tickLine={false}
                    tickMargin={10}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="mac"
                    stackId="1"
                    stroke="var(--color-mac)"
                    fill="url(#colorMac)"
                    fillOpacity={1}
                  />
                  <Area
                    type="monotone"
                    dataKey="pv"
                    stackId="1"
                    stroke="var(--color-pv)"
                    fill="url(#colorPv)"
                    fillOpacity={1}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
