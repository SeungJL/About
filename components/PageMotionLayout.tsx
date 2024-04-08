"use client";

import { motion } from "framer-motion";
interface IPageMotionLayout {
  children: React.ReactNode;
}
export default function PageMotionLayout({ children }: IPageMotionLayout) {
  return (
    <motion.div
      className="relative min-h-dvh p-5"
      initial={{ x: 375 }}
      animate={{ x: 0 }}
      exit={{ x: -375 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
