import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployerPlanPage } from './employer-plan.page';

const routes: Routes = [
  {
    path: '',
    component: EmployerPlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployerPlanPageRoutingModule {}
