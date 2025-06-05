import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PlanCardComponent } from '../components/plan-card/plan-card.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, IonicModule,PlanCardComponent],
  exports: [PlanCardComponent]
})
export class SharedModule {}
