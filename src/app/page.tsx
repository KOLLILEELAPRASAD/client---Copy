
'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import Header from '@/components/Header';
import AboutSection from '@/components/mainpage/AboutSection';
import OurProjects from '@/components/mainpage/OurProjects';
import ServicesAvailableSection from '@/components/mainpage/OurServies';
import ContactSection from '@/components/mainpage/ConnectUs';
import { useHasMounted } from '@/utils/client-utils';
import { Safari } from '@/components/magicui/safari';
import Iphone15Pro from '@/components/magicui/iphone-15-pro';
import { FaArrowDown, FaArrowRight } from 'react-icons/fa6';

// Predefined bubble configurations to avoid hydration mismatch
const bubbleConfigs = [
  { width: '30px', height: '30px', left: '10%', top: '20%', animationDelay: '0s', animationDuration: '15s' },
  { width: '40px', height: '40px', left: '80%', top: '30%', animationDelay: '1s', animationDuration: '12s' },
  { width: '25px', height: '25px', left: '25%', top: '50%', animationDelay: '2s', animationDuration: '18s' },
  { width: '35px', height: '35px', left: '60%', top: '70%', animationDelay: '3s', animationDuration: '14s' },
  { width: '45px', height: '45px', left: '15%', top: '40%', animationDelay: '4s', animationDuration: '16s' },
  { width: '20px', height: '20px', left: '90%', top: '60%', animationDelay: '0.5s', animationDuration: '13s' },
  { width: '50px', height: '50px', left: '30%', top: '80%', animationDelay: '1.5s', animationDuration: '17s' },
  { width: '28px', height: '28px', left: '70%', top: '10%', animationDelay: '2.5s', animationDuration: '15s' },
  { width: '38px', height: '38px', left: '50%', top: '25%', animationDelay: '3.5s', animationDuration: '19s' },
  { width: '32px', height: '32px', left: '20%', top: '90%', animationDelay: '4.5s', animationDuration: '11s' },
  { width: '42px', height: '42px', left: '85%', top: '15%', animationDelay: '1s', animationDuration: '14s' },
  { width: '36px', height: '36px', left: '40%', top: '35%', animationDelay: '2s', animationDuration: '16s' },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Page() {
  const hasMounted = useHasMounted();
  const heroRef = useRef<HTMLElement>(null);

  // Scroll to AboutSection
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Floating Bubbles Background */}
      <div className="absolute inset-0 z-0">
        {bubbleConfigs.map((config, i) => (
          <div
            key={i}
            className="absolute bg-blue-400/20 rounded-full animate-float"
            style={{
              width: config.width,
              height: config.height,
              left: config.left,
              top: config.top,
              animationDelay: config.animationDelay,
              animationDuration: config.animationDuration,
            }}
          />
        ))}
      </div>

      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        animate={hasMounted ? { x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
        animate={hasMounted ? { x: [0, -80, 0], y: [0, -40, 0], scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10">
        <Header />
        <section
          id="hero"
          ref={heroRef}
          className="container mx-auto px-4 sm:px-6 pt-24 sm:pt-28 md:pt-32 pb-16"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
          >
            {/* Text Content */}
            <motion.div
              variants={itemVariants}
              className="space-y-6 sm:space-y-8 text-center lg:text-left mx-auto lg:mx-0 max-w-2xl lg:max-w-none"
            >
              {/* Badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-blue-200/30 backdrop-blur-sm"
              >
                <div className="w-2 h-2 bg-gradient-to-r from-blue-800 to-blue-800 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-blue-900">Next-Gen Web Solutions</span>
              </motion.div>

              {/* Headline with Typewriter Effect */}
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
              >
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-800 bg-clip-text text-transparent">
                  Build Smarter,
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-purple-600 to-purple-600 bg-clip-text text-transparent">
                  Scale Faster
                </span>
                <br />
                <span className="text-blue-400 text-3xl sm:text-4xl md:text-5xl lg:text-4xl">
                  with{' '}
                  <Typewriter
                    words={['Web Apps', 'E-Commerce', 'AI Websites', 'Landing Pages']}
                    loop={0}
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="text-lg sm:text-xl md:text-2xl text-gray-800 leading-relaxed font-light"
              >
                We craft{' '}
                <span className="font-semibold text-blue-700">high-performance websites</span> &{' '}
                <span className="font-semibold text-purple-700">web applications</span> that empower
                businesses to grow, automate, and innovate.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59,130,246,0.3)' }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 font-semibold flex items-center justify-center gap-3 text-lg shadow-xl shadow-blue-500/25 relative overflow-hidden group glow-on-hover"
                  aria-label="Get a custom website"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative">Get Custom Website</span>
                  <motion.span
                    animate={hasMounted ? { x: [0, 5, 0] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <FaArrowRight />
                  </motion.span>
                </motion.a>
               
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                variants={itemVariants}
                className="flex items-center justify-center lg:justify-start gap-6 pt-4"
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                      >
                        {i}
                      </div>
                    ))}
                  </div>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-gray-600 font-medium"
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { delay: 1 } }}
                    >
                      50+ Happy Clients
                    </motion.span>
                  </motion.span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400 text-lg">★★★★★</span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 1.2 } }}
                    className="text-sm text-gray-600 font-medium"
                  >
                    4.9/5
                  </motion.span>
                </div>
              </motion.div>
            </motion.div>

            {/* Mockup Section */}
            <motion.div
              variants={itemVariants}
              className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] mt-8 sm:mt-0"
            >
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={hasMounted ? { y: [0, -15, 0], rotate: [0, 1, -1, 0] } : {}}
                transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              >
                <div className="relative w-[90%] sm:w-[95%] h-[240px] sm:h-[320px] md:h-[420px] mx-auto">
                  <div className="relative rounded-2xl shadow-2xl shadow-blue-500/20 bg-gradient-to-br from-white/80 to-blue-50/80 border border-white/50 overflow-hidden backdrop-blur-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 z-10" />
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-sm z-0" />
                    <Safari
                      url="coreblock.dev"
                      className="size-full relative z-20"
                      imageSrc="/mockupdesk.png"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1)_0%,transparent_50%)] z-5" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(147,51,234,0.1)_0%,transparent_50%)] z-5" />
                  </div>
                </div>
                <motion.div
                  className="absolute top-[35%] right-[2%] w-[22%] h-[240px] hidden md:block"
                  animate={hasMounted ? { y: [0, -10, 0], rotate: [0, -2, 2, 0] } : {}}
                  transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 1 }}
                >
                  <div className="relative rounded-[2.5rem] shadow-2xl shadow-purple-500/20 bg-gradient-to-br from-white/90 to-purple-50/80 border border-white/60 overflow-hidden backdrop-blur-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 z-10" />
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-[2.5rem] blur-sm z-0" />
                    <Iphone15Pro
                      className="size-full relative z-20"
                      src="/mockupmobi.png"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.15)_0%,transparent_60%)] z-5" />
                  </div>
                </motion.div>
              </motion.div>
              <motion.div
                className="absolute top-[10%] left-[10%] w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60"
                animate={hasMounted ? { y: [0, -20, 0], x: [0, 10, 0], scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              />
              <motion.div
                className="absolute bottom-[15%] right-[15%] w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60"
                animate={hasMounted ? { y: [0, 15, 0], x: [0, -8, 0], scale: [1, 0.8, 1] } : {}}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              />
            </motion.div>
          </motion.div>

          {/* Scroll Down Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={hasMounted ? { y: [0, 10, 0] } : {}}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <button
              onClick={scrollToAbout}
              className="p-3 rounded-full bg-blue-400/20 border border-blue-400/30 text-blue-300 hover:bg-blue-400/30 transition-all neumorphic"
              aria-label="Scroll to About section"
            >
              <FaArrowDown className="text-lg" />
            </button>
          </motion.div>
        </section>

        <AboutSection />
        <OurProjects />
        <ServicesAvailableSection />
        <ContactSection />
      </div>
    </div>
  );
}
