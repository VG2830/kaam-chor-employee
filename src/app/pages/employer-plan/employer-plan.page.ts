import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { CheckoutModalPage } from 'src/app/checkout-modal/checkout-modal.page';
import { ApiService } from 'src/app/services/api.service';

import { PlanCardComponent } from 'src/app/components/plan-card/plan-card.component';
@Component({
  selector: 'app-employer-plan',
  
  templateUrl: './employer-plan.page.html',
  styleUrls: ['./employer-plan.page.scss'],
  standalone: true,
  imports: [

    IonicModule,PlanCardComponent,CommonModule
  ],
})
export class EmployerPlanPage implements OnInit {
  // plann:any[]:[];
plans = [
    {
      title: '1 month PLAN',
      
      price: 1999,
      des:"Unlimited Candidate Responses",
      duration: '1 month',
      unlocks: 200,
      jobs: 15,
      boosts: 2,
    },
    {
      title: '3 months PLAN',
      price: 4999,
       des:"Unlimited Candidate Responses",
      duration: '3 months',
      unlocks: 600,
      jobs: 50,
      boosts: 6,
    },

    {
      title: '6 months PLAN',
      price: 8999,
       des:"Unlimited Candidate Responses",
      duration: '6 months',
      unlocks: 1000,
      jobs: 100,
      boosts: 10,
    },
    {
         title: '1 year PLAN',
      price: 14999,
       des:"Unlimited Candidate Responses",
      duration: '1 year',
      unlocks: 2000,
      jobs: 200,
      boosts: 20,
    },
    {
       title: '3 Years PLAN',
      price: 18999,
       des:"Unlimited Candidate Responses",
      duration: '3 years',
      unlocks: 3000,
      jobs: 300,
      boosts: 50,
    },
    {
      title: '5 Years PLAN',
      price: 18999,
       des:"Unlimited Candidate Responses",
      duration: '5 years',
      unlocks: 3000,
      jobs: 300,
      boosts: 50,

    },
    {
      title: '7 Years PLAN',
      price: 18999,
       des:"Unlimited Candidate Responses",
      duration: '7 years',
      unlocks: 9000,
      jobs: 600,
      boosts: 90,
    }
  ];

  constructor(private modalCtrl: ModalController,private apiService: ApiService) { }

  async openCheckoutModal(plan: any) {
    const modal = await this.modalCtrl.create({
      component: CheckoutModalPage,
      componentProps: { plan },
    });
    await modal.present();
  }

  ngOnInit() {
    // this.apiService.getEmployerPlans().subscribe((res: any) => {
    //   if (res.status === 'success') {
    //     this.plans = res.data;}
    //   });
  }


}