import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoginInterface } from '../interfaces/loginInterface';
import { AuthState } from '../interfaces/authStateInterface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.API_URL;

  public authState = signal<AuthState>({ loggedIn: false });

  constructor(private http: HttpClient) { }

  loginUser(formData: LoginInterface){
    return this.http.post(`${this.apiUrl}/auth/login`, formData).pipe(
      tap((res: any) => {
        this.authState.set({ loggedIn: true, user: res.user });
      })
    );
  }

  verifySession(){
    return this.http.get(`${this.apiUrl}/auth/session`).pipe(
      tap((res: any) => {
        this.authState.set({ loggedIn: true, user: res.user });
      }, () => {
        this.authState.set({ loggedIn: false });
      })
    );
  }

  logout(){
    return this.http.post(`${this.apiUrl}/auth/logout`, {}).pipe(
      tap(() => {
        this.authState.set({ loggedIn: false });
      }, () => {
        console.log('Error en logout');
      })
    )
  }

}
