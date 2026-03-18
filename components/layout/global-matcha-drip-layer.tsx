"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import { useMediaQuery } from "@/hooks/use-media-query";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type Anchor = {
  id: string;
  order: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

type Layout = {
  width: number;
  height: number;
  anchors: Anchor[];
  mainPath: Array<{ x: number; y: number }>;
  sidePath: Array<{ x: number; y: number }>;
  mainStroke: string;
  sideStroke: string;
};

const EMPTY_LAYOUT: Layout = {
  width: 0,
  height: 0,
  anchors: [],
  mainPath: [],
  sidePath: [],
  mainStroke: "",
  sideStroke: ""
};

function buildSmoothPath(points: Array<{ x: number; y: number }>) {
  if (points.length < 2) {
    return "";
  }

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    const controlX = (previous.x + current.x) / 2;
    path += ` Q ${controlX} ${previous.y}, ${current.x} ${current.y}`;
  }
  return path;
}

function normalizeTimes(length: number) {
  if (length <= 1) {
    return [0, 1];
  }

  return Array.from({ length }, (_, index) => index / (length - 1));
}

export function GlobalMatchaDripLayer() {
  const [layout, setLayout] = useState<Layout>(EMPTY_LAYOUT);
  const reducedMotion = useReducedMotion();
  const compact = useMediaQuery("(max-width: 860px)");

  useEffect(() => {
    const measure = () => {
      const main = document.querySelector("main");
      if (!main) {
        setLayout(EMPTY_LAYOUT);
        return;
      }

      const mainRect = main.getBoundingClientRect();
      const mainTopAbs = mainRect.top + window.scrollY;
      const width = main.clientWidth;
      const height = main.scrollHeight;

      const anchorNodes = Array.from(
        document.querySelectorAll<HTMLElement>("[data-drip-anchor]")
      );

      const anchors = anchorNodes
        .map((node, index) => {
          const rect = node.getBoundingClientRect();
          const orderAttr = Number(node.dataset.dripOrder);
          return {
            id: node.dataset.dripAnchor || `anchor-${index}`,
            order: Number.isFinite(orderAttr) ? orderAttr : index + 1,
            x: rect.left - mainRect.left,
            y: rect.top + window.scrollY - mainTopAbs,
            width: rect.width,
            height: rect.height
          } satisfies Anchor;
        })
        .sort((a, b) => a.order - b.order);

      const visibleAnchors = compact ? anchors.slice(0, 3) : anchors;

      const start = { x: width * (compact ? 0.7 : 0.66), y: 30 };
      const end = { x: width * 0.52, y: Math.max(120, height - 42) };

      const mainPath: Array<{ x: number; y: number }> = [start];

      visibleAnchors.forEach((anchor) => {
        const impactX = anchor.x + anchor.width * 0.74;
        const impactY = anchor.y + 5;
        const spreadX = anchor.x + anchor.width * 0.67;
        const spreadY = anchor.y + 11;
        const runoffX = anchor.x + anchor.width * 0.3;
        const runoffY = anchor.y + anchor.height + 7;
        mainPath.push({ x: impactX, y: impactY });
        mainPath.push({ x: spreadX, y: spreadY });
        mainPath.push({ x: runoffX, y: runoffY });
      });

      mainPath.push(end);

      const sidePath: Array<{ x: number; y: number }> = compact
        ? [
            { x: width * 0.46, y: 40 },
            { x: width * 0.43, y: height * 0.56 },
            { x: width * 0.4, y: height - 56 }
          ]
        : [
            { x: width * 0.55, y: 34 },
            { x: width * 0.5, y: height * 0.34 },
            { x: width * 0.46, y: height * 0.65 },
            { x: width * 0.42, y: height - 58 }
          ];

      setLayout({
        width,
        height,
        anchors: visibleAnchors,
        mainPath,
        sidePath,
        mainStroke: buildSmoothPath(mainPath),
        sideStroke: buildSmoothPath(sidePath)
      });
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    const main = document.querySelector("main");
    if (main) {
      resizeObserver.observe(main);
    }

    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    const syncTimer = window.setTimeout(measure, 500);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
      window.clearTimeout(syncTimer);
    };
  }, [compact]);

  const mainTimes = useMemo(
    () => normalizeTimes(layout.mainPath.length),
    [layout.mainPath.length]
  );
  const sideTimes = useMemo(
    () => normalizeTimes(layout.sidePath.length),
    [layout.sidePath.length]
  );

  if (layout.width === 0 || layout.height === 0) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[36] overflow-hidden"
    >
      <svg
        viewBox={`0 0 ${layout.width} ${layout.height}`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="global-matcha-dark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(66, 84, 44, 0.78)" />
            <stop offset="48%" stopColor="rgba(58, 73, 38, 0.66)" />
            <stop offset="100%" stopColor="rgba(46, 60, 31, 0.58)" />
          </linearGradient>
        </defs>
        {layout.mainStroke ? (
          <path
            d={layout.mainStroke}
            fill="none"
            stroke="url(#global-matcha-dark)"
            strokeWidth={3.6}
            strokeLinecap="round"
            strokeOpacity={0.3}
          />
        ) : null}
        {layout.sideStroke ? (
          <path
            d={layout.sideStroke}
            fill="none"
            stroke="url(#global-matcha-dark)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeOpacity={0.2}
          />
        ) : null}
      </svg>

      {reducedMotion ? null : (
        <>
          <motion.div
            className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-[48%] bg-gradient-to-b from-matcha-500 via-[#445a2d] to-[#2f3e22] shadow-[0_6px_18px_rgba(43,58,29,0.42)]"
            animate={{
              left: layout.mainPath.map((point) => point.x),
              top: layout.mainPath.map((point) => point.y),
              scaleY: layout.mainPath.map((_, index) =>
                index % 3 === 1 ? 1.85 : index % 3 === 2 ? 1.2 : 1.05
              ),
              scaleX: layout.mainPath.map((_, index) =>
                index % 3 === 1 ? 0.72 : index % 3 === 2 ? 0.92 : 1.08
              )
            }}
            transition={{
              duration: compact ? 8.6 : 9.8,
              repeat: Infinity,
              repeatDelay: 0.65,
              ease: "linear",
              times: mainTimes
            }}
          />

          {!compact ? (
            <motion.div
              className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4a6132]/85 shadow-[0_4px_10px_rgba(39,52,27,0.3)]"
              animate={{
                left: layout.sidePath.map((point) => point.x),
                top: layout.sidePath.map((point) => point.y),
                scaleY: [1, 1.4, 1.1, 0.95],
                scaleX: [1, 0.78, 0.92, 1]
              }}
              transition={{
                duration: 7.6,
                repeat: Infinity,
                repeatDelay: 1.1,
                ease: "linear",
                times: sideTimes
              }}
            />
          ) : null}
        </>
      )}

      {layout.anchors.map((anchor, index) => (
        <div key={anchor.id}>
          <motion.span
            className="absolute h-1.5 rounded-full bg-[#445a2d]/58 blur-[0.2px]"
            style={{
              left: anchor.x + anchor.width * 0.66,
              top: anchor.y + 2,
              width: Math.max(18, anchor.width * 0.1)
            }}
            animate={
              reducedMotion
                ? undefined
                : {
                    scaleX: [0.85, 1.25, 0.95],
                    opacity: [0.2, 0.6, 0.24]
                  }
            }
            transition={{
              duration: 2.1,
              delay: index * 0.5 + 0.35,
              repeat: Infinity,
              repeatDelay: 3.1,
              ease: "easeInOut"
            }}
          />
          <motion.span
            className="absolute h-3 w-2 -translate-x-1/2 rounded-b-full bg-[#3c5028]/66"
            style={{
              left: anchor.x + anchor.width * 0.34,
              top: anchor.y + anchor.height - 2
            }}
            animate={
              reducedMotion
                ? undefined
                : {
                    scaleY: [0.9, 1.7, 0.95],
                    y: [0, 4, 0]
                  }
            }
            transition={{
              duration: 2.5,
              delay: index * 0.42 + 0.9,
              repeat: Infinity,
              repeatDelay: 2.8,
              ease: "easeInOut"
            }}
          />
        </div>
      ))}
    </div>
  );
}
