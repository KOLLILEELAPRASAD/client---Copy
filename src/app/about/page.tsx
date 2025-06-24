
'use client';
import Header from '@/components/Header';

import { motion, useInView } from 'framer-motion';
import { Code2, Lightbulb, Rocket, BookOpen, ChevronRight, Target } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import type { Variants } from 'framer-motion';
import type { Icon as IconType } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Features data
const features = [
  {
    icon: Code2,
    title: 'HTML & CSS Mastery',
    description: 'Master the fundamentals of web development with comprehensive HTML and CSS courses designed for all skill levels.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Lightbulb,
    title: 'Frontend Development',
    description: 'Build modern, responsive web applications using the latest frontend technologies and frameworks.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Rocket,
    title: 'JavaScript Deep Dive',
    description: 'From basics to advanced concepts, become a JavaScript expert with hands-on projects and real-world examples.',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: BookOpen,
    title: 'Interactive Learning',
    description: 'Learn by doing with our interactive coding environment and instant feedback system.',
    gradient: 'from-green-500 to-emerald-500',
  },
];

// Course categories data (static to avoid hydration issues)
const courseCategories = [
  { id: 1, name: 'HTML Fundamentals', icon: Code2, lessons: 12, duration: '4h', gradient: 'from-orange-500 to-orange-600' },
  { id: 2, name: 'CSS Styling', icon: Lightbulb, lessons: 15, duration: '5h', gradient: 'from-blue-500 to-blue-600' },
  { id: 3, name: 'JavaScript', icon: Rocket, lessons: 20, duration: '8h', gradient: 'from-yellow-500 to-yellow-600' },
  { id: 4, name: 'React Development', icon: BookOpen, lessons: 18, duration: '7h', gradient: 'from-cyan-500 to-cyan-600' },
  { id: 5, name: 'Frontend Projects', icon: Target, lessons: 10, duration: '6h', gradient: 'from-purple-500 to-purple-600' },
  { id: 6, name: 'Web Design', icon: Lightbulb, lessons: 14, duration: '5h', gradient: 'from-pink-500 to-pink-600' },
];

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: 'spring' } },
};

// Floating bubbles configuration
const bubbleConfigs = [
  { width: '25px', height: '25px', left: '15%', top: '20%', animationDelay: '0s', animationDuration: '14s' },
  { width: '35px', height: '35px', left: '85%', top: '30%', animationDelay: '1s', animationDuration: '11s' },
  { width: '20px', height: '20px', left: '30%', top: '50%', animationDelay: '2s', animationDuration: '17s' },
  { width: '30px', height: '30px', left: '70%', top: '70%', animationDelay: '3s', animationDuration: '13s' },
];

