import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
// import lottie from 'lottie-web';

@Component({
  standalone:true,
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
  imports: [CommonModule, IonicModule] 
})
export class SplashScreenPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  //  this.initial_nav();
  }

  ionViewWillEnter() {
   this.initial_nav();

  }

  initial_nav(){
     setTimeout(() => {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (isLoggedIn) {
        this.router.navigate(['/basic-details-page']);  //change krna h login its for trail 
       
      } else {
        this.router.navigate(['/login']);
        
      }
    }, 3000);
    
  }




  navigateToAppropriateRoute() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      this.router.navigate(['/basic-details-page']);  
      
    } else {
      this.router.navigate(['/login']);
      // this.router.navigate(['/reg-aboutme']);  
    }
  }

}
