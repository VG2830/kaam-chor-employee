
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
export class BasicDetailsPagePage implements OnInit {
  @Input() formData: any;
  @Output() prev = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();

  basiclast: FormGroup;
  user_id!: number;
  mobileNumber: string = '';
  //get api
  //  empProfileOptions:string='';
  empProfileOptions: any[] = [];
  //  selectedEmplProfile:string="";
  emplnumber: string = '';
  empProfile: string = '';
  isNewUser: boolean | undefined ;
  //end
  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    {
      this.basiclast = this.fb.group({
        emplname: ['', Validators.required],
        emplemail: ['', Validators.required, Validators.email],
        contactperson: ['', Validators.required],
        emplnumber: ['', Validators.required],
      });
    }
  }
  ngOnInit() {
    this.apiService.getEmpProfile().subscribe((res: any) => {
      if (res.status === 'success') {
        this.empProfileOptions = res.data;
      }
    });

    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.user_id = parseInt(storedUserId, 10);
      this.apiService.Getmbbyuserid(this.user_id).subscribe((res) => {
        if (res.status && res.data?.mobile_number) {
          this.mobileNumber = res.data.mobile_number;
          this.basiclast.patchValue({ emplnumber: this.mobileNumber }); // Prefill mobile field
        }
      });

     this.apiService.getEmployerData(this.user_id).subscribe(
  (res) => {
    console.log(res);
    if (res.status && res.data) {
      console.log(res);

      this.basiclast.patchValue({
        emplname: res.data.employer_name,
        emplnumber: res.data.reg_mb,
        contactperson: res.data.contact_person_profile,
        emplemail: res.data.email,
      });

      this.basiclast.disable();
      this.isNewUser = false;
    } else {
      // If no data, treat as new user
      this.isNewUser = true;
      console.log(this.isNewUser);
    }
  },
  (error) => {
    console.error('Error fetching employer data:', error);

    if (error.status === 404) {
      // Specifically handle 404
      console.log('Employer data not found (404). Treating as new user.');
      this.isNewUser = true;
    } else {
      // Handle other errors if needed
      console.log('An unexpected error occurred.');
    }
  }
);

    }
  }
  validatePhoneNumber(event: any) {
    const input = event.target as HTMLIonInputElement;
    const value = input.value as string;

    // Remove any non-digit characters
    const numericValue = value.replace(/\D/g, '');

    // Limit to 10 digits
    this.emplnumber = numericValue.slice(0, 10);

    // Update the input value
    input.value = this.emplnumber;
  }
  onlyNavigation() {
    this.router.navigate(['/company-details-page']);
  }

  submitForm() {
    if (this.basiclast.invalid) {
      this.basiclast.markAllAsTouched(); // Show validation errors
      return;
    }
    if (this.basiclast.valid) {
      this.router.navigate(['/company-details-page']);
    }

    // const formData = this.jobForm.value;
    const formData = {
      ...this.basiclast.value,
      // step_third_data: "step 3", // replace with actual step one form/control or object
      user_id: LocalStorageUtil.getItem('userId'),
    };

    console.log('Submitting form:', formData);

    // Call your API service here
    this.apiService.submitBasic(formData).subscribe(
      (response: any) => {
        console.log('Success:', response);
        // Show success toast or redirect
        this.router.navigate(['/company-details-page']);
      },
      (error: any) => {
        console.error('API Error:', error);
        // Show error toast
      }
    );
  }
}
