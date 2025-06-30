-- Sample data for development and testing
-- This script populates the database with realistic sample data

-- Insert sample universities and departments
INSERT INTO professors (id, name, department, university, email, rating, total_reviews, rmp_id) VALUES
(gen_random_uuid(), 'Dr. Sarah Johnson', 'Computer Science', 'Purdue University', 'sjohnson@purdue.edu', 4.2, 156, 'prof1'),
(gen_random_uuid(), 'Prof. Michael Chen', 'Computer Science', 'Purdue University', 'mchen@purdue.edu', 3.8, 203, 'prof2'),
(gen_random_uuid(), 'Dr. Emily Rodriguez', 'Mathematics', 'Purdue University', 'erodriguez@purdue.edu', 4.5, 89, 'prof3'),
(gen_random_uuid(), 'Prof. David Kim', 'Business', 'Purdue University', 'dkim@purdue.edu', 4.1, 134, 'prof4'),
(gen_random_uuid(), 'Dr. Jennifer Wilson', 'Computer Science', 'Purdue University', 'jwilson@purdue.edu', 3.9, 178, 'prof5'),
(gen_random_uuid(), 'Prof. Robert Thompson', 'Engineering', 'Purdue University', 'rthompson@purdue.edu', 4.3, 245, 'prof6'),
(gen_random_uuid(), 'Dr. Lisa Park', 'Data Science', 'Purdue University', 'lpark@purdue.edu', 4.7, 92, 'prof7'),
(gen_random_uuid(), 'Prof. James Anderson', 'Computer Science', 'Purdue University', 'janderson@purdue.edu', 3.6, 156, 'prof8');

-- Insert sample courses
INSERT INTO courses (id, code, name, description, credits, department, university, prerequisites, difficulty_level, average_rating, total_reviews) VALUES
(gen_random_uuid(), 'CS 18000', 'Problem Solving and Object-Oriented Programming', 'Introduction to problem solving and programming using Java', 4, 'Computer Science', 'Purdue University', '{}', 3, 4.1, 423),
(gen_random_uuid(), 'CS 25000', 'Computer Architecture', 'Introduction to computer organization and assembly language programming', 4, 'Computer Science', 'Purdue University', '{"CS 18000"}', 4, 3.8, 298),
(gen_random_uuid(), 'CS 25100', 'Data Structures and Algorithms', 'Fundamental data structures and algorithms for problem solving', 3, 'Computer Science', 'Purdue University', '{"CS 18000"}', 4, 4.2, 356),
(gen_random_uuid(), 'CS 35200', 'Compilers', 'Design and implementation of programming language compilers', 3, 'Computer Science', 'Purdue University', '{"CS 25100", "CS 25000"}', 5, 3.9, 178),
(gen_random_uuid(), 'CS 34800', 'Information Systems', 'Database design, web development, and information system architecture', 3, 'Computer Science', 'Purdue University', '{"CS 25100"}', 3, 4.0, 234),
(gen_random_uuid(), 'CS 37300', 'Data Mining and Machine Learning', 'Introduction to data mining techniques and machine learning algorithms', 3, 'Computer Science', 'Purdue University', '{"CS 25100", "MATH 26600"}', 4, 4.4, 189),
(gen_random_uuid(), 'CS 38100', 'Introduction to Analysis of Algorithms', 'Mathematical analysis of algorithms and computational complexity', 3, 'Computer Science', 'Purdue University', '{"CS 25100", "MATH 35300"}', 5, 4.1, 145),
(gen_random_uuid(), 'MATH 16500', 'Analytic Geometry and Calculus I', 'Differential calculus with applications', 5, 'Mathematics', 'Purdue University', '{}', 3, 3.7, 567),
(gen_random_uuid(), 'MATH 16600', 'Analytic Geometry and Calculus II', 'Integral calculus with applications', 5, 'Mathematics', 'Purdue University', '{"MATH 16500"}', 4, 3.5, 489),
(gen_random_uuid(), 'MATH 26600', 'Ordinary Differential Equations', 'Methods for solving ordinary differential equations', 3, 'Mathematics', 'Purdue University', '{"MATH 16600"}', 4, 3.8, 234),
(gen_random_uuid(), 'STAT 35000', 'Introduction to Statistics', 'Basic statistical concepts and methods', 3, 'Statistics', 'Purdue University', '{"MATH 16500"}', 2, 4.2, 456),
(gen_random_uuid(), 'MGMT 20010', 'Principles of Management', 'Fundamentals of organizational management', 3, 'Business', 'Purdue University', '{}', 2, 4.0, 345);

