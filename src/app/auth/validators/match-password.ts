import { Injectable } from '@angular/core'
import {Validator,AbstractControl} from '@angular/forms'

@Injectable({providedIn:'root'})
export class MatchPassword implements Validator {
    validate(formGroup:AbstractControl) {
            let {password,passwordConfirmation} = formGroup.value;
            console.log({password,passwordConfirmation});
            
            if(password === passwordConfirmation) {
                return null;
            } else {
            return {passwordsDontMatch:true}
            }
    }
}
