import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {take, skipWhile, tap} from 'rxjs/operators'
import {AuthService} from './auth.service';
  
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  
  constructor(private authservice:AuthService, private router:Router){}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(this.authservice.signedin$);
      
    return this.authservice.signedin$.pipe(
      skipWhile(value => value === null),
      take(1),
      tap(authenticated => {
        console.log(authenticated);
        if (!authenticated || authenticated ===null) {
          this.router.navigateByUrl('/');
        } 
        return true;
      })
    );
  }
}
