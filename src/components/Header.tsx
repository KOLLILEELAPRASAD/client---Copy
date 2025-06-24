
'use client';

import { motion } from 'framer-motion';
import { FaPhone } from 'react-icons/fa6';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import Link from 'next/link';
import { useState } from 'react';

// Navigation items with section IDs or links
const navItems = [
  { name: 'Services', color: 'bg-gradient-to-r from-blue-600 to-blue-700', sectionId: 'services-available' },
  { name: 'Projects', color: 'bg-gradient-to-r from-indigo-600 to-indigo-700', sectionId: 'projects' },
  { name: 'About', color: 'bg-gradient-to-r from-cyan-600 to-cyan-700', link: '/about' },
  { name: 'Contact', color: 'bg-gradient-to-r from-purple-600 to-purple-700', sectionId: 'contact' },
];

// Animation variants
const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle navigation (scroll or route)
  const navigate = (item: typeof navItems[0]) => {
    if (item.link) {
      window.location.href = item.link; // Use window.location for full navigation
      setIsMenuOpen(false);
    } else if (item.sectionId) {
      const section = document.getElementById(item.sectionId);
      if (section) {
        const headerHeight = 80; // Adjust for fixed header
        window.scrollTo({
          top: section.offsetTop - headerHeight,
          behavior: 'smooth',
        });
        setIsMenuOpen(false);
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed w-full bg-white/10 backdrop-blur-md glassmorphic border-b border-white/10 z-50 py-2"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <motion.h1
              className="text-3xl sm:text-4xl font-bold tracking-tighter bg-gradient-to-r from-blue-900 to-purple-900 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              aria-label="CoreBlock Homepage"
            >
              CORE<span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">B</span>LOCK
            </motion.h1>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-2xl text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <RiCloseLine /> : <RiMenu3Line />}
          </button>

          {/* Navigation */}
          <motion.nav
            variants={navVariants}
            initial="hidden"
            animate="visible"
            className={`${
              isMenuOpen ? 'flex' : 'hidden'
            } lg:flex flex-col lg:flex-row absolute lg:relative top-full left-0 right-0 lg:top-auto bg-white/10 glassmorphic lg:bg-transparent p-4 lg:p-0 mt-2 lg:mt-0 shadow-lg lg:shadow-none items-center gap-4 transition-all duration-300 ease-in-out w-full lg:w-auto`}
          >
            {navItems.map((item) => (
              <motion.div key={item.name} variants={itemVariants}>
                {item.link ? (
                  <Link href={item.link}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-2 rounded-full ${item.color} text-white font-medium w-full lg:w-auto neon-pulse holo-glow`}
                      aria-label={`Navigate to ${item.name} page`}
                    >
                      {item.name}
                    </motion.button>
                  </Link>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(item)}
                    className={`px-6 py-2 rounded-full ${item.color} text-white font-medium w-full lg:w-auto neon-pulse holo-glow`}
                    aria-label={`Scroll to ${item.name} section`}
                  >
                    {item.name}
                  </motion.button>
                )}
              </motion.div>
            ))}
            <motion.a
              href="tel:9390554007"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium w-full lg:w-auto neon-pulse holo-glow"
              aria-label="Call us at 9390554007"
            >
              <FaPhone className="text-sm" />
              <span>9390554007</span>
            </motion.a>
          </motion.nav>
        </div>
      </div>
    </motion.header>
  );
}
