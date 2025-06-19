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
  Mail,
  Phone,
  MapPin,
  Heart,
  Users,
  Briefcase,
  Home,
} from "lucide-react";

import { useRouter } from "next/navigation";

export const EnhancedFooter = () => {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const { push } = useRouter();

  const handleNavigate = (route: string) => {
    console.log("Navigating to:", route);
    push(route);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {};

  const glowVariants = {
    initial: { scale: 1, boxShadow: "0 0 0px rgba(139, 92, 246, 0)" },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)",
      transition: { duration: 0.3 },
    },
  };

  const socialIcons = [
    { Icon: Facebook, name: "facebook", color: "#1877F2" },
    { Icon: Twitter, name: "twitter", color: "#1DA1F2" },
    { Icon: Instagram, name: "instagram", color: "#E4405F" },
    { Icon: Linkedin, name: "linkedin", color: "#0A66C2" },
    { Icon: Github, name: "github", color: "#fff" },
  ];

  const mainRoutes = [
    { label: "Home", value: "/", icon: Home },
    { label: "About us", value: "/AboutUs", icon: Users },
  ];

  const serviceRoutes = [
    { label: "Phone app", value: "/Phoneapp", icon: Phone },

    { label: "Map and Lists", value: "/Explore", icon: MapPin },
  ];

  return (
    <motion.footer
      className="relative bg-gray-900 text-white flex justify-between overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-footer-mesh opacity-10" />
      <div className="absolute inset-0 bg-cyber-grid bg-[size:20px_20px]" />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${50 + Math.random() * 50}%`,
            }}
          />
        ))}
      </div>

      <div className="relative container mx-auto px-4 py-16">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-60 md:grid-cols-2 lg:grid-cols-3  pb-10">
          {/* Company Info */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <motion.h3
              className="mb-6 text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              TimeMaster
            </motion.h3>
            <motion.div
              className="mb-6 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "80%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
            <p className="mb-6 text-slate-300 leading-relaxed">
              Цагаа ухаалгаар зарцуулж, амжилтад хүрцгээе! Өдөр бүрийг үр дүнтэй
              өнгөрүүлэх нь амжилтын түлхүүр.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-slate-400">
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ x: 5, color: "#a855f7" }}
              >
                <Mail size={16} />
                <span>Freely.com</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ x: 5, color: "#a855f7" }}
              >
                <Phone size={16} />
                <span>+976 9999-9999</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ x: 5, color: "#a855f7" }}
              >
                <MapPin size={16} />
                <span>Ulaanbaatar, Mongolia</span>
              </motion.div>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-8">
              {socialIcons.map(({ Icon, name, color }) => (
                <motion.a
                  key={name}
                  href="#"
                  className="p-3 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50"
                  variants={glowVariants}
                  initial="initial"
                  whileHover="hover"
                  onMouseEnter={() => setHoveredSocial(name)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  style={{
                    background:
                      hoveredSocial === name
                        ? `linear-gradient(135deg, ${color}20, transparent)`
                        : undefined,
                  }}
                >
                  <Icon
                    size={20}
                    className={
                      hoveredSocial === name ? "text-white" : "text-slate-300"
                    }
                  />
                  <span className="sr-only">{name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Main Navigation */}
          <motion.div variants={itemVariants}>
            <h3 className="mb-6 text-xl font-bold flex items-center gap-2">
              <Home size={20} className="text-purple-400" />
              Main routes
            </h3>
            <motion.div
              className="mb-6 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "60%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
            <ul className="space-y-3">
              {mainRoutes.map((item, index) => (
                <motion.li key={index}>
                  <motion.button
                    onClick={() => handleNavigate(item.value)}
                    className="flex items-center gap-3 text-slate-300 hover:text-white group transition-all duration-300 w-full text-left"
                    whileHover={{ x: 8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon
                      size={16}
                      className="text-purple-400 group-hover:text-purple-300"
                    />
                    <span className="group-hover:text-purple-300">
                      {item.label}
                    </span>
                    <ArrowRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div className="flex flex-col" variants={itemVariants}>
            <h3 className="mb-6 text-xl font-bold flex items-center gap-2">
              <Briefcase size={20} className="text-blue-400" />
              Service
            </h3>
            <motion.div
              className="mb-6 h-1  bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "70%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.8 }}
            />
            <ul className="space-y-3">
              {serviceRoutes.map((item, index) => (
                <motion.li key={index}>
                  <motion.button
                    onClick={() => handleNavigate(item.value)}
                    className="flex items-center gap-3 text-slate-300 hover:text-white group transition-all duration-300 w-full text-left"
                    whileHover={{ x: 8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon
                      size={16}
                      className="text-blue-400 group-hover:text-blue-300"
                    />
                    <span className="group-hover:text-blue-300">
                      {item.label}
                    </span>
                    <ArrowRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter & Extra Links */}
        </div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-slate-800/50 pt-8"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.p
              className="text-slate-400 text-sm flex items-center gap-2"
              whileHover={{ color: "#a855f7" }}
            >
              <Heart size={16} className="text-red-400" />©
              {new Date().getFullYear()} TimeMaster. Secured by pinecone.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};
