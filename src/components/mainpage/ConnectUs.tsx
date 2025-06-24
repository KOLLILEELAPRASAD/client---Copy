'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

// Service types from ServicesAvailableSection
const serviceTypes = [
  'E-commerce',
  'LLM Website',
  'Blogging',
  'Landing Pages',
  'Digital Websites',
  'Webapps',
  'Other'
];

// Website types with detailed descriptions
const websiteTypes = [
  { 
    value: 'Static Website',
    label: 'Static Website',
    description: 'Fast, secure, SEO-optimized websites for businesses and portfolios'
  },
  { 
    value: 'Dynamic Website',
    label: 'Dynamic Website',
    description: 'Interactive websites with content management and user features'
  },
  { 
    value: 'Web Application',
    label: 'Web Application',
    description: 'Complex applications with advanced functionality and integrations'
  }
];

// Budget ranges for better UX
const budgetRanges = [
  { value: '5000-10000', label: '₹5,000 - ₹10,000', min: 5000 },
  { value: '10000-25000', label: '₹10,000 - ₹25,000', min: 10000 },
  { value: '25000-50000', label: '₹25,000 - ₹50,000', min: 25000 },
  { value: '50000-100000', label: '₹50,000 - ₹1,00,000', min: 50000 },
  { value: '100000+', label: '₹1,00,000+', min: 100000 },
  { value: 'custom', label: 'Custom Budget', min: 0 }
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  websiteType: string;
  serviceType: string;
  budgetRange: string;
  customBudget: string;
  timeline: string;
  description: string;
  hearAboutUs: string;
  preferredContact: string;
}

interface Errors {
  [key: string]: string;
}

interface AnimateFields {
  [key: string]: boolean;
}

