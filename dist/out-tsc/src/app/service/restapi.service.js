// What they had before
import { __decorate, __metadata } from "tslib";
// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// @Injectable({
//   providedIn: 'root'
// })
// export class RestapiService {
//   constructor(private http:HttpClient) { }
//   GetAllUsers(){
//     return this.http.get("http://localhost:3000/users");
//   }
// }
// Attempt to connect to API
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
let UserService = class UserService {
    constructor(http) {
        this.http = http;
        this.apiEndpoint = 'http://0.0.0.0:8080/api';
    }
    // getUsers() {
    //   return this.http.get('$(this.apiEndpoint}/users');
    getUser(userId) {
        return this.http.get('$(this.apiEndpoint}/userId');
        //return this.http.get(`/api/users/${userId}`);
    }
};
UserService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [HttpClient])
], UserService);
export { UserService };
let AuthService = class AuthService {
    constructor(http) {
        this.http = http;
        this.apiEndpoint = 'http://0.0.0.0:8080/api';
    }
    login(username, password) {
        return this.http.post('$(this.apiEndpoint}/users', { username, password });
    }
};
AuthService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [HttpClient])
], AuthService);
export { AuthService };
//# sourceMappingURL=restapi.service.js.map