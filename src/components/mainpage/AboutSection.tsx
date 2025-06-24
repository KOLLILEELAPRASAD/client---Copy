'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FaDollarSign, FaClock, FaMobileScreen, FaMagnifyingGlass, FaArrowRight } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import FloatingBubbles from '@/components/mainpage/FloatingBubbles';

// Card data with enhanced styling
const cards = [
  {
    icon: <FaDollarSign />,
    title: 'Affordable Pricing',
    description: 'Competitive rates without compromising on quality. Transparent pricing with no hidden costs.',
    gradient: 'from-emerald-600 to-teal-600',
    shadowColor: 'rgba(16, 185, 129, 0.3)',
  },
  {
    icon: <FaClock />,
    title: 'Quick Turnaround',
    description: 'Efficient development cycles and timely delivery. We respect your deadlines as much as you do.',
    gradient: 'from-purple-600 to-indigo-600',
    shadowColor: 'rgba(139, 92, 246, 0.3)',
  },
  {
    icon: <FaMobileScreen />,
    title: 'Responsive Design',
    description: 'Websites that look and function perfectly on all devices, from desktops to smartphones.',
    gradient: 'from-pink-600 to-rose-600',
    shadowColor: 'rgba(236, 72, 153, 0.3)',
  },
  {
    icon: <FaMagnifyingGlass />,
    title: 'SEO Optimized',
    description: 'Built-in search engine optimization to help your business get discovered online.',
    gradient: 'from-blue-600 to-cyan-600',
    shadowColor: 'rgba(59, 130, 246, 0.3)',
  },
];

// Animation variants
import type { Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const baseItemVariants: Variants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: (custom: number) => ({
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 120,
      damping: 15,
      delay: custom * 0.1,
    },
  }),
};

export default function AboutSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [, setIsTablet] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  return (
    <section className="relative py-16 sm:py-20 md:py-28 overflow-hidden">
      {/* Floating bubbles */}
      <FloatingBubbles count={8} />

      {/* Background grid */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ y: backgroundY }}
      >
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#00000010_1px,transparent_1px),linear-gradient(to_bottom,#00000010_1px,transparent_1px)] bg-[size:60px_60px]"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true, amount: 0.1 }}
        className="container mx-auto px-4 sm:px-6 relative z-10"
      >
        {/* Title Section */}
        <motion.div
          style={{ y: titleY }}
          className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto relative"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)] -z-10" />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent relative"
          >
            About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Us</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
          >
            We’re a passionate team of innovators crafting digital experiences that empower businesses. With cutting-edge technology and a focus on excellence, we turn your vision into impactful, user-friendly websites.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={baseItemVariants}
              whileHover={
                isMounted && !isMobile
                  ? {
                      y: -8,
                      scale: 1.03,
                      boxShadow: `0 12px 24px ${card.shadowColor}, 0 0 0 1px rgba(255,255,255,0.2)`,
                      transition: { type: 'spring', stiffness: 400, damping: 10 },
                    }
                  : undefined
              }
              whileTap={isMounted && isMobile ? { scale: 0.98 } : undefined}
              className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 sm:p-8 border border-white/20 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-purple-50/20 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.5, type: 'spring' }}
                viewport={{ once: true }}
                className={`relative mb-6 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br ${card.gradient} flex items-center justify-center`}
                style={{ boxShadow: `0 8px 16px ${card.shadowColor}, 0 0 0 1px rgba(255,255,255,0.1)` }}
              >
                <div className="text-white text-2xl sm:text-3xl">{card.icon}</div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-xl sm:text-2xl font-bold mb-3 text-gray-900"
              >
                {card.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-base sm:text-lg text-gray-600 leading-relaxed"
              >
                {card.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, type: 'spring' }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 md:mt-20 relative max-w-4xl mx-auto"
        >
          <div className="relative bg-gradient-to-r from-blue-700 via-purple-700 to-blue-800 rounded-2xl p-6 sm:p-8 md:p-10 text-white text-center border border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)] -z-10" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-50 animate-pulse" />
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-xl sm:text-2xl md:text-3xl font-bold mb-4"
            >
              Ready to Transform Your Digital Presence?
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="text-base sm:text-lg mb-6 text-blue-100 max-w-2xl mx-auto"
            >
              Collaborate with us to build a website that elevates your brand and drives success.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2), 0 0 0 2px rgba(255, 255, 255, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 1.2, duration: 0.6, type: 'spring' }}
              className="group px-6 sm:px-8 py-2 sm:py-3 bg-white text-blue-700 rounded-full font-semibold text-base sm:text-lg hover:bg-gray-50 transition-all duration-300 shadow-md relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started Today
                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-purple-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}