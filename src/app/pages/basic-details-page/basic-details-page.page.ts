// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { IonicModule } from '@ionic/angular';

// @Component({
//   selector: 'app-basic-details-page',
//   templateUrl: './basic-details-page.page.html',
//   styleUrls: ['./basic-details-page.page.scss'],
//   imports: [CommonModule, IonicModule] 
// })
// export class BasicDetailsPagePage implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
import { Component, OnInit ,Input ,Output,EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service'; 
import { LocalStorageUtil } from 'src/app/shared/utils/localStorageUtil';
import { Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-lastpage',
  standalone: false,
  templateUrl: './basic-details-page.page.html',
  styleUrls: ['./basic-details-page.page.scss'],
  
})
export class BasicDetailsPagePage  implements OnInit {
@Input() formData: any;
  @Output() prev = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();

   basiclast:FormGroup;

   //get api
   empProfileOptions:any[]=[];
  //  selectedEmplProfile:string="";

   //end 
  constructor( private fb: FormBuilder,  private navCtrl: NavController,private apiService: ApiService,private router: Router) {
   {this.basiclast = this.fb.group({

  emplname: ['', Validators.required],
  emplemail: ['', Validators.required,Validators.email],
  contactperson: ['', Validators.required],
  emplnumber: ['', Validators.required],
    // acceptTerms: [false, Validators.requiredTrue],
        });}}
  ngOnInit() {
     this.apiService.getEmpProfile().subscribe((res: any) => {
      if (res.status === 'success') {
        this.empProfileOptions = res.data;}
      });
  }
  subbmit() {
  if (this.basiclast.valid) {
    //  const accepted = this.basiclast.value.acceptTerms ? 1 : 0;
    //   console.log('Accepted value:', accepted);
    console.log('Form data:', this.basiclast.value);
    // this.navCtrl.navigateForward('next-page'); // Replace with actual route
  } else {
    this.basiclast.markAllAsTouched();
    console.log('Form is invalid');
  }
}

submitForm() {
  if (this.basiclast.invalid) {
    this.basiclast.markAllAsTouched(); // Show validation errors
    return;
  }
   if(this.basiclast.valid){
            this.router.navigate(['/company-details-page']);
          }

  // const formData = this.jobForm.value;
const formData = {
  ...this.basiclast.value,
  // step_third_data: "step 3", // replace with actual step one form/control or object
  user_id: LocalStorageUtil.getItem('userId')
};

  console.log('Submitting form:', formData);

  // Call your API service here
  this.apiService.submitBasic(formData).subscribe(
    (response:any) => {
      console.log('Success:', response);
      // Show success toast or redirect
    },
    (error:any) => {
      console.error('API Error:', error);
      // Show error toast
    }
  );
}
}
