import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
  imports:[IonicModule]
})
export class MyProfilePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
