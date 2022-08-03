import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20),Validators.pattern(/^[a-z0-9]+$/)]),
    password: new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(20)])
  })

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.authForm.invalid) {
      return;
    }
    this.authService.signIn(this.authForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/inbox');
      },
      error: ({error}) => {
          if(!error.status) {
            this.authForm.setErrors({noConnection:true});
          }
          if(error.username || error.password) {
            this.authForm.setErrors({credentials:true});
          }
      }
    })
  }

  showErrors(){
    return this.authForm.controls['password'].touched && this.authForm.controls['username'].touched && this.authForm.errors
  }

}
