'use client';

import { motion, useInView, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import {  useEffect, useRef, useState, useCallback } from 'react';
import { FaArrowRight, FaEye, FaCode, FaRocket, FaShoppingCart, FaBriefcase, FaChartLine, FaBlog, FaMobile, FaGraduationCap, FaPalette, FaChevronLeft, FaChevronRight, FaPlay, FaStar, FaClock } from 'react-icons/fa';

// Enhanced project data with more realistic details
const projects = [
  {
    id: 1,
    name: 'ShopTrend E-Commerce',
    category: 'E-Commerce',
    icon: FaShoppingCart,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&crop=center',
    description: 'A cutting-edge e-commerce platform built for a leading retail brand, featuring AI-powered recommendations, secure payment processing, and advanced analytics.',
    details: [
      '10,000+ SKUs managed',
      '35% conversion rate increase',
      'Mobile-first responsive design',
      'Stripe & PayPal integration'
    ],
    tech: ['Next.js', 'Node.js', 'MongoDB', 'Stripe API'],
    link: 'https://shoptrend.example.com',
    featured: true,
    rating: 4.9,
    duration: '6 months',
    year: '2024'
  },
  {
    id: 2,
    name: 'Corporate Portfolio',
    category: 'Business',
    icon: FaBriefcase,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&crop=center',
    description: 'A sleek portfolio for a global consulting firm showcasing expertise with dynamic case studies and advanced lead generation.',
    details: [
      'Interactive case studies',
      'Lead generation system',
      'Multi-language support',
      'CRM integration'
    ],
    tech: ['React', 'TypeScript', 'Tailwind', 'Sanity CMS'],
    link: 'https://corporate.example.com',
    rating: 4.7,
    duration: '4 months',
    year: '2024'
  },
  {
    id: 3,
    name: 'SaaS Analytics Dashboard',
    category: 'SaaS',
    icon: FaChartLine,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center',
    description: 'A comprehensive cloud-based dashboard offering real-time analytics, user management, and advanced reporting for growing businesses.',
    details: [
      '5,000+ active users',
      'Real-time data processing',
      'Advanced reporting suite',
      'Role-based access control'
    ],
    tech: ['Vue.js', 'Python', 'PostgreSQL', 'AWS'],
    link: 'https://saas.example.com',
    featured: true,
    rating: 4.8,
    duration: '8 months',
    year: '2023'
  },
  {
    id: 4,
    name: 'Digital Magazine Platform',
    category: 'Publishing',
    icon: FaBlog,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop&crop=center',
    description: 'A content-rich platform for lifestyle publishers optimized for SEO, reader engagement, and monetization strategies.',
    details: [
      '100,000+ monthly visitors',
      'Advanced SEO optimization',
      'Subscription management',
      'Content recommendation engine'
    ],
    tech: ['WordPress', 'PHP', 'MySQL', 'Redis'],
    link: 'https://magazine.example.com',
    rating: 4.6,
    duration: '5 months',
    year: '2024'
  },
  {
    id: 5,
    name: 'FitTrack Mobile App',
    category: 'Mobile',
    icon: FaMobile,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center',
    description: 'A high-conversion landing page and app ecosystem for a fitness platform driving massive user acquisition.',
    details: [
      '50,000+ app downloads',
      'Push notification system',
      'Social sharing features',
      'In-app purchase integration'
    ],
    tech: ['React Native', 'Node.js', 'Firebase', 'Stripe'],
    link: 'https://fittrack.example.com',
    rating: 4.5,
    duration: '7 months',
    year: '2023'
  },
  {
    id: 6,
    name: 'EduLearn LMS Platform',
    category: 'Education',
    icon: FaGraduationCap,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&crop=center',
    description: 'A comprehensive Learning Management System supporting interactive courses, assessments, and student progress tracking.',
    details: [
      '20,000+ active students',
      '1,000+ courses available',
      'Interactive assessments',
      'Progress analytics'
    ],
    tech: ['Django', 'React', 'PostgreSQL', 'WebRTC'],
    link: 'https://edulearn.example.com',
    featured: true,
    rating: 4.9,
    duration: '10 months',
    year: '2023'
  },
  {
    id: 7,
    name: 'Creative Portfolio Showcase',
    category: 'Portfolio',
    icon: FaPalette,
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=600&fit=crop&crop=center',
    description: 'An immersive portfolio experience for a design agency featuring interactive 3D elements and client testimonials.',
    details: [
      'Interactive 3D elements',
      'Client testimonial system',
      'Project case studies',
      'Contact form integration'
    ],
    tech: ['Three.js', 'GSAP', 'Nuxt.js', 'GraphQL'],
    link: 'https://creative.example.com',
    rating: 4.8,
    duration: '6 months',
    year: '2024'
  }
];

import type { Variants } from 'framer-motion';

// Enhanced animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.8
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      duration: 0.6
    }
  },
  hover: {
    y: -8,
    scale: 1.03,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20,
      duration: 0.3
    }
  }
};

