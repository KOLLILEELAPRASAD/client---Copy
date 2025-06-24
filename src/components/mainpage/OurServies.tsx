'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useAnimation, useScroll, useTransform, easeInOut } from 'framer-motion';
import { FaArrowRight, FaTimes, FaRobot, FaBlog, FaRocket, FaGlobe, FaCogs, FaCheck, FaStar, FaLightbulb } from 'react-icons/fa';
import { FaShop } from 'react-icons/fa6';

// Enhanced services data with more details
const services = [
  {
    id: 1,
    name: 'E-commerce',
    icon: FaShop,
    description: 'Next-generation online stores with AI-powered features and seamless user experience.',
    color: 'from-blue-400 via-blue-500 to-indigo-600',
    bgGradient: 'from-blue-900/20 to-indigo-900/20',
    pricing: 'Starting at $2,999',
    timeline: '4-6 weeks',
    rating: 4.9,
    details: {
      useCases: ['Retail businesses', 'Dropshipping platforms', 'Marketplace solutions', 'B2B commerce'],
      keyPoints: [
        'AI-powered product recommendations',
        'Advanced analytics dashboard',
        'Multi-currency & payment gateways',
        'Inventory management system',
        'Mobile-first PWA design',
        'SEO & conversion optimization',
      ],
      technologies: ['Next.js', 'Stripe', 'MongoDB', 'AI/ML'],
    },
  },
  {
    id: 2,
    name: 'LLM Website',
    icon: FaRobot,
    description: 'Intelligent websites powered by large language models for dynamic user interactions.',
    color: 'from-purple-400 via-pink-500 to-red-500',
    bgGradient: 'from-purple-900/20 to-pink-900/20',
    pricing: 'Starting at $3,999',
    timeline: '6-8 weeks',
    rating: 5.0,
    details: {
      useCases: ['AI customer support', 'Content generation platforms', 'Personalized experiences', 'Chatbot integration'],
      keyPoints: [
        'GPT-4 & Claude integration',
        'Natural language processing',
        'Real-time AI responses',
        'Custom model training',
        'Scalable infrastructure',
        'Advanced prompt engineering',
      ],
      technologies: ['OpenAI API', 'Anthropic Claude', 'Python', 'Vector DB'],
    },
  },
  {
    id: 3,
    name: 'Blogging',
    icon: FaBlog,
    description: 'Content-rich platforms with advanced SEO features and engagement tools.',
    color: 'from-green-400 via-emerald-500 to-teal-600',
    bgGradient: 'from-green-900/20 to-teal-900/20',
    pricing: 'Starting at $1,999',
    timeline: '3-4 weeks',
    rating: 4.8,
    details: {
      useCases: ['Personal blogs', 'Corporate content hubs', 'Magazine platforms', 'News websites'],
      keyPoints: [
        'Advanced SEO optimization',
        'Content recommendation AI',
        'Social media automation',
        'Newsletter integration',
        'Analytics & insights',
        'Multi-author support',
      ],
      technologies: ['WordPress', 'Headless CMS', 'React', 'GraphQL'],
    },
  },
  {
    id: 4,
    name: 'Landing Pages',
    icon: FaRocket,
    description: 'High-converting landing pages with A/B testing and conversion optimization.',
    color: 'from-orange-400 via-red-500 to-pink-600',
    bgGradient: 'from-orange-900/20 to-red-900/20',
    pricing: 'Starting at $999',
    timeline: '1-2 weeks',
    rating: 4.7,
    details: {
      useCases: ['Product launches', 'Marketing campaigns', 'Lead generation', 'Event promotion'],
      keyPoints: [
        'A/B testing framework',
        'Conversion optimization',
        'Lightning-fast loading',
        'Heat map analytics',
        'Form optimization',
        'CRO best practices',
      ],
      technologies: ['React', 'Tailwind CSS', 'Analytics', 'Testing Tools'],
    },
  },
  {
    id: 5,
    name: 'Digital Websites',
    icon: FaGlobe,
    description: 'Modern digital presence with stunning visuals and seamless user experience.',
    color: 'from-cyan-400 via-blue-500 to-indigo-600',
    bgGradient: 'from-cyan-900/20 to-blue-900/20',
    pricing: 'Starting at $2,499',
    timeline: '3-5 weeks',
    rating: 4.9,
    details: {
      useCases: ['Corporate websites', 'Portfolio sites', 'Service businesses', 'Brand showcases'],
      keyPoints: [
        'Custom brand identity',
        '3D animations & effects',
        'Responsive design',
        'CMS integration',
        'Performance optimization',
        'Accessibility compliance',
      ],
      technologies: ['Next.js', 'Three.js', 'GSAP', 'Headless CMS'],
    },
  },
  {
    id: 6,
    name: 'Web Apps',
    icon: FaCogs,
    description: 'Full-stack applications with advanced features and scalable architecture.',
    color: 'from-amber-400 via-orange-500 to-red-600',
    bgGradient: 'from-amber-900/20 to-orange-900/20',
    pricing: 'Starting at $4,999',
    timeline: '8-12 weeks',
    rating: 4.8,
    details: {
      useCases: ['SaaS platforms', 'Internal tools', 'Customer portals', 'Data dashboards'],
      keyPoints: [
        'User authentication & roles',
        'Real-time data processing',
        'API integrations',
        'Cloud infrastructure',
        'Database optimization',
        'Security best practices',
      ],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS/Vercel'],
    },
  },
];

