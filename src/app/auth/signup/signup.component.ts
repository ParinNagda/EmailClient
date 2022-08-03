import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl,Validators} from '@angular/forms'
import { MatchPassword } from '../validators/match-password'
import { UniqueUserName } from './../validators/unique-user-name';
import { AuthService } from '../auth.service'
import { response } from 'express';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  authForm = new FormGroup(
    { 
      username:new FormControl('',  [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ],
    [this.uniqueUser.validate]
    ),
    password:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]),
    passwordConfirmation:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]),
  },{
    validators:[this.matchPassword.validate]
  })
  constructor(
    private authService : AuthService,
    private matchPassword:MatchPassword,
    private uniqueUser: UniqueUserName,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  showErrors(){
    return this.authForm.controls['password'].touched && this.authForm.controls['passwordConfirmation'].touched && this.authForm.errors
  }

  onSubmit() {
    if(this.authForm.invalid) {
      return;
    }                                           
    this.authService.signup(this.authForm.value).subscribe({
      next: (response)=>{
        //Navigate
        this.router.navigateByUrl('/inbox');
      },
      error:(err) => {
        if(!err.status) {
          this.authForm.setErrors({noConnection:true});
        }
        this.authForm.setErrors({unknownError:true});
      }
    })
  }
}
