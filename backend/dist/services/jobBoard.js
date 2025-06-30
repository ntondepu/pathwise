"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobBoardService = exports.JobBoardService = void 0;
const axios_1 = __importDefault(require("axios"));
const logger_1 = require("../utils/logger");
class JobBoardService {
    constructor() {
        this.adzunaAppId = process.env.ADZUNA_APP_ID || '';
        this.adzunaApiKey = process.env.ADZUNA_API_KEY || '';
    }
    async searchAdzunaJobs(query = 'software developer', location = 'us', page = 1, resultsPerPage = 20) {
        try {
            if (!this.adzunaAppId || !this.adzunaApiKey) {
                logger_1.logger.warn('Adzuna API credentials not configured, using mock data');
                return this.getMockJobs('adzuna');
            }
            const response = await axios_1.default.get(`https://api.adzuna.com/v1/api/jobs/${location}/search/${page}`, {
                params: {
                    app_id: this.adzunaAppId,
                    app_key: this.adzunaApiKey,
                    what: query,
                    results_per_page: resultsPerPage,
                    sort_by: 'date',
                },
            });
            const jobs = response.data.results.map((job) => ({
                id: job.id,
                title: job.title,
                company: job.company.display_name,
                location: job.location.display_name,
                description: job.description,
                salary_min: job.salary_min,
                salary_max: job.salary_max,
                employment_type: this.mapContractType(job.contract_type),
                application_url: job.redirect_url,
                posted_date: new Date(job.created),
                source: 'adzuna',
                external_id: job.id,
            }));
            return {
                jobs,
                total: response.data.count,
                source: 'adzuna',
            };
        }
        catch (error) {
            logger_1.logger.error('Error fetching Adzuna jobs:', error);
            return this.getMockJobs('adzuna');
        }
    }
    async searchRemotiveJobs(category = 'software-dev', limit = 20) {
        try {
            const response = await axios_1.default.get('https://remotive.io/api/remote-jobs', {
                params: {
                    category,
                    limit,
                },
            });
            const jobs = response.data.jobs.map((job) => ({
                id: job.id.toString(),
                title: job.title,
                company: job.company_name,
                location: job.candidate_required_location || 'Remote',
                description: job.description,
                employment_type: this.mapJobType(job.job_type),
                application_url: job.url,
                posted_date: new Date(job.publication_date),
                source: 'remotive',
                external_id: job.id.toString(),
                remote_friendly: true,
            }));
            return {
                jobs,
                total: jobs.length,
                source: 'remotive',
            };
        }
        catch (error) {
            logger_1.logger.error('Error fetching Remotive jobs:', error);
            return this.getMockJobs('remotive');
        }
    }
    async searchAllJobs(query = 'software developer', location = 'us', limit = 50) {
        try {
            const [adzunaJobs, remotiveJobs] = await Promise.allSettled([
                this.searchAdzunaJobs(query, location, 1, Math.floor(limit / 2)),
                this.searchRemotiveJobs('software-dev', Math.floor(limit / 2)),
            ]);
            const allJobs = [];
            let total = 0;
            if (adzunaJobs.status === 'fulfilled') {
                allJobs.push(...adzunaJobs.value.jobs);
                total += adzunaJobs.value.total;
            }
            if (remotiveJobs.status === 'fulfilled') {
                allJobs.push(...remotiveJobs.value.jobs);
                total += remotiveJobs.value.total;
            }
            // Sort by posted date (newest first)
            allJobs.sort((a, b) => new Date(b.posted_date).getTime() - new Date(a.posted_date).getTime());
            return {
                jobs: allJobs.slice(0, limit),
                total,
                source: 'combined',
            };
        }
        catch (error) {
            logger_1.logger.error('Error searching all job boards:', error);
            return this.getMockJobs('combined');
        }
    }
    mapContractType(contractType) {
        if (!contractType)
            return 'full-time';
        switch (contractType.toLowerCase()) {
            case 'permanent':
                return 'full-time';
            case 'contract':
                return 'contract';
            case 'part_time':
                return 'part-time';
            default:
                return 'full-time';
        }
    }
    mapJobType(jobType) {
        if (!jobType)
            return 'full-time';
        switch (jobType.toLowerCase()) {
            case 'full_time':
                return 'full-time';
            case 'contract':
                return 'contract';
            case 'part_time':
                return 'part-time';
            case 'internship':
                return 'internship';
            default:
                return 'full-time';
        }
    }
    getMockJobs(source) {
        const mockJobs = [
            {
                id: 'mock-1',
                title: 'Senior Software Engineer',
                company: 'TechCorp',
                location: 'San Francisco, CA',
                description: 'We are looking for a senior software engineer to join our team...',
                salary_min: 150000,
                salary_max: 200000,
                employment_type: 'full-time',
                experience_level: 'senior',
                remote_friendly: true,
                application_url: 'https://example.com/jobs/1',
                posted_date: new Date(),
                source,
                external_id: 'mock-1',
            },
            {
                id: 'mock-2',
                title: 'Frontend Developer',
                company: 'StartupXYZ',
                location: 'New York, NY',
                description: 'Join our fast-growing startup as a frontend developer...',
                salary_min: 90000,
                salary_max: 130000,
                employment_type: 'full-time',
                experience_level: 'mid',
                remote_friendly: false,
                application_url: 'https://example.com/jobs/2',
                posted_date: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
                source,
                external_id: 'mock-2',
            },
            {
                id: 'mock-3',
                title: 'Data Science Intern',
                company: 'DataCorp',
                location: 'Remote',
                description: 'Summer internship opportunity in data science...',
                salary_min: 25,
                salary_max: 35,
                employment_type: 'internship',
                experience_level: 'entry',
                remote_friendly: true,
                application_url: 'https://example.com/jobs/3',
                posted_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
                source,
                external_id: 'mock-3',
            },
        ];
        return {
            jobs: mockJobs,
            total: mockJobs.length,
            source,
        };
    }
}
exports.JobBoardService = JobBoardService;
exports.jobBoardService = new JobBoardService();
//# sourceMappingURL=jobBoard.js.map