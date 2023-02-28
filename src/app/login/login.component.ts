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
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  // //   template: `
// //   <form (submit)= "onSubmit()">
// //     <input type="text" [(ngModel)]="username" name="username">
// //     <input type="password" [(ngModel)]="password" name="password">
// //     <button type="submit">Login</button>
// // </form>
//   // `
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private userService: UserService) {}

  onSubmit() {
    //call getUser function with the entered username as the ID
    this.userService.getUser(this.username).subscribe(user => {
    //Do something with the retrieved user data
      console.log(user);
    });
  }

  ngOnInit(): void {
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
