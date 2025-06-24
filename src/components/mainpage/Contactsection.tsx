
'use client';

import { motion, useInView } from 'framer-motion';
import { useState, useRef } from 'react';
import { FaPaperPlane, FaSpinner } from 'react-icons/fa6';
import type { Variants } from 'framer-motion';

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: 'spring' } },
};

const shakeVariants: Variants = {
  shake: {
    x: [-5, 5, -5, 5, 0],
    transition: { duration: 0.3 },
  },
};

// Floating bubbles configuration
const bubbleConfigs = [
  { width: '25px', height: '25px', left: '15%', top: '20%', animationDelay: '0s', animationDuration: '14s' },
  { width: '35px', height: '35px', left: '85%', top: '30%', animationDelay: '1s', animationDuration: '11s' },
  { width: '20px', height: '20px', left: '30%', top: '50%', animationDelay: '2s', animationDuration: '17s' },
  { width: '30px', height: '30px', left: '70%', top: '70%', animationDelay: '3s', animationDuration: '13s' },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    websiteType: '',
    serviceType: '',
    budget: '5000',
    description: '',
  });

  // Form validation
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    websiteType: '',
    serviceType: '',
    budget: '',
    description: '',
  });

  // Animation for field errors
  const [animateFields, setAnimateFields] = useState({
    name: false,
    email: false,
    phone: false,
    websiteType: false,
    serviceType: false,
    budget: false,
    description: false,
  });

  // Form submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setAnimateFields((prev) => ({ ...prev, [name]: false }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError('');

    const resetAnimations = Object.keys(animateFields).reduce((acc, key) => {
      acc[key as keyof typeof animateFields] = false;
      return acc;
    }, {} as typeof animateFields);

    // Validate form
    const newErrors = {
      name: formData.name ? '' : 'Name is required',
      email: formData.email
        ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
          ? ''
          : 'Valid email is required'
        : 'Email is required',
      phone: formData.phone
        ? /^\+?[0-9\s\-\(\)]{8,20}$/.test(formData.phone)
          ? ''
          : 'Valid phone number is required'
        : 'Phone number is required',
      websiteType: formData.websiteType ? '' : 'Please select a website type',
      serviceType: formData.serviceType ? '' : 'Please select a service type',
      budget: formData.budget
        ? parseInt(formData.budget) >= 5000
          ? ''
          : 'Minimum budget is ₹5000'
        : 'Budget is required',
      description: formData.description ? '' : 'Please describe your project',
    };

    setErrors(newErrors);

    const newAnimations = { ...resetAnimations };
    let hasErrors = false;

    Object.keys(newErrors).forEach((key) => {
      const fieldKey = key as keyof typeof newErrors;
      if (newErrors[fieldKey]) {
        newAnimations[fieldKey] = true;
        hasErrors = true;
      }
    });

    setAnimateFields(newAnimations);

    if (hasErrors) {
      setIsSubmitting(false);
      const firstErrorField = Object.keys(newErrors).find(
        (key) => newErrors[key as keyof typeof newErrors],
      );
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.focus();
        }
      }
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        websiteType: '',
        serviceType: '',
        budget: '5000',
        description: '',
      });
      setTimeout(() => setSubmitSuccess(false), 5000); // Hide success message after 5s
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit form.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 sm:py-24 md:py-32 overflow-hidden bg-gradient-to-b from-transparent to-blue-900/10"
    >
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
        <motion.div
          className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-blue-400/20 backdrop-blur-sm glassmorphic mb-4"
            variants={itemVariants}
          >
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-blue-300">Get in Touch</span>
          </motion.div>
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-white mb-6"
            variants={itemVariants}
          >
            Let’s Build Your <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Dream Project</span>
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300 max-w-3xl mx-auto mb-8"
            variants={itemVariants}
          >
            Contact us to start your journey with CoreBlock. We’re here to turn your ideas into reality.
          </motion.p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto glassmorphic rounded-2xl p-6 sm:p-8 border border-white/10 holo-glow"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Name */}
          <motion.div className="mb-6" variants={itemVariants}>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Name
            </label>
            <motion.input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 holo-glow ${
                animateFields.name ? 'border-red-500' : ''
              }`}
              placeholder="Your name"
              aria-describedby="name-error"
              variants={animateFields.name ? shakeVariants : {}}
              animate={animateFields.name ? 'shake' : 'visible'}
            />
            {errors.name && (
              <motion.p
                id="name-error"
                className="text-red-500 text-sm mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {errors.name}
              </motion.p>
            )}
          </motion.div>

          {/* Email */}
          <motion.div className="mb-6" variants={itemVariants}>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <motion.input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 holo-glow ${
                animateFields.email ? 'border-red-500' : ''
              }`}
              placeholder="Your email"
              aria-describedby="email-error"
              variants={animateFields.email ? shakeVariants : {}}
              animate={animateFields.email ? 'shake' : 'visible'}
            />
            {errors.email && (
              <motion.p
                id="email-error"
                className="text-red-500 text-sm mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {errors.email}
              </motion.p>
            )}
          </motion.div>

          {/* Phone */}
          <motion.div className="mb-6" variants={itemVariants}>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
              Phone Number
            </label>
            <motion.input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 holo-glow ${
                animateFields.phone ? 'border-red-500' : ''
              }`}
              placeholder="+91 123 456 7890"
              aria-describedby="phone-error"
              variants={animateFields.phone ? shakeVariants : {}}
              animate={animateFields.phone ? 'shake' : 'visible'}
            />
            {errors.phone && (
              <motion.p
                id="phone-error"
                className="text-red-500 text-sm mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {errors.phone}
              </motion.p>
            )}
          </motion.div>

          {/* Website Type */}
          <motion.div className="mb-6" variants={itemVariants}>
            <label
              htmlFor="websiteType"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Website Type
            </label>
            <motion.select
              id="websiteType"
              name="websiteType"
              value={formData.websiteType}
              onChange={handleInputChange}
              className={`w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 holo-glow ${
                animateFields.websiteType ? 'border-red-500' : ''
              }`}
              aria-describedby="websiteType-error"
              variants={animateFields.websiteType ? shakeVariants : {}}
              animate={animateFields.websiteType ? 'shake' : 'visible'}
            >
              <option value="" disabled className="text-gray-400">
                Select website type
              </option>
              <option value="ecommerce" className="text-black">
                E-commerce
              </option>
              <option value="portfolio" className="text-black">
                Portfolio
              </option>
              <option value="blog" className="text-black">
                Blog
              </option>
              <option value="saas" className="text-black">
                SaaS
              </option>
            </motion.select>
            {errors.websiteType && (
              <motion.p
                id="websiteType-error"
                className="text-red-500 text-sm mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {errors.websiteType}
              </motion.p>
            )}
          </motion.div>

          {/* Service Type */}
          <motion.div className="mb-6" variants={itemVariants}>
            <label
              htmlFor="serviceType"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Service Type
            </label>
            <motion.select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleInputChange}
              className={`w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 holo-glow ${
                animateFields.serviceType ? 'border-red-500' : ''
              }`}
              aria-describedby="serviceType-error"
              variants={animateFields.serviceType ? shakeVariants : {}}
              animate={animateFields.serviceType ? 'shake' : 'visible'}
            >
              <option value="" disabled className="text-gray-400">
                Select service type
              </option>
              <option value="development" className="text-black">
                Development
              </option>
              <option value="design" className="text-black">
                Design
              </option>
              <option value="consulting" className="text-black">
                Consulting
              </option>
            </motion.select>
            {errors.serviceType && (
              <motion.p
                id="serviceType-error"
                className="text-red-500 text-sm mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {errors.serviceType}
              </motion.p>
            )}
          </motion.div>

          {/* Budget */}
          <motion.div className="mb-6" variants={itemVariants}>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
              Budget (₹)
            </label>
            <motion.input
              id="budget"
              name="budget"
              type="number"
              value={formData.budget}
              onChange={handleInputChange}
              className={`w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 holo-glow ${
                animateFields.budget ? 'border-red-500' : ''
              }`}
              placeholder="5000"
              min="5000"
              aria-describedby="budget-error"
              variants={animateFields.budget ? shakeVariants : {}}
              animate={animateFields.budget ? 'shake' : 'visible'}
            />
            {errors.budget && (
              <motion.p
                id="budget-error"
                className="text-red-500 text-sm mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {errors.budget}
              </motion.p>
            )}
          </motion.div>

          {/* Description */}
          <motion.div className="mb-6" variants={itemVariants}>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Project Description
            </label>
            <motion.textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={`w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 holo-glow resize-y min-h-[120px] ${
                animateFields.description ? 'border-red-500' : ''
              }`}
              placeholder="Describe your project..."
              aria-describedby="description-error"
              variants={animateFields.description ? shakeVariants : {}}
              animate={animateFields.description ? 'shake' : 'visible'}
            />
            {errors.description && (
              <motion.p
                id="description-error"
                className="text-red-500 text-sm mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {errors.description}
              </motion.p>
            )}
          </motion.div>

          {/* Submission Feedback */}
          {submitSuccess && (
            <motion.p
              className="text-green-400 text-center mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Message sent successfully! We’ll get back to you soon.
            </motion.p>
          )}
          {submitError && (
            <motion.p
              className="text-red-500 text-center mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {submitError}
            </motion.p>
          )}

          {/* Submit Button */}
          <motion.div variants={itemVariants}>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold flex items-center justify-center gap-2 neon-pulse holo-glow ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
              aria-label="Submit contact form"
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin text-lg" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <FaPaperPlane className="text-sm" />
                </>
              )}
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
}
