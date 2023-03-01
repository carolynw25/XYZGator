import { Component, OnInit } from '@angular/core';
// Attempt to connect to API

import { UserService } from 'app/service/restapi.service';
// @Component({
//   selector: 'app-user-list',
//   template: `
//   <h1> User List </h1>
//   <ul>
//     <li *ngFor="let user of users"> {{user.username}}</li>
//   </ul>
//   `
// })

// export class UserListComponent implements OnInit {
//   users: any[];

//   constructor(private userService: UserService) { } 
//   ngOnInit() {
//     this.userService.getUsers()
//     .subscribe((data: any[]) => {
//       this.users = data;
//     });
//   }
// }

//  @Component({
//   selector: 'app-login',
// //   template: `
// //   <form (submit)= "onSubmit()">
// //     <input type="text" [(ngModel)]="username" name="username">
// //     <input type="password" [(ngModel)]="password" name="password">
// //     <button type="submit">Login</button>
// // </form>
//   // `
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],


// }) 

// export class LoginComponent {
//   username: string;
//   password: string;

//   constructor(private userService: UserService) {}

//   onSubmit() {
//     call getUser function with the entered username as the ID
//     this.userService.getUser(this.username).subscribe(user => {
//       //Do something with the retrieved user data
//       console.log(user);
//     });
//   }
// }
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
//   // //   template: `
// // //   <form (submit)= "onSubmit()">
// // //     <input type="text" [(ngModel)]="username" name="username">
// // //     <input type="password" [(ngModel)]="password" name="password">
// // //     <button type="submit">Login</button>
// // // </form>
// //   // `
// //   templateUrl: './login.component.html',
// //   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent implements OnInit {

//   username: string;
//   password: string;

//   constructor(private userService: UserService) {}

//   onSubmit() {
//     //call getUser function with the entered username as the ID
//     this.userService.getUser(this.username).subscribe(user => {
//     //Do something with the retrieved user data
//       console.log(user);
//     });
//   }

//   ngOnInit(): void {
//   }

//}

//TAKE 2
import {FormGroup, FormBuilder} from "@angular/forms"
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'app/service/restapi.service';
import { HttpHeaders } from '@angular/common/http'

export interface IuserLogin{
  username: string
  password: string
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public username = ''
  public password = ''
  //new code
  public loginForm!: FormGroup;
  constructor(
    private formBuilder : FormBuilder, 
    private http : HttpClient, 
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
    });
  }

  onSubmit(): void {
    // const user: IuserLogin = {
    //   username: this.username,
    //   password: this.password,
    // };
    const body = {username: this.username, password: this.password} ;
    //const options = {headers: new HttpHeaders({'Content-Type':'application/json'}) };
    const headers = {
      'Content-Type': 'application/json'
    };

    this.http.post('http://127.0.0.1:8080/api/login', body, {headers}).subscribe
      (response => {
        // If the login is successful, redirect the user to the dashboard page
        this.router.navigate(['/main']);
        //document.write("Welcome to the Web Page!");
      },
      error => {
        // If the login is unsuccessful, display an error message
        console.log(error);
        //this.router.navigate(['/main']);
        
        

      }
    );
  }


  public userLogin: IuserLogin[] = [
    {
       username : 'fg',
       password : 'gg',
    }
  ]

  // public signupForm !: FormGroup;
  // checkUser(){
  //   this.userLogin.push({
  //     username: this.username,
  //     password: this.password,
  //   })
  //   this.username = ''
  //   this.password = ''
  // }

  checkData() {
    // const User = new AuthService(this.http);
    // User.login(this.username, this.password).subscribe(
    // (response) => {
    //   console.log(help);
    //   document.write("Welcome to the Web Page!");
    // },
    // (error) => {
    //   console.error(error);
    // }


  }
  // ngOnInit(): void {
    
  //   this.signupForm = this.formBuilder.group({
  //     username:[''],
  //     password:['']
  //   })

  // }

}



//stuff that was already here
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

//}
