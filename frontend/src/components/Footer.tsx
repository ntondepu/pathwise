import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">CoursePathAI</h3>
            <p className="text-gray-300 mb-4 max-w-md">
              Smart academic and career planning for college students. 
              Plan your path to graduation and career success with AI-powered insights.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">Facebook</span>
                {/* Facebook icon would go here */}
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">Twitter</span>
                {/* Twitter icon would go here */}
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                {/* LinkedIn icon would go here */}
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="/planner" className="text-gray-300 hover:text-white">Course Planner</a></li>
              <li><a href="/jobs" className="text-gray-300 hover:text-white">Job Search</a></li>
              <li><a href="/ai-assistant" className="text-gray-300 hover:text-white">AI Assistant</a></li>
              <li><a href="/dashboard" className="text-gray-300 hover:text-white">Dashboard</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 CoursePathAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
