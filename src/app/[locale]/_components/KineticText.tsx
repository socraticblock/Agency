"use client";

import { motion } from "framer-motion";

interface KineticTextProps {
  text: string;
  className?: string;
  splitBy?: "word" | "char";
  delay?: number;
}

export function KineticText({
  text,
  className = "",
  splitBy = "word",
  delay = 0,
}: KineticTextProps) {
  // Variants for the container to handle staggering
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay * i },
    }),
  };

  // Variants for each individual element (word or char)
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: 20,
      rotateY: -10,
    },
  };

  const words = text.split(" ");
  const chars = text.split("");

  return (
    <motion.div
      variants={container}
      initial={false}
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      style={{
        display: "inline-flex",
        flexWrap: "wrap",
        perspective: "1000px",
      }}
      className={className}
    >
      {splitBy === "word" ? (
        // Split by word
        words.map((word, index) => (
          <motion.span
            variants={child}
            style={{ marginRight: "0.25em", display: "inline-block" }}
            key={index}
          >
            {word}
          </motion.span>
        ))
      ) : (
        // Split by character
        chars.map((char, index) => (
          <motion.span
            variants={child}
            style={{ display: "inline-block" }}
            key={index}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))
      )}
    </motion.div>
  );
}
