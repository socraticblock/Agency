"use client";

import { useMotionValue, useTransform, useSpring } from "framer-motion";

export function useCardTilt(isResponsive: boolean) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), { stiffness: 150, damping: 25 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    if (isResponsive) {
      const xPct = mouseXPos / width - 0.5;
      const yPct = mouseYPos / height - 0.5;
      mouseX.set(xPct);
      mouseY.set(yPct);
    }

    e.currentTarget.style.setProperty("--mouse-x", `${(mouseXPos / width) * 100}%`);
    e.currentTarget.style.setProperty("--mouse-y", `${(mouseYPos / height) * 100}%`);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return { rotateX, rotateY, handleMouseMove, handleMouseLeave };
}