export default function CoreBlockAbout() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const router = useRouter();

  // Scroll to contact section
  const scrollToContact = () => {
    router.push('/#contact');
  };

  return (
    <>
      <Header />
      
    <section id="about" ref={sectionRef} className="relative min-h-screen py-20 sm:py-24 md:py-32 overflow-hidden bg-gradient-to-b from-transparent to-blue-900/10">
      {/* Floating Bubbles */}
      <div className="absolute inset-0 z-0">
        {bubbleConfigs.map((config, i) => (
          <div
            key={i}
            className="absolute bg-blue-400/15 rounded-full animate-float holo-glow"
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

      {/* Background Grid */}
      <motion.div
        className="absolute inset-0 opacity-15"
        animate={isInView ? { y: [0, -20, 0] } : {}}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f620_1px,transparent_1px),linear-gradient(to_bottom,#3b82f620_1px,transparent_1px)] bg-[size:40px_40px]" />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16 sm:mb-20 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-blue-400/20 backdrop-blur-sm glassmorphic mb-4"
            variants={itemVariants}
          >
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-blue-300">About CoreBlock</span>
          </motion.div>
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-900 to-purple-900 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Empowering <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Developers</span> Worldwide
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            CoreBlock is your gateway to mastering web development. From HTML basics to advanced frontend frameworks, our hands-on courses empower you to build the future.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link href="/signup">
              
            </Link>
          </motion.div>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          className="mb-16 sm:mb-20 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-4"
            variants={itemVariants}
          >
            <Target className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-sm font-semibold text-blue-800">Our Mission</span>
          </motion.div>
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-violet mb-6 text-center"
            variants={itemVariants}
          >
            Making Coding <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Accessible</span>
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-gray-700 leading-relaxed text-center"
            variants={itemVariants}
          >
            We believe coding education should be engaging, practical, and accessible to all. Our platform combines interactive learning, real-world projects, and expert mentorship to transform aspiring developers into industry-ready professionals.
          </motion.p>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="mb-16 sm:mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-violet mb-6 text-center"
            variants={itemVariants}
          >
            Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">CoreBlock?</span>
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700 max-w-3xl mx-auto mb-8 text-center"
            variants={itemVariants}
          >
            Our platform offers a unique blend of hands-on learning and cutting-edge curriculum.
          </motion.p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent: typeof IconType = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group glassmorphic rounded-2xl p-6 border border-white/10 holo-glow"
                  whileHover={{ scale: 1.05, boxShadow: '0 15px 30px rgba(59,130,246,0.4)' }}
                >
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 neon-pulse group-hover:scale-110 transition-transform`}
                  >
                    <IconComponent className="w-6 h-6 text-violet" iconNode={[]} />
                  </div>
                  <h3 className="text-xl font-bold text-violet mb-2">{feature.title}</h3>
                  <p className="text-base text-gray-700 mb-4">{feature.description}</p>
                  <Link href="/courses">
                    <div className="flex items-center text-blue-300 font-medium group-hover:translate-x-2 transition-transform">
                      Learn More
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Course Categories Slider */}
        <motion.div
          className="mb-16 sm:mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-violet mb-6 text-center"
            variants={itemVariants}
          >
            Our <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Courses</span>
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700 max-w-3xl mx-auto mb-8 text-center"
            variants={itemVariants}
          >
            Explore our comprehensive curriculum designed for modern web development.
          </motion.p>
          <div className="slider-container">
            <div className="slider-track flex gap-4">
              {[...courseCategories, ...courseCategories].map((category, index) => {
                const IconComponent: typeof IconType = category.icon;
                return (
                  <motion.div
                    key={`${category.id}-${index}`}
                    className="group relative w-64 sm:w-80 flex-shrink-0 glassmorphic rounded-2xl overflow-hidden border border-white/10 holo-glow"
                    whileHover={{ scale: 1.05, zIndex: 10 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div
                          className={`w-12 h-12 rounded-full bg-gradient-to-r ${category.gradient} flex items-center justify-center mr-4 group-hover:scale-110 transition-transform`}
                        >
                          <IconComponent className="w-6 h-6 text-violet" iconNode={[]} />
                        </div>
                        <h3 className="text-lg font-bold text-violet">{category.name}</h3>
                      </div>
                      <p className="text-sm text-gray-700 mb-4">{category.lessons} lessons • {category.duration} duration</p>
                      <Link href="/courses">
                        <div className="flex items-center text-blue-300 font-medium group-hover:translate-x-2 transition-transform">
                          Explore Course
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div
            className="relative glassmorphic rounded-2xl p-8 sm:p-10 text-violet border border-blue-400/20 holo-glow"
            whileHover={{ boxShadow: '0 15px 30px rgba(59,130,246,0.4)' }}
            variants={itemVariants}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Start Your Coding Journey
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg mb-6 text-black-70 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Join thousands of students transforming their careers with CoreBlock’s hands-on courses.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={itemVariants}>
              <Link href="/signup">
                
              </Link>
              <a href="https://github.com/coreblock" target="_blank" rel="noopener noreferrer">
                
              </a>
              <button
                onClick={scrollToContact}
                className="px-8 py-4 bg-black/20 backdrop-blur-sm text-violet rounded-2xl font-semibold text-lg flex items-center gap-2 mx-auto border border-white/30 hover:bg-white/30"
                aria-label="Contact CoreBlock"
              >
                Contact Us
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
    </>
  );
}
