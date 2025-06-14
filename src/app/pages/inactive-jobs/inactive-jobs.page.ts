import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inactive-jobs',
  standalone:false,
  templateUrl: './inactive-jobs.page.html',
  styleUrls: ['./inactive-jobs.page.scss'],
})
export class InactiveJobsPage implements OnInit {
 jobs: any[] = [];
  searchQuery: string = '';
  entriesPerPage: number = 10;

  constructor() { }

  ngOnInit() {
    // Replace with actual API call
    this.jobs = [
      {
        logo: 'assets/imgs/logo1.png',
        title: 'development',
        type: 'fullTime Accounts',
        company: 'Stephens Molina Trading',
        location: 'Chhattisgarh, Raipur',
        applicants: 0,
        posted: '2025-05-16 04:36:55',
      },
      {
        logo: 'assets/imgs/logo1.png',
        title: 'Accusamus minim quia',
        type: 'fullTime Human Resource Manager',
        company: 'Stephens Molina Trading',
        location: 'Chhattisgarh, Raipur',
        applicants: 0,
        posted: '2025-05-16 04:41:09',
      },
      {
        logo: 'assets/imgs/logo1.png',
        title: 'human resources',
        type: 'fullTime Human Resource Manager',
        company: 'Stephens Molina Trading',
        location: 'Chhattisgarh, Raipur',
        applicants: 0,
        posted: '2025-05-16 04:58:16',
      },
      {
        logo: 'assets/imgs/logo1.png',
        title: 'testing',
        type: 'partTime Automation Testing',
        company: 'Stephens Molina Trading',
        location: 'Chhattisgarh, Raipur',
        applicants: 0,
        posted: '2025-05-16 05:07:24',
      },
      {
        logo: 'assets/imgs/logo1.png',
        title: 'testing',
        type: 'fullTime Automation Testing',
        company: 'Stephens Molina Trading',
        location: 'Chhattisgarh, Raipur',
        applicants: 0,
        posted: '2025-05-19 10:19:53',
      },
      {
        logo: 'assets/imgs/logo1.png',
        title: 'artificial intelligent',
        type: 'fullTime Security Guard',
        company: 'Stephens Molina Trading',
        location: 'Chhattisgarh, Raipur',
        applicants: 0,
        posted: '2025-05-19 04:29:29',
      },
    ];
  }
 get totalEntries(): number {
    return this.filteredJobs().length;
  }

  get startEntry(): number {
    return this.totalEntries > 0 ? 1 : 0;
  }

  get endEntry(): number {
    return Math.min(this.entriesPerPage, this.totalEntries);
  }

  filteredJobs(): any[] {
    if (!this.searchQuery) return this.jobs.slice(0, this.entriesPerPage);
    const query = this.searchQuery.toLowerCase();
    return this.jobs
      .filter(job =>
        Object.values(job).some((value:any) =>
          value.toString().toLowerCase().includes(query)
        )
      )
      .slice(0, this.entriesPerPage);
  }
}
