import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'splash-screen',
    pathMatch: 'full'
  },
  {
    path: 'splash-screen',
    loadChildren: () => import('./pages/splash-screen/splash-screen.module').then( m => m.SplashScreenPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'otp-verf',
    loadChildren: () => import('./pages/otp-verf/otp-verf.module').then( m => m.OtpVerfPageModule)
  },
  {
    path: 'basic-details-page',
    loadChildren: () => import('./pages/basic-details-page/basic-details-page.module').then( m => m.BasicDetailsPagePageModule),canActivate: [AuthGuard]
  },
  {
    path: 'company-details-page',
    loadChildren: () => import('./pages/company-details-page/company-details-page.module').then( m => m.CompanyDetailsPagePageModule),canActivate: [AuthGuard]
  },
  {
    path: 'job-detail-page',
    loadChildren: () => import('./pages/job-detail-page/job-detail-page.module').then( m => m.JobDetailPagePageModule),canActivate: [AuthGuard]
  },
 
  {
    path: 'employer-plan',
    loadChildren: () => import('./pages/employer-plan/employer-plan.module').then( m => m.EmployerPlanPageModule),canActivate: [AuthGuard]
  },
  {
    path: 'checkout-modal',
    loadChildren: () => import('./checkout-modal/checkout-modal.module').then( m => m.CheckoutModalPageModule)
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./pages/my-profile/my-profile.module').then( m => m.MyProfilePageModule),canActivate: [AuthGuard]
  },
  {
    path: 'account-setting',
    loadChildren: () => import('./pages/account-setting/account-setting.module').then( m => m.AccountSettingPageModule),canActivate: [AuthGuard]
  },
  {
    path: 'saved-candidates',
    loadChildren: () => import('./pages/saved-candidates/saved-candidates.module').then( m => m.SavedCandidatesPageModule),canActivate: [AuthGuard]
  },
  {
    path: 'my-jobs',
    loadChildren: () => import('./pages/my-jobs/my-jobs.module').then( m => m.MyJobsPageModule),canActivate: [AuthGuard]
  },
  {
    path: 'inactive-jobs',
    loadChildren: () => import('./pages/inactive-jobs/inactive-jobs.module').then( m => m.InactiveJobsPageModule),canActivate: [AuthGuard]
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
