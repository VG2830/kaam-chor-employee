import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { StatusBar,Style as StatusBarStyle } from '@capacitor/status-bar';
import { IonicModule, NavController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-otp-verf',
  standalone:false,
  templateUrl: './otp-verf.page.html',
  styleUrls: ['./otp-verf.page.scss'],
  
})
export class OtpVerfPage implements OnInit {
  mobileNumber: string = '';
  otp: string = '';
  username: string = '';
  isLoading: boolean = false;
  isNewUser: boolean = false;
 
  constructor(private navCtrl: NavController, private platform: Platform,private router: Router,private route: ActivatedRoute,private authService: AuthService,private apiService:ApiService) { }

  ngOnInit() {
    StatusBar.setBackgroundColor({ color: '#ffffff' }); 
      StatusBar.setStyle({ style: StatusBarStyle.Dark });
    
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.mobileNumber = navigation.extras.state['mobileNumber'];
      this.isNewUser = navigation.extras.state['isNewUser'];
      this.username = navigation.extras.state['username'];
    }
  //   const userId=500;
  //    this.apiService.Getmbbyuserid(userId).subscribe({
  //          next: (res) => {
  //            if (res.status === 'success') {
  //              const mobile = res.mobile_number;
  //            console.log(mobile);
  // }}});
  }
  submitOtp(){
    console.log('Attempting navigation to /tabs/home');
  this.router.navigate(['/basic-details-page']).then(
    () => console.log('Navigation successful'),
    (err) => console.error('Navigation failed', err)
  );
  }

  verifyOtp() {
  if (this.otp.length === 4 && !this.isLoading) {
    this.isLoading = true;
    console.log('Verifying OTP:', this.otp);

    this.authService.verifyOtp(this.mobileNumber, this.otp).subscribe({
      next: (response) => {
        console.log('OTP verified successfully', response);
        this.isLoading = false;

        const userId = response.data.user_id;
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', userId.toString());
//get mb 
        this.apiService.Getmbbyuserid(userId).subscribe({
          next: (res) => {
            if (res.status === 'success') {
              const mobile = res.mobile_number;
              console.log(mobile);
              const navigationExtras: NavigationExtras = {
                state: {
                  verified: true,
                  mobile_number: mobile
                }
              };
      
              if (this.isNewUser) {
                this.router.navigate(['/basic-details-page'], navigationExtras);
              } else {
                this.router.navigate(['/login'], navigationExtras);
              }
            } else {
              console.error('Failed to get mobile number:', res.message);
            }
          },
          error: (err) => {
            console.error('Error fetching mobile number:', err);
          }
        });
      },
      error: (error) => {
        console.error('Error verifying OTP', error);
        this.isLoading = false;
      }
    });
  } else {
    console.error('Invalid OTP or already processing');
  }
}


  goBack(){
    this.navCtrl.back();
    //handle hardware back button navigation
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.back();
    });
  }


  otpArray: string[] = ['', '', '', ''];
// otp: string = '';

onOtpChange(event: any, index: number) {
  const input = event.target as HTMLIonInputElement;
  const value = input.value as string;

  if (/^\d$/.test(value)) {
    this.otpArray[index] = value;
    this.otp = this.otpArray.join('');
    if (index < 3) {
      const nextInput = document.getElementById('otp-' + (index + 1)) as HTMLIonInputElement;
      if (nextInput) nextInput.setFocus();
    } else {
      input.getInputElement().then(native => native.blur());
    }
  }
}

onKeyDown(event: KeyboardEvent, index: number) {
  const input = event.target as HTMLInputElement;
  if (event.key === 'Backspace' && !input.value && index > 0) {
    const prevInput = document.getElementById('otp-' + (index - 1)) as HTMLIonInputElement;
    if (prevInput) prevInput.setFocus();
    this.otpArray[index] = '';
    this.otp = this.otpArray.join('');
  }
}


}
