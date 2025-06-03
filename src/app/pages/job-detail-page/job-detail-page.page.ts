import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl  } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { LocalStorageUtil } from 'src/app/shared/utils/localStorageUtil';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-detail-page',
  standalone: false,
  templateUrl: './job-detail-page.page.html',
  styleUrls: ['./job-detail-page.page.scss'],
})
export class JobDetailPage implements OnInit {
  languageControl = new FormControl();
  // selectedLanguage: any;
  // selectedLanguage2: any;
  // selectedJob:any;
  @Input() formData: any;
  @Output() submit = new EventEmitter<void>();

 
  form = {
    description: ''
  };

  dropdownOptions: any[] = [];
  languageOptions: any[] = [];
  selectedSkills: any[] = [];
  // languageOptions2: any[] = [];
  // languageOptions3:any[]=[];
  // languageOptions4:any[]=[];
  qualification:any[]=[];
  jobForm: FormGroup;

  
  selectedQualifications: string = '';

  // Radio/select controls holders
  WorkFromHome: string = '';
  isgender: string = '';
  jobtype: string = '';
  selectedLocation: string = '';
  issecuritygiven: string = '';
  candidatetype: string = '';

  locations: string[] = [
    "Within 10 KM of my city",
    'Within my city',
    'Anywhere in India'
  ];

  comp:any;


  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private navCtrl: NavController,
    private router: Router
  ) {
    this.jobForm = this.fb.group({
      jobTitle: ['', [Validators.required, Validators.minLength(3)]],
      jobCategory: ['', Validators.required],
      jobType: ['', Validators.required],
      positionsOpen: ['', [Validators.required, Validators.min(1)]],
      jobDescription: ['', Validators.required],
      candidatetype: ['', Validators.required],
      minexp: [''],
      maxexp: [''],
      isgender: ['', Validators.required],
      locations: ['', Validators.required],
      WorkFromHome: ['', Validators.required],
      qualification: [[], Validators.required],
      salary: ['', Validators.required],
      skills: ['', Validators.required],
      comp:[''],
      issecuritygiven: ['', Validators.required],
      language1: ['', Validators.required],
      language1Skills: this.fb.group({
      read: [false],
       write: [false],
       speak: [false]
      }),
      // language2: [''],
      // language3:[''],
      // language4:[''],
      jobStartTime: ['', Validators.required],
      jobEndTime: ['', Validators.required],
      interviewTime: ['', Validators.required],
      interviewDay: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],

    });
  }

  ngOnInit() {
    this.apiService.getJobCategory().subscribe((res: any) => {
      if (res.status === 'success') {
        this.dropdownOptions = res.data;
      }
    });
    // this.apiService.get_user_compID().subscribe(
    //   data => {
    //     this.comp = data;
    //     console.log('Company ID Data:', data);
    //   },
    //   error => {
    //     console.error('Error fetching data:', error);
    //   }
    // );
    this.apiService.getLanguages().subscribe((res: any) => {
      if (res.status === 'success') {
        this.languageOptions = res.data;
      }
       if (res) {
      const skills = this.jobForm.get('language1Skills')?.value;
     
    }
    });
    this.apiService.getEduQual().subscribe((res: any) => {
      if (res.status === 'success') {
        this.qualification = res.data;
      }
    });
    //  this.apiService.getLanguages().subscribe((res: any) => {
    //   if (res.status === 'success') {
    //     this.languageOptions2 = res.data;
    //   }
    // });
    this.apiService.getSkills().subscribe((res: any) => {
      if (res.status === 'success') {
        this.selectedSkills = res.data;
      }
    });
  }

  markFormTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
removeSkill(skill: any) {
  const currentSkills = this.jobForm.get('skills')?.value || [];
  this.jobForm.get('skills')?.setValue(currentSkills.filter((id: number) => id !== skill.id));
}
           addLanguage(){

          }
          removeLanguage(){


}
  nextStep() {
    this.markFormTouched(this.jobForm);
    if (this.jobForm.valid) {
      console.log('Form data:', this.jobForm.value);
      this.navCtrl.navigateForward('');
      const accepted = this.jobForm.value.acceptTerms ? true : false;
      console.log('Accepted value:', accepted);
    } else {
      console.log('Form is invalid');
    }
  }

  previousPage() {
   
    console.log('Previous step clicked');
    this.router.navigate(['/company-details-page']);
   
  }
 
  submitForm() {
    if (this.jobForm.invalid) {
      this.jobForm.markAllAsTouched();
      return;
    }

//   
const formData = {
  ...this.jobForm.value,
  user_id: LocalStorageUtil.getItem('userId'),
};

    console.log('Submitting form:', formData);

    this.apiService.submitJob(formData).subscribe(
      (response: any) => {
        console.log('Success:', response);
        
      },
      (error: any) => {
        console.error('API Error:', error);
        
      }
    );
  }

  selectQualifications(level: string) {
    this.selectedQualifications = level;
    this.jobForm.get('qualification')?.setValue(level);
    console.log("Selected qualification:", level);
  }

  selectWorkType(choice: string) {
    this.WorkFromHome = choice;
    this.jobForm.get('WorkFromHome')?.setValue(choice);
    console.log("Work from home:", choice);
  }

  selectgenderType(gender: string) {
    this.isgender = gender;
    this.jobForm.get('isgender')?.setValue(gender);
    console.log("Gender:", gender);
  }

  selectjobType(time: string) {
    this.jobtype = time;
    this.jobForm.get('jobType')?.setValue(time);
    console.log("Job type:", time);
  }

  selectLocation(location: string) {
    this.selectedLocation = location;
    this.jobForm.get('locations')?.setValue(location);
    console.log('Candidate location:', location);
  }

  selectsecurity(security: string) {
    this.issecuritygiven = security;
    this.jobForm.get('issecuritygiven')?.setValue(security);
    console.log("Security deposit:", security);
  }

  selectcanType(cantype: string) {
    this.candidatetype = cantype;
    this.jobForm.get('candidatetype')?.setValue(cantype);

    if (cantype === 'fresher') {
      this.jobForm.get('minexp')?.setValue('Fresher');
      this.jobForm.get('maxexp')?.setValue('Fresher');
      this.jobForm.get('minexp')?.disable();
      this.jobForm.get('maxexp')?.disable();
    } else {
      this.jobForm.get('minexp')?.reset();
      this.jobForm.get('maxexp')?.reset();
      this.jobForm.get('minexp')?.enable();
      this.jobForm.get('maxexp')?.enable();
    }
    console.log("Candidate type:", cantype);
  }

  handlerequirement(event: Event): void {
    const target = event.target as HTMLInputElement;
    console.log('Current value:', JSON.stringify(target.value));
  }

  handleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    console.log('Current value:', JSON.stringify(target.value));
  }
}