const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 100
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      duration: 0.5
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 100,
    transition: {
      duration: 0.3
    }
  }
};

type Project = typeof projects[number];

export default function EnhancedNetflixStyleProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState('All');
  const [hoveredProject,] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 }); // Lowered amount for reliability
  const lastScrollY = useRef<number>(0);

  // Motion values for smooth dragging
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);

  const categories = ['All', ...new Set(projects.map(p => p.category))];
  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);
  
  const itemsPerSlide = 3; // Show 3 items at once
  const maxIndex = Math.max(0, filteredProjects.length - itemsPerSlide);

  // Lock scroll position during slide transitions
  const lockScroll = useCallback(() => {
    lastScrollY.current = window.scrollY;
    document.body.style.overflow = 'hidden';
  }, []);

  const restoreScroll = useCallback(() => {
    document.body.style.overflow = '';
    window.scrollTo(0, lastScrollY.current);
  }, []);

  // Enhanced slide function with smoother transitions and scroll locking
  const slideToIndex = useCallback((newIndex: number) => {
    if (isAnimating) return;
    
    lockScroll();
    const clampedIndex = Math.max(0, Math.min(newIndex, maxIndex));
    if (clampedIndex === currentIndex) {
      restoreScroll();
      return;
    }
    
    setIsAnimating(true);
    setCurrentIndex(clampedIndex);
    
    // Reset animation lock and restore scroll after transition
    setTimeout(() => {
      setIsAnimating(false);
      restoreScroll();
    }, 500);
  }, [currentIndex, maxIndex, isAnimating, lockScroll, restoreScroll]);

  const nextSlide = useCallback(() => {
    slideToIndex(currentIndex >= maxIndex ? 0 : currentIndex + 1);
  }, [currentIndex, maxIndex, slideToIndex]);

  const prevSlide = useCallback(() => {
    slideToIndex(currentIndex <= 0 ? maxIndex : currentIndex - 1);
  }, [currentIndex, maxIndex, slideToIndex]);

  // Prevent scrolling during drag
  const handleDragStart = (event: MouseEvent | TouchEvent | PointerEvent) => {
    event.preventDefault();
    lockScroll();
  };

  // Handle drag end
  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 100;
    
    if (info.offset.x > threshold) {
      prevSlide();
    } else if (info.offset.x < -threshold) {
      nextSlide();
    } else {
      restoreScroll();
    }
  };

  // Auto-slide functionality
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      if (!hoveredProject && !selectedProject) {
        nextSlide();
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [nextSlide, hoveredProject, selectedProject, isInView]);

  // Reset when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [filter]);

  const getVisibleProjects = () => {
    return filteredProjects.slice(currentIndex, currentIndex + itemsPerSlide);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-20 " // Added min-h-screen for visibility
    >
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-20 -left-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/2 -right-20 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-3xl"
          animate={{
            x: [0, -120, 0],
            y: [0, 80, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute -bottom-20 left-1/3 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -60, 0],
            y: [0, -100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600/20 backdrop-blur-md rounded-full text-red-400 text-sm font-medium mb-8 border border-red-500/30"
            initial={{ scale: 0, rotate: -10 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ 
              delay: 0.3, 
              type: "spring", 
              stiffness: 200,
              damping: 15
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(239, 68, 68, 0.3)"
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <FaRocket className="text-lg" />
            </motion.div>
            Our Latest Work
          </motion.div>
          
          <motion.h2 
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-red-600 via-red-500 to-red-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Featured Projects
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Discover our portfolio of cutting-edge digital solutions that transform businesses 
            and create extraordinary user experiences.
          </motion.p>
        </motion.div>

        {/* Enhanced Filter Categories */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-8 py-4 rounded-2xl font-medium transition-all duration-500 border backdrop-blur-md ${
                filter === category
                  ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-2xl shadow-red-500/25 border-red-400'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/70 hover:text-white border-gray-600 hover:border-gray-500'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                y: -2,
                boxShadow: filter === category 
                  ? "0 10px 40px rgba(239, 68, 68, 0.4)"
                  : "0 10px 30px rgba(0, 0, 0, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Enhanced Netflix-Style Slider */}
        <div className="relative mb-16">
          {/* Navigation Arrows */}
          <AnimatePresence>
            {filteredProjects.length > itemsPerSlide && (
              <>
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onClick={prevSlide}
                  disabled={isAnimating}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-black/80 hover:bg-red-600 text-white w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-gray-700 hover:border-red-500 disabled:opacity-50"
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 0 30px rgba(239, 68, 68, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaChevronLeft className="text-lg" />
                </motion.button>
                
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onClick={nextSlide}
                  disabled={isAnimating}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-black/80 hover:bg-red-600 text-white w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-gray-700 hover:border-red-500 disabled:opacity-50"
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 0 30px rgba(239, 68, 68, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaChevronRight className="text-lg" />
                </motion.button>
              </>
            )}
          </AnimatePresence>

          {/* Projects Container */}
          <motion.div
            ref={containerRef}
            className="px-12 touch-none"
            style={{ x, opacity, touchAction: 'none', overscrollBehavior: 'contain' }}
            drag="x"
            dragConstraints={{ left: -100, right: 100 }}
            dragElastic={0.2}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <AnimatePresence mode="popLayout">
                {getVisibleProjects().map((project, ) => {
                  const IconComponent = project.icon;
                  const isHovered = hoveredProject === project.id;
                  
                  return (
                    <motion.div
                      key={`${project.id}-${currentIndex}`}
                      className="relative group cursor-pointer"
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      whileHover="hover"
                    >
                      {/* Main Project Card */}
                      <motion.div 
                        className="relative h-[550px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50"
                        whileHover={{
                          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5), 0 0 50px rgba(239, 68, 68, 0.1)",
                        }}
                      >
                        {/* Project Image */}
                        <div className="relative h-64 overflow-hidden">
                          <motion.img
                            src={project.image}
                            alt={project.name}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                          />
                          
                          {/* Enhanced Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                          
                          {/* Featured Badge */}
                          {project.featured && (
                            <motion.div 
                              className="absolute top-4 right-4"
                              initial={{ scale: 0, rotate: -45 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              <div className="bg-gradient-to-r from-red-600 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                FEATURED
                              </div>
                            </motion.div>
                          )}
                          
                          {/* Category Icon */}
                          <motion.div 
                            className="absolute top-4 left-4"
                            whileHover={{ scale: 1.2, rotate: 10 }}
                          >
                            <div className="w-10 h-10 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center border border-gray-600">
                              <IconComponent className="text-red-400 text-lg" />
                            </div>
                          </motion.div>

                          {/* Play Button Overlay */}
                          <AnimatePresence>
                            {isHovered && (
                              <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              >
                                <motion.button
                                  className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center shadow-2xl"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  exit={{ scale: 0 }}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => window.open(project.link, '_blank')}
                                >
                                  <FaPlay className="text-xl ml-1" />
                                </motion.button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Project Info */}
                        <div className="p-6">
                          <motion.h3 
                            className="text-white font-bold text-xl mb-3 line-clamp-1"
                            whileHover={{ color: "#ef4444" }}
                          >
                            {project.name}
                          </motion.h3>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                            <div className="flex items-center gap-1">
                              <FaStar className="text-yellow-500" />
                              <span>{project.rating}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FaClock />
                              <span>{project.duration}</span>
                            </div>
                            <span className="px-2 py-1 bg-red-600/20 text-red-400 rounded-full text-xs">
                              {project.year}
                            </span>
                          </div>
                          
                          <p className="text-gray-300 text-sm line-clamp-3 mb-4 leading-relaxed">
                            {project.description}
                          </p>
                          
                          {/* Tech Stack */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tech.slice(0, 3).map((tech) => (
                              <motion.span
                                key={tech}
                                className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-lg text-xs border border-gray-600"
                                whileHover={{ 
                                  backgroundColor: "rgba(239, 68, 68, 0.2)",
                                  borderColor: "rgba(239, 68, 68, 0.5)",
                                  color: "#fca5a5"
                                }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                            {project.tech.length > 3 && (
                              <span className="px-3 py-1 bg-gray-700/50 text-gray-400 rounded-lg text-xs">
                                +{project.tech.length - 3}
                              </span>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3">
                            <motion.button
                              onClick={() => setSelectedProject(project)}
                              className="flex-1 bg-gradient-to-r from-red-600 to-red-500 text-white py-3 px-4 rounded-xl font-medium text-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                              whileHover={{ scale: 1.02, y: -1 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <FaCode />
                              View Details
                            </motion.button>
                            <motion.button
                              onClick={() => window.open(project.link, '_blank')}
                              className="px-4 py-3 bg-gray-700/50 text-gray-300 rounded-xl hover:bg-gray-600/50 hover:text-white transition-all duration-300 border border-gray-600"
                              whileHover={{ scale: 1.05, borderColor: "#ef4444" }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <FaEye />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Enhanced Progress Indicators */}
          {filteredProjects.length > itemsPerSlide && (
            <div className="flex justify-center mt-12 gap-3">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => slideToIndex(index)}
                  className="relative"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div 
                    className={`w-12 h-1.5 rounded-full transition-all duration-500 ${
                      index === currentIndex ? 'bg-red-600' : 'bg-gray-600'
                    }`}
                  />
                  {index === currentIndex && (
                    <motion.div
                      className="absolute inset-0 bg-red-400 rounded-full"
                      layoutId="activeIndicator"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          )}
        </div>

        {/* Enhanced Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
        >
          <motion.button
            className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white px-12 py-6 rounded-2xl font-bold text-xl flex items-center gap-4 mx-auto hover:shadow-2xl transition-all duration-500 border border-red-500/50"
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              boxShadow: "0 20px 60px rgba(239, 68, 68, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Project
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FaArrowRight className="text-xl" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>

      {/* Enhanced Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-gradient-to-br from-gray-900 to-black rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700/50 shadow-2xl"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Modal Header */}
              <div className="relative">
                <motion.img
                  src={selectedProject.image}
                  alt={selectedProject.name}
                  className="w-full h-80 object-cover rounded-t-3xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                
                {/* Close Button */}
                <motion.button
                  className="absolute top-4 right-4 w-10 h-10 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-gray-600 hover:bg-red-600/50 hover:border-red-500"
                  onClick={() => setSelectedProject(null)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>

                {/* Project Icon and Category */}
                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center border border-gray-600">
                    {(() => {
                      const IconComponent = selectedProject.icon;
                      return <IconComponent className="text-red-400 text-xl" />;
                    })()}
                  </div>
                  <span className="text-red-400 text-sm font-medium bg-red-600/20 px-3 py-1 rounded-full">
                    {selectedProject.category}
                  </span>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">{selectedProject.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-500" />
                        <span>{selectedProject.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaClock />
                        <span>{selectedProject.duration}</span>
                      </div>
                      <span className="px-2 py-1 bg-red-600/20 text-red-400 rounded-full text-xs">
                        {selectedProject.year}
                      </span>
                    </div>
                  </div>
                  {selectedProject.featured && (
                    <div className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      FEATURED
                    </div>
                  )}
                </div>

                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  {selectedProject.description}
                </p>

                {/* Project Details */}
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-white mb-4">Key Highlights</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedProject.details.map((detail, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center gap-3 text-gray-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                        <span>{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-white mb-4">Technologies Used</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.tech.map((tech) => (
                      <motion.span
                        key={tech}
                        className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-lg text-sm border border-gray-600"
                        whileHover={{ 
                          backgroundColor: "rgba(239, 68, 68, 0.2)",
                          borderColor: "rgba(239, 68, 68, 0.5)",
                          color: "#fca5a5"
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <motion.button
                    onClick={() => window.open(selectedProject.link, '_blank')}
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-500 text-white py-4 px-6 rounded-xl font-medium text-lg flex items-center justify-center gap-3"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaEye />
                    Visit Project
                  </motion.button>
                  <motion.button
                    onClick={() => setSelectedProject(null)}
                    className="px-6 py-4 bg-gray-700/50 text-gray-300 rounded-xl text-lg hover:bg-gray-600/50 hover:text-white border border-gray-600"
                    whileHover={{ scale: 1.02, borderColor: "#ef4444" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}