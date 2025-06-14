import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InactiveJobsPage } from './inactive-jobs.page';

const routes: Routes = [
  {
    path: '',
    component: InactiveJobsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InactiveJobsPageRoutingModule {}
