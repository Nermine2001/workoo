import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { ProposalService } from '../../../core/services/proposal.service';
import { ServiceService } from '../../../core/services/service.service';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [RouterModule, HttpClientModule, ChartModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css',
})
export class StatsComponent {
  basicData: any;

  userCount: number = 0;
  proposalCount: number = 0;
  serviceCount: number = 0;
  myServices: number = 0;
  myProposals: number = 0;

  constructor(
    private _user: UserService,
    private _proposal: ProposalService,
    private _service: ServiceService
  ) {}

  ngOnInit(): void {

    const userId = this._user.getUserIdFromToken();

    this._service.getServiceCount(userId).subscribe({
      next: (res) => {
        this.userCount = res.count;
        this.myServices = res.myCount;
        this.updateChart();
      },
    });
    this._proposal.getProposalCount(userId).subscribe({
      next: (res) => {
        this.proposalCount = res.count;
        this.myProposals = res.myProposals;
        this.updateChart();
      },
    });
    this._user
      .getUserCount()
      .subscribe((res) => (this.serviceCount = res.count));

      this.updateChart();
  }

  updateChart(): void {
    this.basicData = {
      labels: ['users', 'services', 'proposals', 'my proposals'],
      datasets: [
        {
          label: 'Statistics',
          data: [this.userCount, this.serviceCount,this.myProposals, this.proposalCount],
          backgroundColor: [
            'rgba(249, 115, 22, 0.2)',
            'rgba(6, 182, 212, 0.2)',
            'rgb(107, 114, 128, 0.2)',
            'rgba(139, 92, 246, 0.2)',
          ],
          borderColor: [
            'rgb(249, 115, 22)',
            'rgb(6, 182, 212)',
            'rgb(107, 114, 128)',
            'rgb(139, 92, 246)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }
}
