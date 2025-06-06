// import { ModalController, NavParams } from '@ionic/angular';
// import { Component } from '@angular/core';
// import { IonicModule } from '@ionic/angular';
// @Component({
//   selector: 'app-checkout-modal',
//   templateUrl: './checkout-modal.page.html',
//   styleUrls: ['./checkout-modal.page.scss'],
//   imports:[IonicModule],
// })
// export class CheckoutModalPage {
//   plan: any;

//   constructor(private modalCtrl: ModalController, private navParams: NavParams) {
//     this.plan = this.navParams.get('plan');
//   }

//   dismiss() {
//     this.modalCtrl.dismiss();
//   }
// }
import { Component, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-checkout-modal',
  templateUrl: './checkout-modal.page.html',
  styleUrls: ['./checkout-modal.page.scss'],
  imports:[IonicModule]
})
export class CheckoutModalPage {
  plan: any;

  constructor(private navParams: NavParams, private modalCtrl: ModalController) {
    this.plan = this.navParams.get('plan');
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
