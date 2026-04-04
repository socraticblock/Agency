"use client";

export const containerVariants = {
  hidden: { opacity: 0 },
  show: (stagger: number) => ({
    opacity: 1,
    transition: {
      staggerChildren: stagger || 0.1,
      delayChildren: 0.1,
    },
  }),
};

export const itemVariants = (entranceY: number, springDamping: number) => ({
  hidden: {
    opacity: 0,
    y: entranceY || 25,
    scale: 0.98,
    filter: "blur(12px)",
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      damping: springDamping || 18,
      stiffness: 90,
      mass: 1.2,
    },
  },
});
