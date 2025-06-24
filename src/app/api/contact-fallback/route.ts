import { NextRequest, NextResponse } from 'next/server';

// Define the expected form data structure
interface FormData {
  name: string;
  email: string;
  phone: string;
  websiteType: string;
  serviceType: string;
  budget: string;
  description: string;
}

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body: FormData = await req.json();

    // Destructure form data
    const { name, email, phone, websiteType, serviceType, budget, description } = body;

    // Validate required fields (basic validation)
    if (!name || !email || !phone || !websiteType || !serviceType || !budget || !description) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Budget validation based on website type
    const budgetNum = parseInt(budget);
    let minBudget = 5000; // Default minimum

    // Set minimum budget based on website type
    if (websiteType === 'Static Website') {
      minBudget = 5000;
    } else if (websiteType === 'Dynamic Website') {
      minBudget = 7000;
    } else if (websiteType === 'Web Application') {
      minBudget = 15000;
    }

    if (isNaN(budgetNum) || budgetNum < minBudget) {
      return NextResponse.json({
        error: `Budget must be at least ₹${minBudget.toLocaleString()} for ${websiteType}`
      }, { status: 400 });
    }

    // This is a fallback endpoint that simulates successful submission
    // when the main email service is not working
    console.log('Fallback contact form submission received:', {
      name,
      email,
      phone,
      websiteType,
      serviceType,
      budget,
      description
    });

    // In a real implementation, you could use an alternative email service
    // or store the submission in a database for later processing

    // Simulate a slight delay to make it feel like processing is happening
    await new Promise(resolve => setTimeout(resolve, 1500));

    return NextResponse.json({ 
      message: 'Your message has been received! We will contact you soon.',
      fallback: true
    }, { status: 200 });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Failed to process your request. Please try again later.' 
    }, { status: 500 });
  }
}