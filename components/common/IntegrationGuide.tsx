import React from 'react';
import Link from 'next/link';

interface SetupStep {
  title: string;
  content: React.ReactNode;
  link?: {
    text: string;
    url: string;
  };
}

const DashboardSetup = () => {
  const setupSteps: SetupStep[] = [
    {
      title: "Sign Up",
      content: "Begin by signing up here:",
      link: {
        text: "Shopflo Dashboard Signup",
        url: "https://dashboard.shopflo.com/auth/signup"
      }
    },
    {
      title: "Create a Custom App",
      content: "Follow this guide to create a custom app in Shopify:",
      link: {
        text: "Step-by-Step Guide",
        url: "https://scribehow.com/shared/How_to_Create_Custom_app_in_Shopify__Wwe9wxEhTpal-7lOfo0NSg" // Replace with actual URL
      }
    },
    {
      title: "Set Up Payment Gateway",
      content: "",
    },
    {
      title: "Integrate Google/Meta Accounts",
      content: "Connect your Google and/or Meta accounts for seamless integration."
    },
    {
      title: "Integration Timeline",
      content: "Once these steps are completed, our team will take 24-48 hours to complete the integration."
    }
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Complete Dashboard Setup Instructions
      </h1>

      <div className="space-y-6">
        {setupSteps.map((step, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
              {index + 1}
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {step.title}
              </h2>
              <p className="text-gray-600 mb-1">{step.content}</p>
              {step.link && (
                <Link 
                  href={step.link.url}
                  className="text-green-500 hover:text-green-600 font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {step.link.text}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t pt-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Need Guidance?</h2>
        <div className="space-y-4">
          <p className="text-gray-600">
            If you need assistance, block time for the next day to connect with us:{' '}
            <Link 
              href="https://calendly.com/d/crdk-m83-pb9/shopflo-discussion"
              className="text-green-500 hover:text-green-600 font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Shopflo Discussion
            </Link>
          </p>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Go-Live Call:</h3>
            <p className="text-gray-600">
              Block time for the next day to connect with us and schedule your go-live call here:{' '}
              <Link 
                href="https://calendly.com/d/cqsp-9s2-fgj/shopflo-go-live?month=2024-12"
                className="text-green-500 hover:text-green-600 font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSetup;
