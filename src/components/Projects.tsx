'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const textOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.1, 0.3], [50, 0]);
  
  const desktopX = useTransform(scrollYProgress, [0.1, 0.5], ['-100%', '0%']);
  const desktopY = useTransform(scrollYProgress, [0.1, 0.5], ['0%', '0%']);
  const desktopOpacity = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);
  const desktopScale = useTransform(scrollYProgress, [0.1, 0.5], [0.9, 1]);

  return (
    <section ref={containerRef} className="min-h-screen relative overflow-hidden py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            style={{
              x: desktopX,
              y: desktopY,
              opacity: desktopOpacity,
              scale: desktopScale
            }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[90%] h-[400px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-3 shadow-2xl mx-auto lg:mr-12"
          >
            <div className="w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl overflow-hidden relative">
              <Image src="/mockupdesk.png" alt="Desktop Mockup" fill className="object-cover rounded-xl" />
              <div className="w-full h-full bg-white/5 rounded-xl border border-white/10 relative z-10" />
            </div>
          </motion.div>

          <motion.div
            style={{
              opacity: textOpacity,
              y: textY
            }}
            className="space-y-6"
          >
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter text-black">
              Transforming Ideas into Digital Reality
            </h2>
            <p className="text-xl text-gray-600">
              We specialize in creating innovative web solutions that help businesses thrive in the digital age. Our projects combine cutting-edge technology with intuitive design to deliver exceptional user experiences.
            </p>
          </motion.div>
        </div>


      </div>
    </section>
  );
}