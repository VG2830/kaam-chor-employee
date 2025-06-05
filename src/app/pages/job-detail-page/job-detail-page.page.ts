import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray,Validators,FormControl  } from '@angular/forms';
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

  company_id:string | undefined;


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
      company_id:[''],
      issecuritygiven: ['', Validators.required],
      languages: this.fb.array([this.createLanguageGroup()]),
      jobStartTime: ['', Validators.required],
      jobEndTime: ['', Validators.required],
      interviewTime: ['', Validators.required],
      interviewDay: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],

    });
  }
  
   get languages(): FormArray {
    return this.jobForm.get('languages') as FormArray;
  }

  createLanguageGroup(): FormGroup {
    return this.fb.group({
      language: [null, Validators.required],
      rws: this.fb.group({
        read: [false],
        write: [false],
        speak: [false]
      })
    });
  }
 private transformLanguagesData(languages: any[]): any[] {
  return languages.map(lang => {
    const rwsArray = [];
    if (lang.rws.read) rwsArray.push('Read');
    if (lang.rws.write) rwsArray.push('Write');
    if (lang.rws.speak) rwsArray.push('Speak');
    
    return {
      language_id: lang.language_id,
      language: lang.language,
      rws: rwsArray.join(', ')
    };
  });
}
  ngOnInit() {
    this.apiService.getJobCategory().subscribe((res: any) => {
      if (res.status === 'success') {
        this.dropdownOptions = res.data;
      }
    });
 const user_id=LocalStorageUtil.getItem('userId');

 const data ={
  user_id: user_id
 }
  this.apiService.get_user_compID(data).subscribe(
  (response: any) => {
    this.company_id = response.company_id;
    console.log('Company ID Data:', this.company_id);
  },
  error => {
    console.error('Error fetching data:', error);
  }
);

    this.apiService.getLanguages().subscribe((res: any) => {
      if (res.status === 'success') {
        this.languageOptions = res.data;
      }
       if (res) {
      const skills = this.jobForm.get('rws')?.value;
     
    }
    });
    this.apiService.getEduQual().subscribe((res: any) => {
      if (res.status === 'success') {
        this.qualification = res.data;
      }
    });
  
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
                  this.languages.push(this.createLanguageGroup()); 
          }
          removeLanguage(index: number){

if (this.languages.length > 1) {
      this.languages.removeAt(index);
    }
}
  nextStep() {
    this.markFormTouched(this.jobForm);
    if (this.jobForm.valid) {
      console.log('Form data:', this.jobForm.value);
      this.navCtrl.navigateForward('');
      const accepted = this.jobForm.value.acceptTerms ? true : false;
      console.log('Accepted value:', accepted);
      console.log(this.company_id);
 
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
    const formValue=this.jobForm.value;
     const transformedLanguages = this.transformLanguagesData(formValue.languages);
     let minExp, maxExp;
  if (formValue.candidatetype === 'fresher') {
    minExp = 'Fresher';
    maxExp = 'Fresher';
  } else {
    // For experienced candidates, ensure we have valid numbers
    minExp = formValue.minexp?.toString() || '0';
    maxExp = formValue.maxexp?.toString() || '0';
  }
     const formData = {
  ...formValue,
  user_id: LocalStorageUtil.getItem('userId'),
    company_id:this.company_id,
      interviewDay: Array.isArray(formValue.interviewDay) 
      ? formValue.interviewDay.join(',') 
      : formValue.interviewDay,
       languages: transformedLanguages,
       skills: Array.isArray(formValue.skills) 
      ? formValue.skills.join(',') 
      : formValue.skills,
      min_exp:minExp,
      max_exp:maxExp
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
