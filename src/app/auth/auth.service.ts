import { response } from 'express';
import { AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {BehaviorSubject} from  'rxjs';
import {tap} from 'rxjs/operators';

interface UserSignup {
  username:string;
  password:string;
  passwordConfirmation:string;
}



interface UserStatus {
  authenticated:boolean
  username:string
}

interface UsernameAvailable {
  available:boolean
}

interface SignUpResponse {
  username:string
}

interface SignInResponse {
  username:string
}

interface SignInCredentials {
  username:string
  password:string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com/';
  signedin$ = new BehaviorSubject(null);
  username:string=''
  constructor(private http:HttpClient) { }

  usernameAvailable(username:string) {
    return this.http.post<UsernameAvailable>(`${this.rootUrl}auth/username`,{
            username
        })
  }

  signup(credentials:any) {
    return this.http.post<SignUpResponse>(`${this.rootUrl}auth/signup`,
      credentials,
    ).pipe(
      tap(({username}) =>{
        this.signedin$.next(true)
        this.username = username;
      })
    )
  }

  checkUserStatus() {
    return this.http.get<UserStatus>(`${this.rootUrl}auth/signedin`)
    .pipe(
      tap(({authenticated,username}) => {
          this.signedin$.next(authenticated);
          this.username = username;
      })
    );
  }

  logout() {
    return this.http.post(`${this.rootUrl}auth/signout`,{}).pipe(
      tap(() => {
        this.signedin$.next(false);
      })
    )
  }

  signIn(credentials:Partial<SignInCredentials>) {
    return this.http.post<SignInResponse>(`${this.rootUrl}auth/signin`,credentials)
        .pipe(
          tap(({username}) => {
            this.signedin$.next(true);
            this.username = username
          })
        )          
  }
}
