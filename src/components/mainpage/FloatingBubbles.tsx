'use client';

import React, { useEffect, useState } from 'react';

interface FloatingBubblesProps {
  count?: number;
  className?: string;
}

interface Bubble {
  id: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

// Move bubble generation to a separate function that can be used with useEffect
const generateBubbles = (count: number) => {
  return Array.from({ length: count }).map((_, index) => {
    const size = Math.floor(Math.random() * 120) + 80; // 80-200px for better visibility
    const colors = ['blue', 'indigo', 'cyan', 'purple', 'teal'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const duration = Math.floor(Math.random() * 15) + 10; // 10-25s (not used for static)
    const delay = Math.random() * 2; // (not used for static)

    // Distribute bubbles evenly across the viewport
    const sections = [
      { xMin: 5, xMax: 30, yMin: 5, yMax: 30 },     // Top left
      { xMin: 70, xMax: 95, yMin: 5, yMax: 30 },    // Top right
      { xMin: 5, xMax: 30, yMin: 70, yMax: 95 },    // Bottom left
      { xMin: 70, xMax: 95, yMin: 70, yMax: 95 },   // Bottom right
      { xMin: 40, xMax: 60, yMin: 40, yMax: 60 },   // Center
      { xMin: 20, xMax: 40, yMin: 40, yMax: 60 },   // Middle left
      { xMin: 60, xMax: 80, yMin: 40, yMax: 60 },   // Middle right
      { xMin: 40, xMax: 60, yMin: 10, yMax: 30 }    // Top middle
    ];

    // Select a section based on index
    const section = sections[index % sections.length];

    // Generate position within the selected section
    const x = Math.random() * (section.xMax - section.xMin) + section.xMin;
    const y = Math.random() * (section.yMax - section.yMin) + section.yMin;

    // Random velocities (not used for static)
    const vx = (Math.random() * 2 - 1) * 3; // -3 to 3
    const vy = (Math.random() * 2 - 1) * 3; // -3 to 3

    return {
      id: index,
      size,
      color,
      duration,
      delay,
      x,
      y,
      vx,
      vy
    };
  });
};

export default function FloatingBubbles({
  count = 8,
  className = ''
}: FloatingBubblesProps) {
  // Use null as initial state to prevent hydration mismatch
  const [bubbles, setBubbles] = useState<Bubble[] | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Only run on client-side after hydration is complete
  useEffect(() => {
    // Generate bubbles only on client-side
    setBubbles(generateBubbles(count));
    setIsMounted(true);

    // Cleanup function to handle component unmounting
    return () => {
      setBubbles(null);
      setIsMounted(false);
    };
  }, [count]);

  // Don't render anything during SSR or before hydration is complete
  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    >
      {bubbles && bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="fixed rounded-full"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            backgroundColor: bubble.color === 'blue' ? 'rgba(59, 130, 246, 0.15)' :
                            bubble.color === 'indigo' ? 'rgba(99, 102, 241, 0.15)' :
                            bubble.color === 'cyan' ? 'rgba(6, 182, 212, 0.15)' :
                            bubble.color === 'purple' ? 'rgba(168, 85, 247, 0.15)' :
                            'rgba(20, 184, 166, 0.15)', // teal
            backgroundImage: bubble.color === 'blue' ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.2))' :
                            bubble.color === 'indigo' ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(79, 70, 229, 0.2))' :
                            bubble.color === 'cyan' ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(8, 145, 178, 0.2))' :
                            bubble.color === 'purple' ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(147, 51, 234, 0.2))' :
                            'linear-gradient(135deg, rgba(20, 184, 166, 0.2), rgba(13, 148, 136, 0.2))', // teal
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.03)',
            zIndex: -1
          }}
        />
      ))}
    </div>
  );
}