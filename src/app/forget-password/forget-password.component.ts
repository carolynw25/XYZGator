import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserIdService } from 'app/userIdService';
import {FormGroup, FormBuilder} from "@angular/forms";
import { Router } from '@angular/router';



@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(
    private formBuilder : FormBuilder, 
    private http : HttpClient, 
    private router:Router,
    private userIdService: UserIdService) { }

    public email = ''

  ngOnInit(): void {
  }
  onSubmit(): void {
    const body = {email: this.email} ;
    //const options = {headers: new HttpHeaders({'Content-Type':'application/json'}) };
    const headers = {
      'Content-Type': 'application/json'
    };

    this.http.post('http://127.0.0.1:8080/api/login', body, {headers}).subscribe
      (response => {
        //this.saveUserID(this.username, this.password)
        // If the login is successful, redirect the user to the dashboard page
        this.router.navigate(['/main']);
        document.write("Welcome to the Web Page!");
      },
      error => {
        // If the login is unsuccessful, display an error message
        console.log(error);
        //this.router.navigate(['/main']);
      }
    );
  }

}
