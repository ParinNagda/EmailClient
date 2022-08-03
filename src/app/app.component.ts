import { Component } from '@angular/core';
import {AuthService} from './auth/auth.service'
import {BehaviorSubject} from  'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'emailclient';
  signedin$:BehaviorSubject<boolean>;
  constructor(private authService:AuthService){
    this.signedin$ = this.authService.signedin$;
  }

  ngOnInit(){
    this.authService.checkUserStatus().subscribe((res) => { console.log(this.authService.signedin$);
      
    
    });
  }
  
}
