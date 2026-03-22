"use client";

import { useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";

const MotionLink = motion.create(Link);


interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  magneticStrength?: number;
  textStrength?: number;
  as?: "button" | "a" | typeof Link;
  [key: string]: any; // Allow other props like target, rel
}

export function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  magneticStrength = 15,
  textStrength = 8,
  as: Component = "button",
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | any>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for returning to center
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  // Text inside moves slightly further than the button background for a 3D parallax effect
  const textX = useTransform(smoothX, (val) => val * (textStrength / magneticStrength));
  const textY = useTransform(smoothY, (val) => val * (textStrength / magneticStrength));

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * (magneticStrength / 50));
    y.set(distanceY * (magneticStrength / 50));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isLink = href !== undefined;

  const commonProps = {
    ref: buttonRef,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: { x: smoothX, y: smoothY },
    className,
    whileTap: { scale: 0.96 },
    ...props,
  };

  if (isLink) {
    const ComponentToUse = Component === "a" ? motion.a : MotionLink;
    return (
      <ComponentToUse href={href} {...commonProps}>
        <motion.div style={{ x: textX, y: textY }} className="relative z-10 w-full h-full flex items-center justify-center">
          {children}
        </motion.div>
      </ComponentToUse>
    );
  }

  return (
    <motion.button onClick={onClick} {...commonProps}>
      <motion.div style={{ x: textX, y: textY }} className="relative z-10 w-full h-full flex items-center justify-center">
        {children}
      </motion.div>
    </motion.button>
  );
}
