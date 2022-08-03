import {Injectable} from '@angular/core'
import { Observable,map,of,catchError } from 'rxjs';

import {AuthService} from '../auth.service'
import {AbstractControl,AsyncValidator,ValidationErrors} from '@angular/forms'

@Injectable({providedIn:'root'})
export class UniqueUserName implements AsyncValidator {
    constructor(private auth:AuthService){}

    validate = (control:AbstractControl <any, any> ) : Observable<ValidationErrors | null> => {
        const value = control.value;
        return this.auth.usernameAvailable(value)
        .pipe(
            map((value:{available:boolean}) => {
                return null;
            }),
            catchError((err:any) =>{
                if(err.error.username) {
                    return of({nonUniqueUsername:true});
                }
                return of({noConnection:true});

            })
        )
        
    }
}
