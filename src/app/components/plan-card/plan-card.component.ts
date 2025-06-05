// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-plan-card',
//   templateUrl: './plan-card.component.html',
//   styleUrls: ['./plan-card.component.scss'],
// })
// export class PlanCardComponent  implements OnInit {

//   constructor() { }

//   ngOnInit() {}

// }
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-plan-card',
 standalone:true,
  templateUrl: './plan-card.component.html',
  styleUrls: ['./plan-card.component.scss'],
 imports: [ IonicModule] ,
})
export class PlanCardComponent {
  @Input() title!: string;
@Input() price!: string;
@Input() responses!: string;
@Input() unlocks!: string;
@Input() jobsLive!: string;
@Input() validity!: string;
@Input() boosts!: string;


}
