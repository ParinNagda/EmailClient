import { EmailService } from './email.service';
import { Injectable } from '@angular/core';
import {Router,Resolve,ActivatedRouteSnapshot} from '@angular/router'
import {Email} from '../inbox/email'
import {catchError} from 'rxjs/operators'
import {EMPTY} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class EmailResolverService implements Resolve<Email> {

  constructor(private emailService:EmailService,private router:Router) { }

  resolve(route:ActivatedRouteSnapshot) {
    const {id} = route.params
    return this.emailService.getEmail(id).pipe(
      catchError(() => {
        this.router.navigateByUrl('/inbox/not-found')
        return EMPTY; 
      })
    );
  }
}
