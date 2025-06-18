"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export const AnimatedFooter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Subscribing email:", email);
    setEmail("");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  const linkHover = {
    scale: 1.05,
    color: "#7c3aed", // Tailwind purple-600
    transition: { duration: 0.2 },
  };

  const iconHover = {
    scale: 1.2,
    rotate: 5,
    transition: { duration: 0.2 },
  };

  return (
    <motion.footer
      className="bg-slate-900 text-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <motion.div variants={itemVariants}>
            <h3 className="mb-4 text-lg font-bold">Company</h3>
            <motion.div
              className="mb-4 h-1 w-10 bg-purple-500"
              initial={{ width: 0 }}
              whileInView={{ width: 40 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.4 }}
            />
            <p className="mb-4 text-slate-300">
              Цагаа ухаалгаар зарцуулж, амжилтад хүрцгээе! Өдөр бүрийг үр дүнтэй
              өнгөрүүлэх нь Амжилтын түлхүүр бөгөөд үр бүтээлтэй амьдралын эхлэл
            </p>
            <div className="flex space-x-4 ">
              <motion.a
                href="#"
                whileHover={iconHover}
                className="text-slate-300 hover:text-white"
              >
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </motion.a>
              <motion.a
                href="#"
                whileHover={iconHover}
                className="text-slate-300 hover:text-white"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </motion.a>
              <motion.a
                href="#"
                whileHover={iconHover}
                className="text-slate-300 hover:text-white"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </motion.a>
              <motion.a
                href="#"
                whileHover={iconHover}
                className="text-slate-300 hover:text-white"
              >
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </motion.a>
              <motion.a
                href="#"
                whileHover={iconHover}
                className="text-slate-300 hover:text-white"
              >
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </motion.a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="mb-4 text-lg font-bold">Үндсэн хэсгүүд</h3>
            <motion.div
              className="mb-4 h-1 w-10 bg-purple-500"
              initial={{ width: 0 }}
              whileInView={{ width: 40 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.4 }}
            />
            <ul className="space-y-2">
              {["Home", "About", "Services", "Contact"].map((item) => (
                <li key={item}>
                  <motion.div whileHover={linkHover}>
                    <Link href="#" className="text-slate-300 hover:text-white">
                      {item}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="mb-4 text-lg font-bold">Үйлчилгээ</h3>
            <motion.div
              className="mb-4 h-1 w-10 bg-purple-500"
              initial={{ width: 0 }}
              whileInView={{ width: 40 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.4 }}
            />
            <ul className="space-y-2">
              {[
                "Утасны апп",
                "Газрын зураг оруулах",
                "Цаг захиалах",
                "SEO",
              ].map((item) => (
                <li key={item}>
                  <motion.div whileHover={linkHover}>
                    <Link href="#" className="text-slate-300 hover:text-white">
                      {item}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="mb-4 text-lg font-bold">
              Цагийг зөв зохион байгуул
            </h3>
            <motion.div
              className="mb-4 h-1 w-10 bg-purple-500"
              initial={{ width: 0 }}
              whileInView={{ width: 40 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.4 }}
            />

            <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-r-none bg-slate-800 text-white placeholder:text-slate-400 focus-visible:ring-purple-500"
                />
                <Button
                  type="submit"
                  className="rounded-l-none bg-purple-600 hover:bg-purple-700"
                >
                  <ArrowRight size={18} />
                </Button>
              </div>
            </form>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 border-t border-slate-800 pt-6 text-center text-sm text-slate-400"
          variants={itemVariants}
        >
          <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link href="#" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white">
              Cookie Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};
