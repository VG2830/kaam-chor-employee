import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  requestOtp(phoneNumber: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }
  // private apiURL = `${environment.baseUrl}`;
  private apiUrl = `${environment.baseUrl}`;

  sendOtp(mobileNumber: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/send_otp_e`, { mobileNumber });
  }

  verifyOtp(mobileNumber: string, otp: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/verify_otp_e`, { mobileNumber, otp });
  }

  getmb_byuserid(userId: number): Observable<any>{
    return this.http.post(`${this.apiUrl}/api/get_usermb`, { userId });
  }
}
    
