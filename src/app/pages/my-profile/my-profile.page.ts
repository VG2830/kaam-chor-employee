import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Input ,Output,EventEmitter} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  standalone:false,
  styleUrls: ['./my-profile.page.scss'],
  // imports:[IonicModule,]
})
export class MyProfilePage implements OnInit {
  @Input() formData: any;
  profilePage:FormGroup;
  user_id!: number;
  empProfileOptions:any[]=[];
  industryTypeOptions: any[] = [];
  stateOptions: any[] = [];
  cityOptions: any[] = [];
  city: string = '';

  constructor(private fb: FormBuilder,private apiService: ApiService,private router: Router,private route: ActivatedRoute,private sanitizer: DomSanitizer) {
     {this.profilePage = this.fb.group({

  employer_name: [''],
  email: [''],
  reg_mb: [''],
  contact_person_profile: [''],
  company_name:[''],
  industry_type:[''],
  year_of_establishment:[''],
  comp_size:[''],
  comp_website:[''],
  abt_the_comp:[''],
  full_address:[''],
  state:[''],
  city:[''],
  google_map_loc:[''],
  country:['India']
 
    
        });}
   }

  ngOnInit() {
     this.apiService.getEmpProfile().subscribe((res: any) => {
       if (res.status === 'success') {
         this.empProfileOptions = res.data;
       }
     });
     this.apiService.getIndustryType().subscribe((res: any) => {
      if (res.status === 'success') {
        this.industryTypeOptions = res.data;
      }
    });
    this.apiService.getStates().subscribe((res: any) => {
      if (res.status === 'success') {
        this.stateOptions = res.data;
      }
    });
     const storedUserId = localStorage.getItem('userId');
     if (storedUserId) {
       this.user_id = parseInt(storedUserId, 10);

     this.apiService.getEmployerProfile(this.user_id).subscribe((res) => {
         if (res.status && res.data) {
           console.log(res);
      
          
        // Sanitize the HTML to make it safe for rendering     this.googleMapLoc = this.sanitizer.bypassSecurityTrustHtml(apiGoogleMapLoc);
 
 
          //  this.empProfile=res.data.employer_name;
         this.profilePage.patchValue({
          employer_name:res.data.personal_details.employer_name,
          reg_mb:res.data.personal_details.reg_mb,
         contact_person_profile:res.data.personal_details.contact_person_profile,
         email:res.data.personal_details.email,
         company_name:res.data.company_details.company_name,
         industry_type:res.data.company_details.industry_type,
         year_of_establishment:res.data.company_details.year_of_establishment,
         comp_size:res.data.company_details.comp_size,
         comp_website:res.data.company_details.comp_website,
         abt_the_comp:res.data.company_details.abt_the_comp,
         full_address:res.data.company_details.full_address,
         state:res.data.company_details.state,
         city:res.data.company_details.city,
         google_map_loc:this.sanitizer.bypassSecurityTrustHtml(res.data.company_details.google_map_loc)
         });
         const stateId = res.data.state;
         const cityId = res.data.city;
         this.initializecity(stateId, cityId);
           this.profilePage.disable();
        }

        })
         }
         
  }
  
  initializecity(stateId: number,cityId:number){
    if (stateId) {
      this.apiService.getCitiesByState(stateId).subscribe((res: any) => {
        if (res.status === 'success') {
          this.cityOptions = res.data;
          this.city = String(cityId); // Reset selected city
          this.profilePage.get('companycity')?.setValue(this.city); // Clear city field
        }
      });
    } else {
      this.cityOptions = [];
      this.city = '';
      this.profilePage.get('companycity')?.setValue('');
    }
  }
  // Load cities when a state is selected
  onStateChange(stateId: number) {
    if (stateId) {
      this.apiService.getCitiesByState(stateId).subscribe((res: any) => {
        if (res.status === 'success') {
          this.cityOptions = res.data;
          this.city = ''; // Reset selected city
          this.profilePage.get('companycity')?.setValue(''); // Clear city field
        }
      });
    } else {
      this.cityOptions = [];
      this.city = '';
      this.profilePage.get('companycity')?.setValue('');
    }
  }

}
