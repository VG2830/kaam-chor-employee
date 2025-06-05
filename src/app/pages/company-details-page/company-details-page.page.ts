import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { LocalStorageUtil } from 'src/app/shared/utils/localStorageUtil';
import { ApiService } from 'src/app/services/api.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainfirst',
  standalone: false,
  templateUrl: './company-details-page.page.html',
  styleUrls: ['./company-details-page.page.scss'],
 
})
export class CompanyDetailsPagePage implements OnInit {
  @Input() formData: any;
  @Output() prev = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();
  company: FormGroup;
//get api 
  industryTypeOptions:any[]=[];
  selectedIndustryType:string='';
  
  stateOptions:any[]=[];
  selectedState:string="";

   cityOptions:any[]=[];
   selectedCity:string="";

//
  constructor(private fb: FormBuilder, private navCtrl: NavController,private apiService: ApiService,private router: Router) {
    {
      this.company = this.fb.group({
        companyname: ['', Validators.required],
        companyaddress: ['', Validators.required],
        companystate: ['', Validators.required],
        companycity: ['', Validators.required],
        google_location:[''],
        companycountry: ['', Validators.required],
        companywebsite: ['', Validators.required],
        companydesc: ['', Validators.required],
        industrytype: ['', Validators.required],
        numemployees: ['', Validators.required],
        companyestb: ['', Validators.required],
      });
    }
  }

  ngOnInit()
   {
     this.apiService.getIndustryType().subscribe((res: any) => {
      if (res.status === 'success') {
        this.industryTypeOptions = res.data;}
      });
      this.apiService.getStates().subscribe((res: any) => {
      if (res.status === 'success') {
        this.stateOptions = res.data;}
      });
  //     // this.apiService.getCitiesByState().subscribe((res: any) => {
  //     // if (res.status === 'success') {
  //     //   this.cityOptions = res.data;}
  //     // });
  }
  showTutorial = false;
  openTutorial() {
    this.showTutorial = true;
  }
  closeTutorial() {
    this.showTutorial = false;
  }
// Load cities when a state is selected
    onStateChange(stateId: number) {
    if (stateId) {
    this.apiService.getCitiesByState(stateId).subscribe((res: any) => {
      if (res.status === 'success') {
        this.cityOptions = res.data;
        this.selectedCity = ''; // Reset selected city
        this.company.get('companycity')?.setValue(''); // Clear city field
      }
    });
  } else {
    this.cityOptions = [];
    this.selectedCity = '';
    this.company.get('companycity')?.setValue('');
  }
}

  nextStep2() {
    if (this.company.valid) {
      console.log('Form data:', this.company.value);
      // this.navCtrl.navigateForward('next-page'); // Replace with actual route
    } else {
      this.company.markAllAsTouched();
      console.log('Form is invalid');
    }
  }
  //
  previousPage() {

    this.router.navigate(['/basic-details-page']);
   
  }

  submitForm() {
    if (this.company.invalid) {
      this.company.markAllAsTouched(); // Show validation errors
      return;
    }
   
    // const formData = this.jobForm.value;
    const formData = {
      ...this.company.value,
      // step_two_data: "step 2", // replace with actual step one form/control or object
      user_id: LocalStorageUtil.getItem('userId'),
    };

    console.log('Submitting form:', formData);

    // Call your API service here
    this.apiService.submitCompany(formData).subscribe(
      (response: any) => {
        console.log('Success:', response);
        // Show success toast or redirect
        this.router.navigate(['/job-detail-page']);

      },
      (error: any) => {
        console.error('API Error:', error);
        // Show error toast
      }
    );
  }
}
