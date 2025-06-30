import React from 'react';

const CoursePlannerPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Course Planner</h1>
          <p className="mt-2 text-gray-600">Plan your academic path to graduation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with course search and filters */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Course Search</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Search Courses
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., CS 180, Data Structures"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                    <option value="">All Departments</option>
                    <option value="CS">Computer Science</option>
                    <option value="MATH">Mathematics</option>
                    <option value="PHYS">Physics</option>
                    <option value="ECE">Electrical Engineering</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Credits
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                    <option value="">Any Credits</option>
                    <option value="1">1 Credit</option>
                    <option value="2">2 Credits</option>
                    <option value="3">3 Credits</option>
                    <option value="4">4 Credits</option>
                  </select>
                </div>
                
                <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors">
                  Search Courses
                </button>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="lg:col-span-3">
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">4-Year Academic Plan</h3>
                  <div className="flex space-x-2">
                    <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300">
                      Export PDF
                    </button>
                    <button className="bg-primary-600 text-white px-3 py-1 rounded text-sm hover:bg-primary-700">
                      Save Plan
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                {/* Year tabs */}
                <div className="flex space-x-1 mb-6">
                  {['Year 1', 'Year 2', 'Year 3', 'Year 4'].map((year, index) => (
                    <button
                      key={year}
                      className={`px-4 py-2 text-sm font-medium rounded-md ${
                        index === 0
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>

                {/* Semester layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Fall Semester */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Fall 2024</h4>
                    <div className="space-y-3">
                      {[
                        { code: 'CS 180', title: 'Programming Fundamentals', credits: 4, difficulty: 'Medium' },
                        { code: 'MATH 161', title: 'Calculus I', credits: 5, difficulty: 'Hard' },
                        { code: 'ENGL 106', title: 'First-Year Composition', credits: 4, difficulty: 'Easy' },
                        { code: 'CHM 115', title: 'General Chemistry', credits: 4, difficulty: 'Medium' },
                      ].map((course, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-medium text-gray-900">{course.code}</h5>
                              <p className="text-sm text-gray-600">{course.title}</p>
                              <p className="text-xs text-gray-500">{course.credits} credits</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                course.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                                course.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {course.difficulty}
                              </span>
                              <button className="text-gray-400 hover:text-red-500">
                                ×
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <button className="text-gray-500 hover:text-primary-600">
                          + Add Course
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-600">
                      Total Credits: 17
                    </div>
                  </div>

                  {/* Spring Semester */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Spring 2025</h4>
                    <div className="space-y-3">
                      {[
                        { code: 'CS 182', title: 'Foundations of Computer Science', credits: 3, difficulty: 'Hard' },
                        { code: 'MATH 162', title: 'Calculus II', credits: 5, difficulty: 'Hard' },
                        { code: 'PHYS 172', title: 'Modern Mechanics', credits: 4, difficulty: 'Medium' },
                        { code: 'COM 114', title: 'Fundamentals of Speech', credits: 3, difficulty: 'Easy' },
                      ].map((course, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-medium text-gray-900">{course.code}</h5>
                              <p className="text-sm text-gray-600">{course.title}</p>
                              <p className="text-xs text-gray-500">{course.credits} credits</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                course.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                                course.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {course.difficulty}
                              </span>
                              <button className="text-gray-400 hover:text-red-500">
                                ×
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <button className="text-gray-500 hover:text-primary-600">
                          + Add Course
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-600">
                      Total Credits: 15
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlannerPage;
