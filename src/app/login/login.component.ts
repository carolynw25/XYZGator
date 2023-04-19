import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms"
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'app/service/restapi.service';
import { HttpHeaders } from '@angular/common/http'
import { EventEmitter } from 'stream';
import { UserIdService } from 'app/userIdService'

export interface IuserLogin{
  username: string
  password: string
}
  //making it personalized
//export let ID: any; // declare global variable
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // @Input() errorMessage = ''
  // @Output() onLogin: EventEmitter<AuthService(username: string, password: string )> = new EventEmitter()

  public username = ''
  public password = ''
  
  //new code
  public loginForm!: FormGroup;
  constructor(
    private formBuilder : FormBuilder, 
    private http : HttpClient, 
    private router:Router,
    private userIdService: UserIdService
  ) { }

  //ID variable
  //public ID: any;
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
    });
  }
  saveUserID(username: string, password: string) {
    const url = 'http://127.0.0.1:8080/api/getID'; // replace with your actual API endpoint
    const credentials = { username, password };
    this.http.post<{ id: number }>(url, credentials).subscribe(response => {
      const userID = response.id;
      // Do something with the userID, such as storing it in a variable or using it to make another API request
      this.userIdService.setUserId(userID);
    }, error => {
      console.error(error);
    })
  }
  onSubmit(): void {
  
    // this.onLogin.emit({
    //   username: this.username, password: this.password
    // })

    const body = {username: this.username, password: this.password} ;
    //const options = {headers: new HttpHeaders({'Content-Type':'application/json'}) };
    const headers = {
      'Content-Type': 'application/json'
    };

    this.http.post('http://127.0.0.1:8080/api/login', body, {headers}).subscribe
      (response => {
        this.saveUserID(this.username, this.password)
        
        // this.http.post('http://127.0.0.1:8080/api/getID', {}, {headers}).subscribe(
        //   response => {
        //     //this.ID = response['id'];
        //     const id = response['id'];
        //     localStorage.setItem('userID', id); // save the ID to localStorage
        //     this.router.navigate(['/main']);
        //   },
        //   error => {
        //     console.log(error);
        //   }
        // );
        
        
        // If the login is successful, redirect the user to the dashboard page
        this.router.navigate(['/dashboard']);
        //document.write("Welcome to the Web Page!");
      },
      error => {
        // If the login is unsuccessful, display an error message
        console.log(error);
        //this.router.navigate(['/main']);
      }
    );
  }


  // public userLogin: IuserLogin[] = [
  //   {
  //      username : 'fg',
  //      password : 'gg',
  //   }
  // ]


}