// Enhanced animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
      duration: 0.6,
    },
  },
};

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    rotate: [0, 5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: easeInOut,
    },
  },
};

type Service = typeof services[number];

export default function EnhancedServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const controls = useAnimation();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <FaStar 
          key={i} 
          className={`text-xs ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-600'}`} 
        />
      ))}
      <span className="text-xs text-gray-400 ml-1">{rating.toFixed(1)}</span>
    </div>
  );

  return (
    <section
      id="services-available"
      ref={sectionRef}
      className="py-14 bg-transparent relative overflow-hidden min-h-screen"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 z-0">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              background: `linear-gradient(45deg, rgba(59,130,246,0.3), rgba(147,51,234,0.3))`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Gradient Orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          style={{ y, opacity }}
          className="text-center mb-20"
        >
          
          
          <motion.h2 
            className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-purple-600 via-purple-600 to-purple-600 bg-clip-text text-transparent leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Services Available
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            Transform your digital presence with our cutting-edge web solutions. 
            From AI-powered applications to stunning e-commerce platforms, we deliver 
            exceptional results that drive growth and engagement.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4 text-sm text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <div className="flex items-center gap-2">
              <FaCheck className="text-green-400" />
              <span>100+ Projects Delivered</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheck className="text-green-400" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheck className="text-green-400" />
              <span>Money-back Guarantee</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Service Cards Grid */}
        <motion.div
          variants={containerVariants}
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-8xl mx-auto mb-16"
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const isHovered = hoveredCard === service.id;
            
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={{
                  rotateY: 5,
                }}
                onHoverStart={() => setHoveredCard(service.id)}
                onHoverEnd={() => setHoveredCard(null)}
                className="group relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-xl rounded-3xl overflow-hidden border border-blue-400/20 shadow-2xl  flex flex-col cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${service.bgGradient}, rgba(17,24,39,0.9))`,
                }}
                onClick={() => setSelectedService(service)}
              >
                {/* Animated Border Glow */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 rounded-3xl`}
                  animate={{
                    opacity: isHovered ? 0.1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Service Badge */}
                

                {/* Floating Icon */}
                <div className="p-8 pb-4">
                  <motion.div
                    className={`w-20 h-20 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br ${service.color} text-white shadow-2xl relative`}
                    variants={floatingVariants}
                    animate="animate"
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, -5, 5, 0],
                      boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                    }}
                  >
                    <IconComponent className="text-3xl" />
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-white/20"
                      animate={{
                        opacity: isHovered ? 1 : 0,
                      }}
                    />
                  </motion.div>
                  
                  <motion.h3 
                    className="text-2xl font-bold text-white mb-3"
                    animate={{
                      color: isHovered ? "#60a5fa" : "#ffffff",
                    }}
                  >
                    {service.name}
                  </motion.h3>
                  
                  <p className="text-gray-300 mb-6 line-clamp-3 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Pricing & Timeline */}
                  <div className="flex justify-between items-center mb-6 text-sm">
                    <div className="text-green-400 font-semibold">
                      {service.pricing}
                    </div>
                    <div className="text-gray-400">
                      {service.timeline}
                    </div>
                  </div>

                  {/* Tech Stack Preview */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.details.technologies.slice(0, 3).map((tech, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs border border-blue-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                    {service.details.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-500/20 text-gray-300 rounded-full text-xs">
                        +{service.details.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Enhanced CTA Button */}
                <div className="mt-auto p-8 pt-0">
                  <motion.button
                    className={`w-full py-4 rounded-2xl text-white font-semibold bg-gradient-to-r ${service.color} shadow-lg relative overflow-hidden group`}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-center gap-2 relative z-10">
                      Explore Details
risks
                      <motion.span
                        animate={{ x: isHovered ? 5 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FaArrowRight />
                      </motion.span>
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-white/10"
                      initial={{ x: "-100%" }}
                      animate={{ x: isHovered ? "0%" : "-100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          className="text-center relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <div className="relative inline-block">
            {/* Floating Elements */}
           
            
            <motion.button
              className="relative px-12 py-5 rounded-2xl bg-gradient-to-r from-pink-500 via-pink-500 to-pink-500 text-white font-bold text-lg shadow-2xl z-10 overflow-hidden group"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(59,130,246,0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              <span className="flex items-center gap-3 relative z-10">
                Start Your Project Today
                <motion.span
                  animate={{ 
                    x: [0, 5, 0],
                    rotate: [0, 15, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <FaRocket />
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>
          </div>
          
          <motion.p 
            className="mt-6 text-gray-800 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            Ready to transform your digital presence? Get a free consultation and detailed project proposal tailored to your needs.
          </motion.p>
          
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-800">
            <div className="flex items-center gap-2">
              <FaCheck className="text-green-400" />
              <span>Free Consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheck className="text-green-400" />
              <span>Custom Proposal</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheck className="text-green-400" />
              <span>No Commitment</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Service Detail Modal */}
      {selectedService && (
        <motion.div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedService(null)}
        >
          <motion.div
            className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-blue-400/30 shadow-2xl"
            initial={{ scale: 0.5, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 100 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-6">
                <motion.div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${selectedService.color} text-white shadow-xl`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <selectedService.icon className="text-2xl" />
                </motion.div>
                <div>
                  <h3 className="text-4xl font-bold text-white mb-2">{selectedService.name}</h3>
                  <div className="flex items-center gap-4">
                    <StarRating rating={selectedService.rating} />
                    <span className="text-green-400 font-semibold">{selectedService.pricing}</span>
                    <span className="text-gray-400">{selectedService.timeline}</span>
                  </div>
                </div>
              </div>
              <motion.button
                onClick={() => setSelectedService(null)}
                className="text-gray-300 hover:text-white text-2xl p-3 hover:bg-red-500/20 rounded-full transition-all"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes />
              </motion.button>
            </div>

            <p className="text-gray-300 text-xl mb-8 leading-relaxed">{selectedService.description}</p>

            {/* Enhanced Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <motion.div
                className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl p-6 border border-blue-400/20"
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <FaRocket className="text-blue-400" />
                  Use Cases
                </h4>
                <div className="space-y-3">
                  {selectedService.details.useCases.map((useCase, i) => (
                    <motion.div 
                      key={i} 
                      className="flex items-center gap-3 text-gray-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      {useCase}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl p-6 border border-purple-400/20"
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <FaCogs className="text-purple-400" />
                  Key Features
                </h4>
                <div className="space-y-3">
                  {selectedService.details.keyPoints.map((point, i) => (
                    <motion.div 
                      key={i} 
                      className="flex items-center gap-3 text-gray-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <FaCheck className="text-green-400 text-sm" />
                      {point}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Technologies */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-white mb-4">Technologies Used</h4>
              <div className="flex flex-wrap gap-3">
                {selectedService.details.technologies.map((tech, i) => (
                  <motion.span
                    key={i}
                    className={`px-4 py-2 rounded-full text-white font-medium bg-gradient-to-r ${selectedService.color}`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              
              <motion.button
                className="flex-1 py-4 rounded-xl text-white font-semibold bg-gray-700 hover:bg-gray-600 hover:shadow-xl transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedService(null)}
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}