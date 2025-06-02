"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  BowArrow,
  Popcorn,
  WavesLadder,
  Backpack,
  Palette,
  TentTree,
  ChefHat,
  Bike,
  Fish,
  Volleyball,
  LandPlot,
} from "lucide-react";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const Settings = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const categoryIconsData = [
    { id: 1, name: "Archery", icon: BowArrow },
    { id: 3, name: "Badminton" },
    { id: 4, name: "Baseball" },
    { id: 5, name: "Basketball" },
    { id: 6, name: "Boxing" },
    { id: 9, name: "Cycling", icon: Bike },
    { id: 13, name: "Football" },
    { id: 14, name: "Golf" },
    { id: 15, name: "Gymnastics" },
    { id: 18, name: "Ice Hockey" },
    { id: 19, name: "Judo" },
    { id: 20, name: "Karate" },
    { id: 23, name: "Motorsport" },
    { id: 28, name: "Shooting" },
    { id: 29, name: "Skateboarding" },
    { id: 30, name: "Skiing" },
    { id: 31, name: "Snowboarding" },
    { id: 35, name: "Swimming pool", icon: WavesLadder },
    { id: 36, name: "Table Tennis" },
    { id: 38, name: "Tennis" },
    { id: 41, name: "Volleyball", icon: Volleyball },
    { id: 44, name: "Wrestling" },
    { id: 47, name: "Art & Craft", icon: Palette },
    { id: 48, name: "Billiards" },
    { id: 49, name: "Board Games" },
    { id: 50, name: "Bowling" },
    { id: 51, name: "Camping", icon: TentTree },
    { id: 53, name: "Cooking Classes", icon: ChefHat },
    { id: 54, name: "Dance" },
    { id: 56, name: "Fishing", icon: Fish },
    { id: 58, name: "Hiking", icon: Backpack },
    { id: 61, name: "Karaoke" },
    { id: 64, name: "Movie Night", icon: Popcorn },
    { id: 66, name: "Picnic", icon: LandPlot },
    { id: 69, name: "Rock Climbing (Indoor)" },
    { id: 70, name: "Roller Skating" },
    { id: 78, name: "Swimming Pool Games" },
    { id: 82, name: "PC Video Games" },
    { id: 86, name: "Zip Lining" },
  ];

  return (
    <div className="flex w-full h-full flex-col">
      <div className="flex justify-between items-center px-15 h-[88px] border border-gray-500">
        <h1 className="text-3xl text-white ">Settings</h1>
        <h2 className="text-white">Hello</h2>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white font-bold text-xl">
                    Profile
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your profile here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      {categoryIconsData
        .filter((category) => category.icon)
        .map((category) => (
          <div
            key={category.id}
            className="flex justify-between items-center px-15 h-[88px] border border-gray-500"
          >
            <h1 className="text-3xl text-white ">{category.name}</h1>
            {category.icon && <category.icon className="text-white" />}
          </div>
        ))}
    </div>
  );
};

export default Settings;
