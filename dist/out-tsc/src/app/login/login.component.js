import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
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
import { FormBuilder } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'app/service/restapi.service';
let LoginComponent = class LoginComponent {
    constructor(formBuilder, http, router) {
        this.formBuilder = formBuilder;
        this.http = http;
        this.router = router;
        this.username = '';
        this.password = '';
        this.userLogin = [
            {
                username: 'fdaghnjmrsythdstyjhtrjydyutjhg',
                password: 'gg',
            }
        ];
    }
    checkUser() {
        this.userLogin.push({
            username: this.username,
            password: this.password,
        });
        this.username = '';
        this.password = '';
    }
    checkData() {
        const User = new AuthService(this.http);
        User.login(this.username, this.password).subscribe((response) => {
            console.log("help");
            document.write("Welcome to the Web Page!");
        }, (error) => {
            console.error("error");
        });
    }
    ngOnInit() {
        this.signupForm = this.formBuilder.group({
            username: [''],
            password: ['']
        });
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css'],
    }),
    __metadata("design:paramtypes", [FormBuilder, HttpClient, Router])
], LoginComponent);
export { LoginComponent };
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
//# sourceMappingURL=login.component.js.map