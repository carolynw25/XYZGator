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

interface IuserLogin{
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

  public userLogin: IuserLogin[] = [
    {
       username : 'fdaghnjmrsythdstyjhtrjydyutjhg',
       password : 'gg',
    }
  ]

  public signupForm !: FormGroup;
  constructor(private formBuilder : FormBuilder, private http : HttpClient, private router:Router) { }

  checkUser(){
    this.userLogin.push({
      username: this.username,
      password: this.password,
    })
    this.username = ''
    this.password = ''
  }




  ngOnInit(): void {
    
    this.signupForm = this.formBuilder.group({
      username:[''],
      password:['']
    })

  }

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
