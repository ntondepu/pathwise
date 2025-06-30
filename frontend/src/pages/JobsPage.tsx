import React from 'react';

const JobsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Job & Internship Search</h1>
          <p className="mt-2 text-gray-600">Find opportunities that match your skills and career goals</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Search and Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Search & Filters</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title or Keywords
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Software Engineer, Data Scientist"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., San Francisco, Remote"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                    <option value="">All Types</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="internship">Internship</option>
                    <option value="co-op">Co-op</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experience Level
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                    <option value="">Any Level</option>
                    <option value="entry">Entry Level</option>
                    <option value="mid">Mid Level</option>
                    <option value="senior">Senior Level</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Salary Range
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                    <option value="">Any Salary</option>
                    <option value="0-50000">$0 - $50,000</option>
                    <option value="50000-80000">$50,000 - $80,000</option>
                    <option value="80000-120000">$80,000 - $120,000</option>
                    <option value="120000+">$120,000+</option>
                  </select>
                </div>
                
                <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors">
                  Search Jobs
                </button>
              </div>
            </div>
            
            {/* Skills Match */}
            <div className="bg-white shadow rounded-lg p-6 mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Your Skills</h3>
              <div className="space-y-2">
                {['JavaScript', 'Python', 'React', 'Node.js', 'SQL'].map((skill) => (
                  <span key={skill} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">
                    {skill}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-3">
                Jobs are ranked by how well they match your skills and coursework.
              </p>
            </div>
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Available Opportunities</h3>
                  <span className="text-sm text-gray-500">147 jobs found</span>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {[
                  {
                    title: 'Software Engineer Intern',
                    company: 'Google',
                    location: 'Mountain View, CA',
                    type: 'Internship',
                    salary: '$7,000/month',
                    match: 92,
                    posted: '2 days ago',
                    description: 'Join our team to work on cutting-edge software projects that impact billions of users worldwide.',
                    skills: ['Python', 'Java', 'Algorithms', 'Data Structures']
                  },
                  {
                    title: 'Frontend Developer',
                    company: 'Meta',
                    location: 'Menlo Park, CA',
                    type: 'Full-time',
                    salary: '$120,000 - $180,000',
                    match: 85,
                    posted: '1 week ago',
                    description: 'Build user interfaces for next-generation social media experiences.',
                    skills: ['React', 'JavaScript', 'CSS', 'TypeScript']
                  },
                  {
                    title: 'Data Science Intern',
                    company: 'Microsoft',
                    location: 'Seattle, WA',
                    type: 'Internship',
                    salary: '$6,500/month',
                    match: 78,
                    posted: '3 days ago',
                    description: 'Analyze large datasets to derive insights and build machine learning models.',
                    skills: ['Python', 'SQL', 'Machine Learning', 'Statistics']
                  },
                  {
                    title: 'Backend Engineer',
                    company: 'Stripe',
                    location: 'San Francisco, CA',
                    type: 'Full-time',
                    salary: '$140,000 - $200,000',
                    match: 82,
                    posted: '5 days ago',
                    description: 'Design and build scalable backend systems for payment processing.',
                    skills: ['Node.js', 'PostgreSQL', 'AWS', 'Distributed Systems']
                  }
                ].map((job, index) => (
                  <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-medium text-gray-900">{job.title}</h4>
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                            job.match >= 90 ? 'bg-green-100 text-green-800' :
                            job.match >= 80 ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {job.match}% match
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <span className="font-medium">{job.company}</span>
                          <span>{job.location}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            job.type === 'Internship' ? 'bg-green-100 text-green-800' :
                            job.type === 'Full-time' ? 'bg-blue-100 text-blue-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {job.type}
                          </span>
                          <span className="font-medium text-green-600">{job.salary}</span>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{job.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {job.skills.map((skill, skillIndex) => (
                            <span key={skillIndex} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Posted {job.posted}</span>
                          <div className="flex space-x-2">
                            <button className="text-sm text-gray-600 hover:text-primary-600">
                              Save
                            </button>
                            <button className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm hover:bg-primary-700 transition-colors">
                              Apply Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">
                    Showing 1 to 4 of 147 results
                  </span>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="px-3 py-1 bg-primary-600 text-white rounded text-sm">
                      1
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                      2
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                      3
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                      Next
                    </button>
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

export default JobsPage;