export default function ContactSection() {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    websiteType: '',
    serviceType: '',
    budgetRange: '',
    customBudget: '',
    timeline: '',
    description: '',
    hearAboutUs: '',
    preferredContact: 'email'
  });

  // Form validation
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Errors>({});

  // Animation for field errors
  const [animateFields, setAnimateFields] = useState<AnimateFields>({});
  
  // Animation controls
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const controls = useAnimation();
  
  // Get minimum budget based on website type
  const getMinimumBudget = (websiteType: string): number => {
    switch (websiteType) {
      case 'Static Website':
        return 5000;
      case 'Dynamic Website':
        return 10000;
      case 'Web Application':
        return 25000;
      default:
        return 5000;
    }
  };

  // Validate individual field
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      
      case 'email':
        if (!value.trim()) return 'Email address is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        return '';
      
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        if (!/^\+?[0-9\s\-\(\)]{8,20}$/.test(value)) return 'Please enter a valid phone number';
        return '';
      
      case 'websiteType':
        if (!value) return 'Please select a website type';
        return '';
      
      case 'serviceType':
        if (!value) return 'Please select a service type';
        return '';
      
      case 'budgetRange':
        if (!value) return 'Please select your budget range';
        return '';
      
      case 'customBudget':
        if (formData.budgetRange === 'custom') {
          if (!value) return 'Please enter your custom budget';
          const numValue = parseInt(value);
          const minBudget = getMinimumBudget(formData.websiteType);
          if (isNaN(numValue) || numValue < minBudget) {
            return `Minimum budget for ${formData.websiteType || 'this website type'} is ₹${minBudget.toLocaleString()}`;
          }
        }
        return '';
      
      case 'timeline':
        if (!value) return 'Please select your preferred timeline';
        return '';
      
      case 'description':
        if (!value.trim()) return 'Project description is required';
        if (value.trim().length < 20) return 'Please provide more details (minimum 20 characters)';
        return '';
      
      default:
        return '';
    }
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Mark field as touched
    

    // Validate field and update errors
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    // Clear animation
    setAnimateFields(prev => ({
      ...prev,
      [name]: false
    }));
  };

  // Handle field blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
   
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };
  
  // Form submission states
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>('');

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Errors = {};
    const newAnimations: AnimateFields = {};
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) {
        newErrors[key] = error;
        newAnimations[key] = true;
      }
    });

    setErrors(newErrors);
    setAnimateFields(newAnimations);

    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      // Scroll to first error
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form submitted:', formData);
      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        websiteType: '',
        serviceType: '',
        budgetRange: '',
        customBudget: '',
        timeline: '',
        description: '',
        hearAboutUs: '',
        preferredContact: 'email'
      });
      setTouched({});
      setAnimateFields({});
    } catch (error) {
      setSubmitError('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Animate section when it comes into view
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={controls}
        variants={{
          visible: { opacity: 1, transition: { duration: 0.8 } }
        }}
        className="container mx-auto px-4 sm:px-6 relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 60,
                  damping: 12,
                  duration: 0.8,
                  delay: 0.1
                }
              }
            }}
            className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Let's Start a Conversation
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 50,
                  damping: 10,
                  duration: 0.8,
                  delay: 0.2
                }
              }
            }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent"
          >
          
            <span className="block text-blue-600"></span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 50,
                  damping: 8,
                  duration: 0.6,
                  delay: 0.3
                }
              }
            }}
            className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Share your vision with us and we'll transform it into a powerful digital solution. 
            Our expert team is ready to bring your ideas to life.
          </motion.p>
        </div>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 50,
                damping: 15,
                delay: 0.4,
                duration: 1
              }
            }
          }}
          className="max-w-7xl mx-auto"
        >
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact Information - Left Side */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-black rounded-2xl p-8 text-white h-full shadow-2xl">
                <div className="mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">Get in Touch</h3>
                  <p className="text-blue-100 text-lg">
                    We're here to help you succeed. Reach out and let's discuss your project.
                  </p>
                </div>

                {/* Contact methods */}
                <div className="space-y-6 mb-10">
                  <motion.div 
                    className="flex items-center space-x-4 p-3 rounded-lg bg-white/10 backdrop-blur-sm"
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Phone</h4>
                      <p className="text-blue-100">+91 9010663667</p>
                      <p className="text-xs text-blue-200">Available 9 AM - 9 PM IST</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-center space-x-4 p-3 rounded-lg bg-white/10 backdrop-blur-sm"
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Email</h4>
                      <p className="text-blue-100">7dvpavankumar9@gmail.com</p>
                      <p className="text-xs text-blue-200">We respond within 2 hours</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-center space-x-4 p-3 rounded-lg bg-white/10 backdrop-blur-sm"
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Location</h4>
                      <p className="text-blue-100">Mandapeta, Konaseema</p>
                      <p className="text-xs text-blue-200">Andhra Pradesh, India</p>
                    </div>
                  </motion.div>
                </div>

                {/* Social links */}
                <div>
                  <h4 className="font-semibold text-lg mb-4">Connect With Us</h4>
                  <div className="flex space-x-3">
                    {[
                      { 
                        href: "https://instagram.com/7pavankumar9", 
                        icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
                        bg: "from-purple-500 to-pink-500",
                        label: "Instagram"
                      },
                      { 
                        href: "https://wa.me/919010663667", 
                        icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
                        bg: "bg-green-500",
                        label: "WhatsApp"
                      },
                      { 
                        href: "https://www.linkedin.com/in/duggirala-venkata-pavan-kumar-8754912b1", 
                        icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                        bg: "bg-blue-600",
                        label: "LinkedIn"
                      }
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 rounded-full ${social.bg.startsWith('from') ? `bg-gradient-to-br ${social.bg}` : social.bg} flex items-center justify-center shadow-lg`}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Visit our ${social.label} profile`}
                      >
                        <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24" aria-hidden="true">
                          <path d={social.icon} />
                        </svg>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form - Right Side */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="p-8 md:p-10">
                  <div className="mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      Tell Us About Your Project
                    </h3>
                    <p className="text-gray-600">
                      Fill out the form below and we'll get back to you within 24 hours with a detailed proposal.
                    </p>
                  </div>

                  {/* Form overlay during submission */}
                  {isSubmitting && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-20 flex items-center justify-center rounded-2xl">
                      <div className="text-center p-8">
                        <div className="w-20 h-20 mx-auto mb-4">
                          <svg className="animate-spin w-full h-full text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </div>
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">Processing Your Request</h4>
                        <p className="text-gray-600">Please wait while we review your project details...</p>
                      </div>
                    </div>
                  )}

                  {/* Success message */}
                  {submitSuccess && (
                    <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex items-center justify-center rounded-2xl">
                      <div className="text-center p-8">
                        <div className="w-20 h-20 mx-auto mb-4">
                          <svg className="w-full h-full text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">Submission Successful!</h4>
                        <p className="text-gray-600 mb-4">Thank you for your submission. We'll get back to you within 24 hours.</p>
                        <button
                          onClick={() => setSubmitSuccess(false)}
                          className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                        >
                          Submit Another
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Error message */}
                  {submitError && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                      <p className="text-red-600 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {submitError}
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6 relative" aria-label="Contact Form">
                    {/* Personal Information */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <motion.input
                          animate={animateFields.name ? {
                            x: [0, -8, 8, -8, 8, 0],
                            borderColor: ['#ef4444', '#ef4444', '#ef4444']
                          } : {}}
                          transition={{ duration: 0.5 }}
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50 focus:bg-white ${
                            errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200'
                          }`}
                          placeholder="John Doe"
                          required
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
                        />
                        {errors.name && touched.name && (
                          <p id="name-error" className="mt-2 text-sm text-red-600 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <motion.input
                          animate={animateFields.email ? {
                            x: [0, -8, 8, -8, 8, 0],
                            borderColor: ['#ef4444', '#ef4444', '#ef4444']
                          } : {}}
                          transition={{ duration: 0.5 }}
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50 focus:bg-white ${
                            errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200'
                          }`}
                          placeholder="john.doe@example.com"
                          required
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
                        />
                        {errors.email && touched.email && (
                          <p id="email-error" className="mt-2 text-sm text-red-600 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <motion.input
                          animate={animateFields.phone ? {
                            x: [0, -8, 8, -8, 8, 0],
                            borderColor: ['#ef4444', '#ef4444', '#ef4444']
                          } : {}}
                          transition={{ duration: 0.5 }}
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50 focus:bg-white ${
                            errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200'
                          }`}
                          placeholder="+91 123 456 7890"
                          required
                          aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone && touched.phone ? 'phone-error' : undefined}
                        />
                        {errors.phone && touched.phone && (
                          <p id="phone-error" className="mt-2 text-sm text-red-600 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="company" className="block text-sm font-semibold text-gray-900 mb-2">
                          Company Name
                        </label>
                        <motion.input
                          animate={animateFields.company ? {
                            x: [0, -8, 8, -8, 8, 0],
                            borderColor: ['#ef4444', '#ef4444', '#ef4444']
                          } : {}}
                          transition={{ duration: 0.5 }}
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50 focus:bg-white border-gray-200"
                          placeholder="Your Company (Optional)"
                        />
                      </div>
                    </div>

                    {/* Project Information */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="websiteType" className="block text-sm font-semibold text-gray-900 mb-2">
                          Website Type <span className="text-red-500">*</span>
                        </label>
                        <motion.select
                          animate={animateFields.websiteType ? {
                            x: [0, -8, 8, -8, 8, 0],
                            borderColor: ['#ef4444', '#ef4444', '#ef4444']
                          } : {}}
                          transition={{ duration: 0.5 }}
                          id="websiteType"
                          name="websiteType"
                          value={formData.websiteType}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50 focus:bg-white ${
                            errors.websiteType ? 'border-red-400 bg-red-50' : 'border-gray-200'
                          }`}
                          required
                          aria-invalid={!!errors.websiteType}
                          aria-describedby={errors.websiteType && touched.websiteType ? 'websiteType-error' : undefined}
                        >
                          <option value="">Select Website Type</option>
                          {websiteTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </motion.select>
                        {errors.websiteType && touched.websiteType && (
                          <p id="websiteType-error" className="mt-2 text-sm text-red-600 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.websiteType}
                          </p>
                        )}
                        {formData.websiteType && (
                          <p className="mt-2 text-sm text-gray-600">
                            {websiteTypes.find(type => type.value === formData.websiteType)?.description}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="serviceType" className="block text-sm font-semibold text-gray-900 mb-2">
                          Service Type <span className="text-red-500">*</span>
                        </label>
                        <motion.select
                          animate={animateFields.serviceType ? {
                            x: [0, -8, 8, -8, 8, 0],
                            borderColor: ['#ef4444', '#ef4444', '#ef4444']
                          } : {}}
                          transition={{ duration: 0.5 }}
                          id="serviceType"
                          name="serviceType"
                          value={formData.serviceType}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50 focus:bg-white ${
                            errors.serviceType ? 'border-red-400 bg-red-50' : 'border-gray-200'
                          }`}
                          required
                          aria-invalid={!!errors.serviceType}
                          aria-describedby={errors.serviceType && touched.serviceType ? 'serviceType-error' : undefined}
                        >
                          <option value="">Select Service Type</option>
                          {serviceTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </motion.select>
                        {errors.serviceType && touched.serviceType && (
                          <p id="serviceType-error" className="mt-2 text-sm text-red-600 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.serviceType}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Budget and Timeline */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="budgetRange" className="block text-sm font-semibold text-gray-900 mb-2">
                          Budget Range <span className="text-red-500">*</span>
                        </label>
                        <motion.select
                          animate={animateFields.budgetRange ? {
                            x: [0, -8, 8, -8, 8, 0],
                            borderColor: ['#ef4444', '#ef4444', '#ef4444']
                          } : {}}
                          transition={{ duration: 0.5 }}
                          id="budgetRange"
                          name="budgetRange"
                          value={formData.budgetRange}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50 focus:bg-white ${
                            errors.budgetRange ? 'border-red-400 bg-red-50' : 'border-gray-200'
                          }`}
                          required
                          aria-invalid={!!errors.budgetRange}
                          aria-describedby={errors.budgetRange && touched.budgetRange ? 'budgetRange-error' : undefined}
                        >
                          <option value="">Select Budget Range</option>
                          {budgetRanges.map((range) => (
                            <option key={range.value} value={range.value}>
                              {range.label}
                            </option>
                          ))}
                        </motion.select>
                        {errors.budgetRange && touched.budgetRange && (
                          <p id="budgetRange-error" className="mt-2 text-sm text-red-600 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.budgetRange}
                          </p>
                        )}
                      </div>

                      {formData.budgetRange === 'custom' && (
                        <div>
                          <label htmlFor="customBudget" className="block text-sm font-semibold text-gray-900 mb-2">
                            Custom Budget <span className="text-red-500">*</span>
                          </label>
                          <motion.input
                            animate={animateFields.customBudget ? {
                              x: [0, -8, 8, -8, 8, 0],
                              borderColor: ['#ef4444', '#ef4444', '#ef4444']
                            } : {}}
                            transition={{ duration: 0.5 }}
                            type="number"
                            id="customBudget"
                            name="customBudget"
                            value={formData.customBudget}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50 focus:bg-white ${
                              errors.customBudget ? 'border-red-400 bg-red-50' : 'border-gray-200'
                            }`}
                            placeholder="Enter your budget (₹)"
                            required
                            aria-invalid={!!errors.customBudget}
                            aria-describedby={errors.customBudget && touched.customBudget ? 'customBudget-error' : undefined}
                          />
                          {errors.customBudget && touched.customBudget && (
                            <p id="customBudget-error" className="mt-2 text-sm text-red-600 flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              {errors.customBudget}
                            </p>
                          )}
                        </div>
                      )}

                      <div>
                        <label htmlFor="timeline" className="block text-sm font-semibold text-gray-900 mb-2">
                          Project Timeline <span className="text-red-500">*</span>
                        </label>
                        <motion.select
                          animate={animateFields.timeline ? {
                            x: [0, -8, 8, -8, 8, 0],
                            borderColor: ['#ef4444', '#ef4444', '#ef4444']
                          } : {}}
                          transition={{ duration: 0.5 }}
                          id="timeline"
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50 focus:bg-white ${
                            errors.timeline ? 'border-red-400 bg-red-50' : 'border-gray-200'
                          }`}
                          required
                          aria-invalid={!!errors.timeline}
                          aria-describedby={errors.timeline && touched.timeline ? 'timeline-error' : undefined}
                        >
                          <option value="">Select Timeline</option>
                          <option value="1-2 weeks">1-2 Weeks</option>
                          <option value="2-4 weeks">2-4 Weeks</option>
                          <option value="1-2 months">1-2 Months</option>
                          <option value="3+ months">3+ Months</option>
                          <option value="flexible">Flexible</option>
                        </motion.select>
                        {errors.timeline && touched.timeline && (
                          <p id="timeline-error" className="mt-2 text-sm text-red-600 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.timeline}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Project Description */}
                    <div>
                      <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-2">
                        Project Description <span className="text-red-500">*</span>
                      </label>
                      <motion.textarea
                        animate={animateFields.description ? {
                          x: [0, -8, 8, -8, 8, 0],
                          borderColor: ['#ef4444', '#ef4444', '#ef4444']
                        } : {}}
                        transition={{ duration: 0.5 }}
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows={5}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50 focus:bg-white resize-y ${
                          errors.description ? 'border-red-400 bg-red-50' : 'border-gray-200'
                        }`}
                        placeholder="Tell us about your project, goals, and any specific requirements..."
                        required
                        aria-invalid={!!errors.description}
                        aria-describedby={errors.description && touched.description ? 'description-error' : undefined}
                      />
                      {errors.description && touched.description && (
                        <p id="description-error" className="mt-2 text-sm text-red-600 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.description}
                        </p>
                      )}
                    </div>

                    {/* Additional Information */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="hearAboutUs" className="block text-sm font-semibold text-gray-900 mb-2">
                          How Did You Hear About Us?
                        </label>
                        <motion.select
                          animate={animateFields.hearAboutUs ? {
                            x: [0, -8, 8, -8, 8, 0],
                            borderColor: ['#ef4444', '#ef4444', '#ef4444']
                          } : {}}
                          transition={{ duration: 0.5 }}
                          id="hearAboutUs"
                          name="hearAboutUs"
                          value={formData.hearAboutUs}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50 focus:bg-white border-gray-200"
                        >
                          <option value="">Select an Option</option>
                          <option value="google">Google Search</option>
                          <option value="social">Social Media</option>
                          <option value="referral">Referral</option>
                          <option value="advertisement">Advertisement</option>
                          <option value="other">Other</option>
                        </motion.select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Preferred Contact Method <span className="text-red-500">*</span>
                        </label>
                        <div className="flex space-x-4" role="radiogroup" aria-labelledby="preferredContact-label">
                          {['email', 'phone', 'whatsapp'].map((method) => (
                            <label key={method} className="flex items-center">
                              <motion.input
                                type="radio"
                                name="preferredContact"
                                value={method}
                                checked={formData.preferredContact === method}
                                onChange={handleChange}
                                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                required
                                aria-checked={formData.preferredContact === method}
                              />
                              <span className="text-sm capitalize">{method}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-6 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                        aria-label="Submit project details"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                          </>
                        ) : (
                          'Submit Your Project Details'
                        )}
                      </motion.button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}