-- Get professor and course IDs for relationships
DO $$
DECLARE
    prof_johnson_id UUID;
    prof_chen_id UUID;
    prof_rodriguez_id UUID;
    prof_kim_id UUID;
    prof_wilson_id UUID;
    prof_thompson_id UUID;
    prof_park_id UUID;
    prof_anderson_id UUID;
    
    cs18000_id UUID;
    cs25000_id UUID;
    cs25100_id UUID;
    cs35200_id UUID;
    cs34800_id UUID;
    cs37300_id UUID;
    cs38100_id UUID;
    math16500_id UUID;
    math16600_id UUID;
    math26600_id UUID;
    stat35000_id UUID;
    mgmt20010_id UUID;
BEGIN
    -- Get professor IDs
    SELECT id INTO prof_johnson_id FROM professors WHERE name = 'Dr. Sarah Johnson';
    SELECT id INTO prof_chen_id FROM professors WHERE name = 'Prof. Michael Chen';
    SELECT id INTO prof_rodriguez_id FROM professors WHERE name = 'Dr. Emily Rodriguez';
    SELECT id INTO prof_kim_id FROM professors WHERE name = 'Prof. David Kim';
    SELECT id INTO prof_wilson_id FROM professors WHERE name = 'Dr. Jennifer Wilson';
    SELECT id INTO prof_thompson_id FROM professors WHERE name = 'Prof. Robert Thompson';
    SELECT id INTO prof_park_id FROM professors WHERE name = 'Dr. Lisa Park';
    SELECT id INTO prof_anderson_id FROM professors WHERE name = 'Prof. James Anderson';
    
    -- Get course IDs
    SELECT id INTO cs18000_id FROM courses WHERE code = 'CS 18000';
    SELECT id INTO cs25000_id FROM courses WHERE code = 'CS 25000';
    SELECT id INTO cs25100_id FROM courses WHERE code = 'CS 25100';
    SELECT id INTO cs35200_id FROM courses WHERE code = 'CS 35200';
    SELECT id INTO cs34800_id FROM courses WHERE code = 'CS 34800';
    SELECT id INTO cs37300_id FROM courses WHERE code = 'CS 37300';
    SELECT id INTO cs38100_id FROM courses WHERE code = 'CS 38100';
    SELECT id INTO math16500_id FROM courses WHERE code = 'MATH 16500';
    SELECT id INTO math16600_id FROM courses WHERE code = 'MATH 16600';
    SELECT id INTO math26600_id FROM courses WHERE code = 'MATH 26600';
    SELECT id INTO stat35000_id FROM courses WHERE code = 'STAT 35000';
    SELECT id INTO mgmt20010_id FROM courses WHERE code = 'MGMT 20010';
    
    -- Insert course-professor relationships
    INSERT INTO course_professors (course_id, professor_id, semester, year) VALUES
    (cs18000_id, prof_johnson_id, 'Fall', 2024),
    (cs18000_id, prof_chen_id, 'Spring', 2025),
    (cs25000_id, prof_wilson_id, 'Fall', 2024),
    (cs25100_id, prof_anderson_id, 'Fall', 2024),
    (cs25100_id, prof_johnson_id, 'Spring', 2025),
    (cs35200_id, prof_chen_id, 'Fall', 2024),
    (cs34800_id, prof_wilson_id, 'Spring', 2025),
    (cs37300_id, prof_park_id, 'Fall', 2024),
    (cs38100_id, prof_anderson_id, 'Spring', 2025),
    (math16500_id, prof_rodriguez_id, 'Fall', 2024),
    (math16500_id, prof_rodriguez_id, 'Spring', 2025),
    (math16600_id, prof_rodriguez_id, 'Fall', 2024),
    (math26600_id, prof_rodriguez_id, 'Spring', 2025),
    (stat35000_id, prof_park_id, 'Fall', 2024),
    (mgmt20010_id, prof_kim_id, 'Fall', 2024);
END $$;

