import React from 'react';

const AIAssistantPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AI Career Assistant</h1>
          <p className="mt-2 text-gray-600">Get personalized career guidance powered by artificial intelligence</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Tools */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">AI Tools</h3>
              
              <div className="space-y-3">
                <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      📄
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Resume Optimizer</h4>
                      <p className="text-sm text-gray-600">Improve your resume with AI suggestions</p>
                    </div>
                  </div>
                </button>
                
                <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      💼
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Interview Prep</h4>
                      <p className="text-sm text-gray-600">Practice with AI-generated questions</p>
                    </div>
                  </div>
                </button>
                
                <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      🎓
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Certifications</h4>
                      <p className="text-sm text-gray-600">Get recommendations for relevant certs</p>
                    </div>
                  </div>
                </button>
                
                <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                      🛤️
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Career Path</h4>
                      <p className="text-sm text-gray-600">Explore different career trajectories</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="bg-white shadow rounded-lg p-6 mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent AI Assistance</h3>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium text-gray-900">Resume bullets for Software Engineer role</p>
                  <p className="text-gray-600">2 hours ago</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">Interview questions for Google internship</p>
                  <p className="text-gray-600">1 day ago</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">Certification recommendations</p>
                  <p className="text-gray-600">3 days ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg h-[600px] flex flex-col">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">AI Assistant Chat</h3>
                <p className="text-sm text-gray-600">Ask me anything about your career planning and development</p>
              </div>
              
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    🤖
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="text-gray-900">
                        Hello! I'm your AI career assistant. I can help you with resume optimization, 
                        interview preparation, certification recommendations, and career planning. 
                        What would you like assistance with today?
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Just now</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 justify-end">
                  <div className="flex-1 max-w-md">
                    <div className="bg-primary-600 text-white rounded-lg p-3">
                      <p>
                        Hi! I'm applying for a software engineering internship at Google. 
                        Can you help me improve my resume based on my Computer Science coursework?
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-right">2 minutes ago</p>
                  </div>
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    👤
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    🤖
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="text-gray-900 mb-3">
                        Absolutely! Based on your CS coursework, here are some strong resume bullet points for a Google SWE internship:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-gray-900">
                        <li>Implemented data structures (arrays, linked lists, trees) and algorithms (sorting, searching) in Java and Python through CS 180 and CS 251 coursework</li>
                        <li>Developed web applications using HTML, CSS, and JavaScript, demonstrating full-stack development capabilities</li>
                        <li>Applied object-oriented programming principles to design and build scalable software solutions</li>
                        <li>Analyzed algorithm complexity and optimized code performance using Big O notation concepts</li>
                      </ul>
                      <p className="text-gray-900 mt-3">
                        Would you like me to generate more specific bullets based on any particular projects or courses?
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">1 minute ago</p>
                  </div>
                </div>
              </div>
              
              {/* Chat Input */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    placeholder="Ask me anything about your career..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors">
                    Send
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  <button className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200">
                    Help with interview questions
                  </button>
                  <button className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200">
                    Recommend certifications
                  </button>
                  <button className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200">
                    Career path guidance
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;
