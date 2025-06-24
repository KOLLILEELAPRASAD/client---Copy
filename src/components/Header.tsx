
'use client';

import { motion } from 'framer-motion';
import { FaPhone } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';

// Navigation items with section IDs for scrolling
const navItems = [
  { name: 'Services', color: 'bg-blue-600 hover:bg-blue-700', sectionId: 'services-available' },
  { name: 'Portfolio', color: 'bg-indigo-600 hover:bg-indigo-700', sectionId: 'projects' },
  { name: 'Contact', color: 'bg-cyan-600 hover:bg-cyan-700', sectionId: 'contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Scroll to section with smooth behavior
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false); // Close mobile menu after click
    }
  };

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-sm shadow-sm z-50 py-2">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold tracking-tighter text-black">
            CORE<span className="text-blue-600">B</span>LOCK
          </h1>

          <button
            className="lg:hidden text-2xl text-black"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <RiCloseLine /> : <RiMenu3Line />}
          </button>

          <nav
            className={`${
              isMenuOpen ? 'flex' : 'hidden'
            } lg:flex flex-col lg:flex-row absolute lg:relative top-full left-0 right-0 lg:top-auto bg-white/95 lg:bg-transparent p-4 lg:p-0 mt-2 lg:mt-0 shadow-lg lg:shadow-none items-center gap-4 transition-all duration-300 ease-in-out w-full lg:w-auto`}
          >
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                whileHover={isMounted ? { scale: 1.05 } : {}}
                whileTap={isMounted ? { scale: 0.95 } : {}}
                onClick={() => scrollToSection(item.sectionId)}
                className={`px-6 py-2 rounded-full ${item.color} text-white transition-colors font-medium w-full lg:w-auto`}
                aria-label={`Navigate to ${item.name} section`}
              >
                {item.name}
              </motion.button>
            ))}
            <motion.a
              href="tel:9390554007"
              whileHover={isMounted ? { scale: 1.05 } : {}}
              whileTap={isMounted ? { scale: 0.95 } : {}}
              className="flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition-colors font-medium w-full lg:w-auto"
              aria-label="Call us at 9390554007"
            >
              <FaPhone className="text-sm" />
              <span>9390554007</span>
            </motion.a>
          </nav>
        </div>
      </div>
    </header>
  );
}