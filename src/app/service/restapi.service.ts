// What they had before

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
import { IuserLogin } from 'app/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiEndpoint = 'http://128.227.1.31:8080/api';
  constructor(private http: HttpClient) {
  }

  // getUsers() {
  //   return this.http.get('$(this.apiEndpoint}/users');
  getUser(userId: string) {
    return this.http.get('$(this.apiEndpoint}/userId');
    //return this.http.get(`/api/users/${userId}`);
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiEndpoint = 'http://128.227.1.31:8080/api';
  constructor(private http: HttpClient) { }
  
  login(username: string, password: string) {
    return this.http.post('$(this.apiEndpoint}/login', {username, password});
  }
  // sendUserData(userLogin: IuserLogin) {
  //   const headers = {
  //     'Content-Type': 'application/json'
  //   };
  //   return this.http.post('http://0.0.0.0:8080/api', userLogin, { headers });
  // }

}

