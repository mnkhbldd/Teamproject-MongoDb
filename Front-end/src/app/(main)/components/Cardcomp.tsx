"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Star,
  Heart,
  Bookmark,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import Image from "next/image";

export const AnimatedCards = () => {
  const cards = [
    {
      id: 1,
      title: "nis nis",
      description:
        "Lorem ipsum duptate, modatiosunt nostrum hic commodi quas ducimus placeat?",
      image: "/zazaz.jpg",
      icon: <Star className="h-5 w-5" />,
      color: "from-pink-500 to-rose-500",
    },
    {
      id: 2,
      title: "Tilt uu;2i",
      description:
        "Lorem ipsum d consequatur sapiente laborumae perspiciatis minus veniam?",
      image: "/img4.jpg",
      icon: <Heart className="h-5 w-5" />,
      color: "from-purple-500 to-indigo-500",
    },
    {
      id: 3,
      title: "Cooenadsrj",
      description: "Hover to refdsaopjprew dsaj pema oth transition.",
      image: "/img.jpg",
      icon: <Bookmark className="h-5 w-5" />,
      color: "from-amber-500 to-orange-500",
    },
    {
      id: 4,
      title: "nod",
      description:
        "Tfdsafj pkewa  rjewajdsma kf dskafhjosa hifodsnalkfh slkafdlk hover.",
      image: "/img6.jpg",
      icon: <Zap className="h-5 w-5" />,
      color: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 8px rgb(244 114 182 / 0.6)",
          }}
          transition={{ type: "spring", stiffness: 300 }}
          className="flex"
        >
          <Card className="flex flex-1 flex-col overflow-hidden">
            <div className="relative h-48 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 opacity-80" />
              <Image
                src={cards[0].image || "/placeholder.svg"}
                alt={cards[0].title}
                fill
                className="object-cover"
              />
              <motion.div
                className="absolute right-4 top-4 rounded-full bg-white p-2 text-pink-500"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                {cards[0].icon}
              </motion.div>
            </div>
            <CardHeader>
              <CardTitle>{cards[0].title}</CardTitle>
              <CardDescription>{cards[0].description}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                See More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex"
        >
          <Card className="flex flex-1 flex-col overflow-hidden">
            <motion.div
              className="relative h-48 overflow-hidden"
              whileHover={{ perspective: 1000 }}
            >
              <motion.div
                whileHover={{ rotateX: 5, rotateY: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="h-full w-full"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-80" />
                <Image
                  src={cards[1].image || "/placeholder.svg"}
                  alt={cards[1].title}
                  fill
                  className="object-cover"
                />
              </motion.div>
              <motion.div
                className="absolute right-4 top-4 rounded-full bg-white p-2 text-purple-500"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {cards[1].icon}
              </motion.div>
            </motion.div>
            <CardHeader>
              <CardTitle>{cards[1].title}</CardTitle>
              <CardDescription>{cards[1].description}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600">
                See More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="flex"
        >
          <Card className="flex flex-1 flex-col overflow-hidden">
            <div className="relative h-48 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 opacity-80" />
              <Image
                src={cards[2].image || "/placeholder.svg"}
                alt={cards[2].title}
                fill
                className="object-cover"
              />
              <motion.div
                className="absolute right-4 top-4 rounded-full bg-white p-2 text-amber-500"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {cards[2].icon}
              </motion.div>
            </div>
            <CardHeader>
              <CardTitle>{cards[2].title}</CardTitle>
              <CardDescription>{cards[2].description}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <motion.div
                initial={{ height: "auto" }}
                whileHover={{ height: "auto" }}
                className="w-full"
              >
                <Button className="bg-gradient-to-r  from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                  See More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.04 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="flex"
        >
          <Card className="flex flex-1 flex-col overflow-hidden">
            <div className="relative h-48 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-80" />
              <Image
                src={cards[3].image || "/placeholder.svg"}
                alt={cards[3].title}
                fill
                className="object-cover"
              />
              <ParticleEffect />
              <motion.div
                className="absolute right-4 top-4 rounded-full bg-white p-2 text-emerald-500"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {cards[3].icon}
              </motion.div>
            </div>
            <CardHeader>
              <CardTitle>{cards[3].title}</CardTitle>
              <CardDescription>{cards[3].description}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                See More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

function ParticleEffect() {
  return (
    <motion.div
      initial="hidden"
      whileHover="visible"
      className="absolute inset-0 pointer-events-none"
    >
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-2 w-2 rounded-full bg-white"
          initial={{
            x: Math.random() * 100 + 50,
            y: Math.random() * 100 + 50,
            opacity: 0,
          }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: [0, 0.8, 0],
              x: Math.random() * 200,
              y: Math.random() * 200,
              transition: {
                repeat: Number.POSITIVE_INFINITY,
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
              },
            },
          }}
        />
      ))}
    </motion.div>
  );
}
