import { __decorate, __metadata } from "tslib";
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
let SignupComponent = class SignupComponent {
    constructor(formBuilder, http, router) {
        this.formBuilder = formBuilder;
        this.http = http;
        this.router = router;
        this.username = '';
        this.password = '';
        this.firstname = '';
        this.lastname = '';
        this.email = '';
        this.userInfo = [
            {
                username: 'np',
                password: 'gg',
                firstname: 'dsf',
                lastname: 'df',
                email: 'sdfgsd'
            }
        ];
    }
    addUser() {
        this.userInfo.push({
            username: this.username,
            password: this.password,
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email
        });
        this.username = '';
        this.password = '';
        this.firstname = '';
        this.lastname = '';
        this.email = '';
    }
    ngOnInit() {
        this.signupForm = this.formBuilder.group({
            username: [''],
            password: [''],
            firstname: [''],
            lastname: [''],
            email: ['']
        });
    }
    signUp() {
        this.http.post("http://localhost:3000/signupUsers", this.signupForm.value)
            .subscribe(res => {
            alert("Signup Successful");
            this.signupForm.reset();
            this.router.navigate(['login']);
        }, err => {
            alert("Something went wrong");
        });
    }
};
SignupComponent = __decorate([
    Component({
        selector: 'app-signup',
        templateUrl: './signup.component.html',
        styleUrls: ['./signup.component.scss']
    }),
    __metadata("design:paramtypes", [FormBuilder, HttpClient, Router])
], SignupComponent);
export { SignupComponent };
//# sourceMappingURL=signup.component.js.map