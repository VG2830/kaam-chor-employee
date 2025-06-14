import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InactiveJobsPageRoutingModule } from './inactive-jobs-routing.module';

import { InactiveJobsPage } from './inactive-jobs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InactiveJobsPageRoutingModule
  ],
  declarations: [InactiveJobsPage]
})
export class InactiveJobsPageModule {}
