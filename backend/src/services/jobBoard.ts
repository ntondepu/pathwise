import axios from 'axios';
import { logger } from '../utils/logger';

// Job Board API interfaces
interface AdzunaJob {
  id: string;
  title: string;
  company: { display_name: string };
  location: { display_name: string };
  description: string;
  salary_min?: number;
  salary_max?: number;
  contract_type?: string;
  redirect_url: string;
  created: string;
}

interface RemotiveJob {
  id: number;
  url: string;
  title: string;
  company_name: string;
  company_logo: string;
  category: string;
  job_type: string;
  publication_date: string;
  candidate_required_location: string;
  salary?: string;
  description: string;
}

interface JobBoardResponse {
  jobs: any[];
  total: number;
  source: string;
}

export class JobBoardService {
  private adzunaAppId: string;
  private adzunaApiKey: string;

  constructor() {
    this.adzunaAppId = process.env.ADZUNA_APP_ID || '';
    this.adzunaApiKey = process.env.ADZUNA_API_KEY || '';
  }

  async searchAdzunaJobs(
    query: string = 'software developer',
    location: string = 'us',
    page: number = 1,
    resultsPerPage: number = 20
  ): Promise<JobBoardResponse> {
    try {
      if (!this.adzunaAppId || !this.adzunaApiKey) {
        logger.warn('Adzuna API credentials not configured, using mock data');
        return this.getMockJobs('adzuna');
      }

      const response = await axios.get(
        `https://api.adzuna.com/v1/api/jobs/${location}/search/${page}`,
        {
          params: {
            app_id: this.adzunaAppId,
            app_key: this.adzunaApiKey,
            what: query,
            results_per_page: resultsPerPage,
            sort_by: 'date',
          },
        }
      );

      const jobs = response.data.results.map((job: AdzunaJob) => ({
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
    } catch (error) {
      logger.error('Error fetching Adzuna jobs:', error);
      return this.getMockJobs('adzuna');
    }
  }

  async searchRemotiveJobs(
    category: string = 'software-dev',
    limit: number = 20
  ): Promise<JobBoardResponse> {
    try {
      const response = await axios.get('https://remotive.io/api/remote-jobs', {
        params: {
          category,
          limit,
        },
      });

      const jobs = response.data.jobs.map((job: RemotiveJob) => ({
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
    } catch (error) {
      logger.error('Error fetching Remotive jobs:', error);
      return this.getMockJobs('remotive');
    }
  }

  async searchAllJobs(
    query: string = 'software developer',
    location: string = 'us',
    limit: number = 50
  ): Promise<JobBoardResponse> {
    try {
      const [adzunaJobs, remotiveJobs] = await Promise.allSettled([
        this.searchAdzunaJobs(query, location, 1, Math.floor(limit / 2)),
        this.searchRemotiveJobs('software-dev', Math.floor(limit / 2)),
      ]);

      const allJobs: any[] = [];
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
    } catch (error) {
      logger.error('Error searching all job boards:', error);
      return this.getMockJobs('combined');
    }
  }

  private mapContractType(contractType?: string): string {
    if (!contractType) return 'full-time';
    
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

  private mapJobType(jobType?: string): string {
    if (!jobType) return 'full-time';
    
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

  private getMockJobs(source: string): JobBoardResponse {
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

export const jobBoardService = new JobBoardService();
