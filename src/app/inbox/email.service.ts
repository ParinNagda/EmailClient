import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import {Email} from './email'
interface EmailSummary {
  id: string,
  subject:string,
  from:string
}


@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http:HttpClient) { }

  rootUrl = 'https://api.angular-email.com/';

  getEmails() {
    return this.http.get<EmailSummary[]>(`${this.rootUrl}emails`)
  }

  getEmail(id:string) {
    return this.http.get<Email>(`${this.rootUrl}emails/${id}`)
  }

  sendEmail(payload:Email) {
    return this.http.post<any>(`${this.rootUrl}emails`,payload)
  }
}
