import { response } from 'express';
import { EmailService } from './../email.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators'
import { ObservableInput } from 'rxjs';
import {Email} from '../email'

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit {

  constructor(private route:ActivatedRoute, private emailService:EmailService) {
    this.route.data.subscribe(({email})=>{
      this.email = email
    })
   }
  email:Email;
  ngOnInit(): void {
    // this.route.params.pipe(
    //   switchMap(({id}):ObservableInput<any> => {
    //     return this.emailService.getEmail(id)
    //   })
    // ).subscribe((email) => {
    //   this.email = email
    // })
  }

}
