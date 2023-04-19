import { HttpClient } from '@angular/common/http';
import { Component, OnInit , ChangeDetectionStrategy} from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from "@angular/forms"
import { Router } from '@angular/router';
import { UserIdService } from 'app/userIdService';
import { Observable, take } from 'rxjs';

interface User {
  userName: string;
  passWord: string;
  favAnimal: string;
  firstName: string;
  lastName: string;
  email: string;
}

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})


export class UserComponent implements OnInit{
    public username = ''
    public password = ''
    public favoriteAnimal = ''
    public firstname = ''
    public lastname = ''
    public email = ''

    userID: number;


    public signupForm !: FormGroup;
  constructor(
    private formBuilder : FormBuilder,
    //new code
    private http : HttpClient, 
    private router:Router,
    private userIDService: UserIdService, 
    ) { }

    updateUserData() {
      const headers = {
        'Content-Type': 'application/json'
      };
      if (this.username != ''){
        const body = {username: this.username}
        this.http.put('http://127.0.0.1:8080/api/users/' + this.userID + 'name', body, {headers}).subscribe
        (response=> {
          console.log("Updated username to: " + this.username);
        },
        error=> {
          console.log(error);
        }
        );
      }
      if (this.password != ''){
        const body = {pass: this.password}
        this.http.put('http://127.0.0.1:8080/api/users/' + this.userID + 'pass', body, {headers}).subscribe
        (response=> {
          console.log("Updated password to: " + this.password);
        },
        error=> {
          console.log(error);
        }
        );
      }
      if (this.firstname != ''){
        const body = {firstname: this.firstname}
        this.http.put('http://127.0.0.1:8080/api/users/' + this.userID + 'first', body, {headers}).subscribe
        (response=> {
          console.log("Updated firstname to: " + this.firstname);
        },
        error=> {
          console.log(error);
        }
        );
      }
      if (this.lastname != ''){
        const body = {lastname: this.lastname}
        this.http.put('http://127.0.0.1:8080/api/users/' + this.userID + 'last', body, {headers}).subscribe
        (response=> {
          console.log("Updated lastname to: " + this.lastname);
        },
        error=> {
          console.log(error);
        }
        );
      }
      if (this.email != ''){
        const body = {email: this.email}
        this.http.put('http://127.0.0.1:8080/api/users/' + this.userID + 'email', body, {headers}).subscribe
        (response=> {
          console.log("Updated email to: " + this.email);
        },
        error=> {
          console.log(error);
        }
        );
      }

      //   const body = {username: this.username, password: this.password, firstname: this.firstname, lastname: this.lastname, email: this.email, favoriteAnimal: this.favoriteAnimal} ;
      //   const headers = {
      //     'Content-Type': 'application/json'
      //   };


    
      //   this.http.post('http://127.0.0.1:8080/api/signUp', body, {headers}).subscribe
      //     (response => {
      //       // If the login is successful, redirect the user to the dashboard page
      //       this.router.navigate(['/main']);
      //       //document.write("Welcome to the Web Page!");
      //     },
      //     error => {
      //       // If the login is unsuccessful, display an error message
      //       console.log(error);
    
      //     }
      //   );

      //   this.getUserInfo(this.userID).subscribe(user => {
      //     console.log(user.userName);
      //     console.log(user.passWord);
      //     console.log(user.favAnimal);
      //     console.log(user.firstName);
      //     console.log(user.lastName);
      //     console.log(user.email);

      //   });

      }

  //   ngOnInit(): void {
  //   this.signupForm = this.formBuilder.group({
  //     username:[''],
  //     password:[''],
  //     firstname:[''],
  //     lastname:[''],
  //     email:[''],
  //     favoriteAnimal:['']

  //   })
  // }


  ngOnInit(): void {
    this.userID = this.userIDService.getUserId();
    console.log('User ID ohmygoditworked: ', this.userID);


    this.getUserInfo(this.userID).pipe(
      take(1) // take only the first value emitted by the observable
    ).subscribe(user => {
      this.username = '';
      this.password = '';
      this.favoriteAnimal = '';
      this.firstname = '';
      this.lastname = '';
      this.email = '';

      
    });


  }

  // getUserInfo(ID: number): Observable<number> {
  //   const url = 'http://127.0.0.1:8080/api/users/' + ID
  //   return this.http.get<number>(url);
  // }

    getUserInfo(ID: number): Observable<User> {
      const url = 'http://127.0.0.1:8080/api/users/' + ID
      return this.http.get<User>(url, {responseType: 'json'});

    }


}
