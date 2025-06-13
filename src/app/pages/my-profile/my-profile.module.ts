import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { MyProfilePageRoutingModule } from './my-profile-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MyProfilePage } from './my-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyProfilePageRoutingModule,ReactiveFormsModule,SidebarComponent
  ],
  declarations: [MyProfilePage]
})
export class MyProfilePageModule {}
