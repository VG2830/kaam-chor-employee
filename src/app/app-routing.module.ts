import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
    loadChildren: () => import('./pages/basic-details-page/basic-details-page.module').then( m => m.BasicDetailsPagePageModule)
  },
  {
    path: 'company-details-page',
    loadChildren: () => import('./pages/company-details-page/company-details-page.module').then( m => m.CompanyDetailsPagePageModule)
  },
  {
    path: 'job-detail-page',
    loadChildren: () => import('./pages/job-detail-page/job-detail-page.module').then( m => m.JobDetailPagePageModule)
  },
 
  {
    path: 'employer-plan',
    loadChildren: () => import('./pages/employer-plan/employer-plan.module').then( m => m.EmployerPlanPageModule)
  },
  {
    path: 'checkout-modal',
    loadChildren: () => import('./checkout-modal/checkout-modal.module').then( m => m.CheckoutModalPageModule)
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./pages/my-profile/my-profile.module').then( m => m.MyProfilePageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