-- Insert sample jobs
INSERT INTO jobs (id, title, company, location, description, requirements, salary_min, salary_max, employment_type, experience_level, remote_friendly, application_url, source, posted_date) VALUES
(gen_random_uuid(), 'Software Engineer Intern', 'Google', 'Mountain View, CA', 'Join our team to work on cutting-edge technologies and products used by billions of people.', '{"Computer Science major", "Programming experience", "Problem-solving skills"}', 80000, 120000, 'internship', 'entry', true, 'https://careers.google.com/jobs/123', 'manual', NOW() - INTERVAL '2 days'),
(gen_random_uuid(), 'Data Science Intern', 'Meta', 'Menlo Park, CA', 'Work with large-scale data to drive product decisions and user insights.', '{"Statistics or CS background", "Python/R experience", "Machine learning knowledge"}', 90000, 130000, 'internship', 'entry', true, 'https://careers.meta.com/jobs/456', 'manual', NOW() - INTERVAL '1 day'),
(gen_random_uuid(), 'Full Stack Developer', 'Spotify', 'New York, NY', 'Build features that millions of music lovers use every day.', '{"React/Node.js", "3+ years experience", "Database knowledge"}', 120000, 180000, 'full-time', 'mid', true, 'https://jobs.spotify.com/jobs/789', 'manual', NOW() - INTERVAL '3 days'),
(gen_random_uuid(), 'Machine Learning Engineer', 'Netflix', 'Los Gatos, CA', 'Develop recommendation algorithms and personalization systems.', '{"ML/AI expertise", "Python/TensorFlow", "5+ years experience"}', 180000, 250000, 'full-time', 'senior', false, 'https://jobs.netflix.com/jobs/101', 'manual', NOW() - INTERVAL '1 week'),
(gen_random_uuid(), 'Software Engineer', 'Stripe', 'San Francisco, CA', 'Build the infrastructure that powers online commerce for millions of businesses.', '{"Backend development", "2+ years experience", "API design"}', 140000, 200000, 'full-time', 'mid', true, 'https://stripe.com/jobs/234', 'manual', NOW() - INTERVAL '4 days'),
(gen_random_uuid(), 'Product Manager Intern', 'Airbnb', 'San Francisco, CA', 'Work with cross-functional teams to define and execute product strategy.', '{"Business or technical background", "Analytical skills", "Communication skills"}', 70000, 100000, 'internship', 'entry', false, 'https://careers.airbnb.com/jobs/567', 'manual', NOW() - INTERVAL '5 days'),
(gen_random_uuid(), 'DevOps Engineer', 'Uber', 'San Francisco, CA', 'Build and maintain infrastructure that scales to serve millions of users.', '{"AWS/GCP experience", "Docker/Kubernetes", "3+ years experience"}', 130000, 190000, 'full-time', 'mid', true, 'https://uber.com/careers/890', 'manual', NOW() - INTERVAL '6 days'),
(gen_random_uuid(), 'Data Analyst', 'LinkedIn', 'Sunnyvale, CA', 'Analyze user behavior and business metrics to drive product insights.', '{"SQL/Python", "Statistics background", "1+ years experience"}', 100000, 140000, 'full-time', 'entry', true, 'https://careers.linkedin.com/jobs/345', 'manual', NOW() - INTERVAL '2 weeks');

-- Insert job skills
DO $$
DECLARE
    job_record RECORD;
BEGIN
    -- Get job IDs and insert skills
    FOR job_record IN SELECT id, title FROM jobs LOOP
        CASE 
            WHEN job_record.title LIKE '%Software Engineer%' THEN
                INSERT INTO job_skills (job_id, skill, is_required) VALUES
                (job_record.id, 'Java', true),
                (job_record.id, 'Python', true),
                (job_record.id, 'JavaScript', false),
                (job_record.id, 'Git', true),
                (job_record.id, 'Algorithms', true);
            WHEN job_record.title LIKE '%Data Science%' OR job_record.title LIKE '%Data Analyst%' THEN
                INSERT INTO job_skills (job_id, skill, is_required) VALUES
                (job_record.id, 'Python', true),
                (job_record.id, 'SQL', true),
                (job_record.id, 'Machine Learning', true),
                (job_record.id, 'Statistics', true),
                (job_record.id, 'Pandas', false);
            WHEN job_record.title LIKE '%Full Stack%' THEN
                INSERT INTO job_skills (job_id, skill, is_required) VALUES
                (job_record.id, 'React', true),
                (job_record.id, 'Node.js', true),
                (job_record.id, 'JavaScript', true),
                (job_record.id, 'PostgreSQL', false),
                (job_record.id, 'TypeScript', false);
            WHEN job_record.title LIKE '%Machine Learning%' THEN
                INSERT INTO job_skills (job_id, skill, is_required) VALUES
                (job_record.id, 'Python', true),
                (job_record.id, 'TensorFlow', true),
                (job_record.id, 'PyTorch', false),
                (job_record.id, 'Machine Learning', true),
                (job_record.id, 'Deep Learning', true);
            WHEN job_record.title LIKE '%DevOps%' THEN
                INSERT INTO job_skills (job_id, skill, is_required) VALUES
                (job_record.id, 'AWS', true),
                (job_record.id, 'Docker', true),
                (job_record.id, 'Kubernetes', true),
                (job_record.id, 'Linux', true),
                (job_record.id, 'CI/CD', true);
            WHEN job_record.title LIKE '%Product Manager%' THEN
                INSERT INTO job_skills (job_id, skill, is_required) VALUES
                (job_record.id, 'Product Strategy', true),
                (job_record.id, 'Analytics', true),
                (job_record.id, 'User Research', false),
                (job_record.id, 'Project Management', true),
                (job_record.id, 'Communication', true);
        END CASE;
    END LOOP;
END $$;
