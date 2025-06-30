import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AcademicCapIcon, 
  BriefcaseIcon, 
  SparklesIcon, 
  ChartBarIcon,
  ArrowRightIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: AcademicCapIcon,
      title: 'Academic Path Planner',
      description: 'Visualize your graduation path with interactive course flowcharts and prerequisites.',
      items: ['Course prerequisites mapping', 'GPA tracking', 'Professor reviews', 'Semester planning']
    },
    {
      icon: BriefcaseIcon,
      title: 'Job & Internship Matching',
      description: 'Find relevant opportunities that match your skills and academic progress.',
      items: ['Real-time job feeds', 'Skills alignment analysis', 'Application tracking', 'Salary insights']
    },
    {
      icon: SparklesIcon,
      title: 'AI Career Assistant',
      description: 'Get personalized career guidance powered by artificial intelligence.',
      items: ['Resume optimization', 'Interview preparation', 'Certification recommendations', 'Career path analysis']
    },
    {
      icon: ChartBarIcon,
      title: 'Progress Tracking',
      description: 'Monitor your academic journey and career readiness in real-time.',
      items: ['Graduation progress', 'Skill development', 'Goal tracking', 'Export reports']
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Computer Science Senior',
      school: 'Purdue University',
      content: 'CoursePathAI helped me plan my entire degree path and land a software engineering internship at Google. The AI assistant\'s resume suggestions were game-changing!'
    },
    {
      name: 'Marcus Johnson',
      role: 'Data Science Major',
      school: 'University of Michigan',
      content: 'The job matching feature is incredible. It showed me exactly which skills I was missing and suggested courses to fill those gaps.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Electrical Engineering',
      school: 'Georgia Tech',
      content: 'Planning my course schedule used to be a nightmare. Now I can see all prerequisites and plan 4 years ahead with confidence.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Smart Academic &{' '}
              <span className="text-gradient bg-gradient-to-r from-accent-400 to-secondary-400 bg-clip-text text-transparent">
                Career Planning
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Visualize your graduation path, discover relevant career opportunities, 
              and get AI-powered guidance—all in one intelligent platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/demo"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center gap-2"
              >
                Try Demo (No Setup Required!)
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <Link
                to="/auth"
                className="bg-accent-600 hover:bg-accent-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center gap-2"
              >
                Get Started Free
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <Link
                to="#features"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From academic planning to career preparation, CoursePathAI provides 
              comprehensive tools to guide your educational journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow duration-200">
                <div className="card-body">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary-100 p-3 rounded-lg">
                      <feature.icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {feature.description}
                      </p>
                      <ul className="space-y-2">
                        {feature.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckIcon className="w-4 h-4 text-green-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Students Nationwide
            </h2>
            <p className="text-xl text-gray-600">
              See how CoursePathAI is helping students achieve their academic and career goals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="card-body">
                  <p className="text-gray-600 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm text-primary-600">{testimonial.school}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Plan Your Success?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Join thousands of students who are already using CoursePathAI to 
            navigate their academic journey and career preparation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth"
              className="bg-accent-600 hover:bg-accent-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              Start Your Journey
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
            <a
              href="#"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
            >
              Schedule Demo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
