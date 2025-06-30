import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

interface DemoData {
  courses: any[];
  jobs: any[];
  professors: any[];
  paths: any[];
}

const DemoPage: React.FC = () => {
  const [demoData, setDemoData] = useState<DemoData>({
    courses: [],
    jobs: [],
    professors: [],
    paths: []
  });
  const [resumeHelp, setResumeHelp] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [jobTitle, setJobTitle] = useState('Software Engineer');

  useEffect(() => {
    fetchDemoData();
  }, []);

  const fetchDemoData = async () => {
    try {
      setLoading(true);
      const [courses, jobs, professors, paths] = await Promise.all([
        api.demo.getCourses(),
        api.demo.getJobs(),
        api.demo.getProfessors(),
        api.demo.getPaths()
      ]);

      setDemoData({ courses, jobs, professors, paths });
    } catch (error) {
      console.error('Error fetching demo data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResumeHelp = async () => {
    try {
      const result = await api.demo.getResumeHelp(jobTitle);
      setResumeHelp(result.response);
    } catch (error) {
      console.error('Error getting resume help:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading demo data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            CoursePathAI Demo - No API Keys Required! 🎉
          </h1>
          <p className="mt-2 text-gray-600">
            Explore all the features working with demo data - no external API keys needed
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-green-100 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800">✅ Backend API</h3>
            <p className="text-sm text-green-700">Running on port 5001</p>
          </div>
          <div className="bg-green-100 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800">✅ Frontend</h3>
            <p className="text-sm text-green-700">Running on port 3000</p>
          </div>
          <div className="bg-green-100 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800">✅ Database</h3>
            <p className="text-sm text-green-700">PostgreSQL connected</p>
          </div>
          <div className="bg-green-100 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800">✅ Demo Data</h3>
            <p className="text-sm text-green-700">Working without APIs</p>
          </div>
        </div>

        {/* Courses Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 Demo Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {demoData.courses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{course.code}</h3>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                    {course.credits} credits
                  </span>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">{course.name}</h4>
                <p className="text-gray-600 text-sm mb-3">{course.description}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Avg GPA: {course.avgGpa}</span>
                  <span className="text-gray-500">{course.enrollmentCount} students</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Jobs Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💼 Demo Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoData.jobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{job.title}</h3>
                  {job.remote && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                      Remote
                    </span>
                  )}
                </div>
                <p className="text-gray-700 font-medium">{job.company}</p>
                <p className="text-gray-600 text-sm mb-3">{job.location}</p>
                <p className="text-gray-600 text-sm mb-3">{job.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-medium">{job.salary}</span>
                  <span className="text-gray-500 text-sm">{job.type}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI Resume Help Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🤖 AI Resume Help (Demo)</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex gap-4 mb-4">
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Enter job title..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleResumeHelp}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Get Resume Help
              </button>
            </div>
            {resumeHelp && (
              <div className="bg-gray-50 rounded-lg p-4">
                <pre className="whitespace-pre-wrap text-sm text-gray-800">{resumeHelp}</pre>
              </div>
            )}
          </div>
        </section>

        {/* Academic Paths Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Academic Paths</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {demoData.paths.map((path) => (
              <div key={path.id} className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold text-lg mb-2">{path.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{path.description}</p>
                <div className="mb-3">
                  <h4 className="font-medium text-sm text-gray-700 mb-1">Required Courses:</h4>
                  <div className="flex flex-wrap gap-1">
                    {path.courses.map((course: string) => (
                      <span key={course} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Duration: {path.duration}</p>
                  <p>Career Outcomes: {path.careerOutcomes.join(', ')}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* API Endpoints Info */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🔗 Working API Endpoints</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Demo Endpoints (No Auth Required)</h3>
                <ul className="text-sm space-y-1">
                  <li><code className="bg-gray-100 px-2 py-1 rounded">GET /api/demo/courses</code></li>
                  <li><code className="bg-gray-100 px-2 py-1 rounded">GET /api/demo/jobs</code></li>
                  <li><code className="bg-gray-100 px-2 py-1 rounded">GET /api/demo/professors</code></li>
                  <li><code className="bg-gray-100 px-2 py-1 rounded">GET /api/demo/paths</code></li>
                  <li><code className="bg-gray-100 px-2 py-1 rounded">POST /api/demo/ai/resume-help</code></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">System Endpoints</h3>
                <ul className="text-sm space-y-1">
                  <li><code className="bg-gray-100 px-2 py-1 rounded">GET /api/health</code></li>
                  <li><code className="bg-gray-100 px-2 py-1 rounded">Frontend: localhost:3000</code></li>
                  <li><code className="bg-gray-100 px-2 py-1 rounded">Backend: localhost:5001</code></li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DemoPage;
