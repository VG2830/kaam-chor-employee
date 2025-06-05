import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployerPlanPageRoutingModule } from './employer-plan-routing.module';
import { PlanCardComponent } from '../../components/plan-card/plan-card.component';

import { EmployerPlanPage } from './employer-plan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployerPlanPageRoutingModule,PlanCardComponent
  ],
  
  declarations: [EmployerPlanPage],
  
})
export class EmployerPlanPageModule {}
