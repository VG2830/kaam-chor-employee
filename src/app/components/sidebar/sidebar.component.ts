import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports:[IonicModule]
})
export class SidebarComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
