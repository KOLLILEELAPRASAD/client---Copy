'use client';

import { useState } from 'react';

export default function ContactSection() {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    websiteType: '',
    serviceType: '',
    budget: '5000',
    description: ''
  });

  // Form validation
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    websiteType: '',
    serviceType: '',
    budget: '',
    description: ''
  });

  // Animation for field errors
  const [animateFields, setAnimateFields] = useState({
    name: false,
    email: false,
    phone: false,
    websiteType: false,
    serviceType: false,
    budget: false,
    description: false
  });

  // Form submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset states
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError('');

    // Reset animation states
    const resetAnimations = Object.keys(animateFields).reduce((acc, key) => {
      acc[key as keyof typeof animateFields] = false;
      return acc;
    }, {} as typeof animateFields);
  
    // Validate form (your existing validation logic remains unchanged)
    const newErrors = {
      name: formData.name ? '' : 'Name is required',
      email: formData.email ? (
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? '' : 'Valid email is required'
      ) : 'Email is required',
      phone: formData.phone ? (
        /^\+?[0-9\s\-\(\)]{8,20}$/.test(formData.phone) ? '' : 'Valid phone number is required'
      ) : 'Phone number is required',
      websiteType: formData.websiteType ? '' : 'Please select a website type',
      serviceType: formData.serviceType ? '' : 'Please select a service type',
      budget: formData.budget ? (
        parseInt(formData.budget) >= 5000 ? '' : 'Minimum budget is ₹5000'
      ) : 'Budget is required',
      description: formData.description ? '' : 'Please describe your project',
    };
  
    setErrors(newErrors);
  
    // Set animation for fields with errors
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
      const firstErrorField = Object.keys(newErrors).find((key) => newErrors[key as keyof typeof newErrors]);
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
      console.log('Submitting form data:', formData);
  
      // Submit form to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }
  
      // Success
      console.log('Form submitted successfully:', result.message);
      setSubmitSuccess(true);
  
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        websiteType: '',
        serviceType: '',
        budget: '5000',
        description: '',
      });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit form. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Rest of your component JSX would go here
  return (
    <div>
      {/* Your form JSX */}
      <form onSubmit={handleSubmit}>
        {/* Form fields would go here */}
      </form>
    </div>
  );
}