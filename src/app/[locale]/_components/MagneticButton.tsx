"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

function useTouchSimpleLayout() {
  const [simple, setSimple] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)");
    const noHover = window.matchMedia("(hover: none)");
    const sync = () => setSimple(coarse.matches || noHover.matches);
    sync();
    coarse.addEventListener("change", sync);
    noHover.addEventListener("change", sync);
    return () => {
      coarse.removeEventListener("change", sync);
      noHover.removeEventListener("change", sync);
    };
  }, []);

  return simple;
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
  const touchSimple = useTouchSimpleLayout();
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 80, damping: 20, mass: 0.6 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const textX = useTransform(
    smoothX,
    (val) => val * (textStrength / magneticStrength),
  );
  const textY = useTransform(
    smoothY,
    (val) => val * (textStrength / magneticStrength),
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (touchSimple) return;
    const el = anchorRef.current ?? buttonRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
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

  if (touchSimple) {
    if (isLink) {
      const C = Component === "a" ? "a" : Link;
      if (C === "a") {
        return (
          <a
            href={href}
            className={`touch-manipulation ${className}`.trim()}
            {...props}
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          href={href}
          className={`touch-manipulation ${className}`.trim()}
          {...props}
        >
          {children}
        </Link>
      );
    }
    return (
      <button
        type="button"
        onClick={onClick}
        className={`touch-manipulation ${className}`.trim()}
        {...props}
      >
        {children}
      </button>
    );
  }

  const motionClass = `touch-manipulation ${className}`.trim();

  if (isLink) {
    const inner = (
      <motion.div
        style={{ x: textX, y: textY }}
        className="relative z-10 flex h-full w-full items-center justify-center"
      >
        {children}
      </motion.div>
    );

    if (Component === "a") {
      return (
        <motion.a
          ref={anchorRef}
          href={href}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ x: smoothX, y: smoothY }}
          className={motionClass}
          whileTap={{ scale: 0.96 }}
          {...props}
        >
          {inner}
        </motion.a>
      );
    }

    return (
      <MotionLink
        ref={anchorRef}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: smoothX, y: smoothY }}
        className={motionClass}
        whileTap={{ scale: 0.96 }}
        {...props}
      >
        {inner}
      </MotionLink>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: smoothX, y: smoothY }}
      className={motionClass}
      whileTap={{ scale: 0.96 }}
      {...props}
    >
      <motion.div
        style={{ x: textX, y: textY }}
        className="relative z-10 flex h-full w-full items-center justify-center"
      >
        {children}
      </motion.div>
    </motion.button>
  );
}
