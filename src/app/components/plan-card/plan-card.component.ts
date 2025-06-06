// // import { Component, OnInit } from '@angular/core';

// // @Component({
// //   selector: 'app-plan-card',
// //   templateUrl: './plan-card.component.html',
// //   styleUrls: ['./plan-card.component.scss'],
// // })
// // export class PlanCardComponent  implements OnInit {

// //   constructor() { }

// //   ngOnInit() {}

// // }
// import { Component, Input } from '@angular/core';
// import { IonicModule } from '@ionic/angular';
// import { ModalController } from '@ionic/angular';
// import { CheckoutModalPage } from '../../checkout-modal/checkout-modal.page';
// @Component({
//   selector: 'app-plan-card',
//  standalone:true,
//   templateUrl: './plan-card.component.html',
//   styleUrls: ['./plan-card.component.scss'],
//  imports: [ IonicModule] ,
// })
// export class PlanCardComponent {
//   @Input() title!: string;
// @Input() price!: string;
// @Input() responses!: string;
// @Input() unlocks!: string;
// @Input() jobsLive!: string;
// @Input() validity!: string;
// @Input() boosts!: string;
// constructor(private modalController: ModalController) { }
// async openCheckoutModal() {
//   const modal = await this.modalController.create({
//     component: CheckoutModalPage,
//     componentProps: {
//       plan: {
//         price: 1999,
//         duration: '1 month',
//         unlocks: 200,
//         jobs: 15,
//         boosts: 2
//       }
//     },
//   });
//   return await modal.present();
// }
// }
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-plan-card',
  
  templateUrl: './plan-card.component.html',
  styleUrls: ['./plan-card.component.scss'],
  imports:[IonicModule],
})
export class PlanCardComponent {
  @Input() plan: any;
  @Output() purchase = new EventEmitter<any>();

  onPurchaseClick() {
    this.purchase.emit(this.plan);
  }
}
