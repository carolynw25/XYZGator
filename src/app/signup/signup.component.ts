import { HttpClient } from '@angular/common/http';
import { Component, OnInit , ChangeDetectionStrategy} from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from "@angular/forms"
import { Router } from '@angular/router';


interface IuserInfo{
  username: string
  password: string
  firstname: string
  lastname: string
  email: string
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public username = ''
  public password = ''
  public favoriteAnimal = ''
  public firstname = ''
  public lastname = ''
  public email = ''

  public signupForm !: FormGroup;
  constructor(
    private formBuilder : FormBuilder,
    //new code
    private http : HttpClient, 
    private router:Router
    ) { }

  addUserData() {
    const body = {username: this.username, password: this.password, firstname: this.firstname, lastname: this.lastname, email: this.email, favoriteAnimal: this.favoriteAnimal} ;
    const headers = {
      'Content-Type': 'application/json'
    };

    this.http.post('http://127.0.0.1:8080/api/signUp', body, {headers}).subscribe
      (response => {
        // If the login is successful, redirect the user to the dashboard page
        this.router.navigate(['/login']);
        //document.write("Welcome to the Web Page!");
      },
      error => {
        // If the login is unsuccessful, display an error message
        console.log(error);

      }
    );
  }
  public userInfo: IuserInfo[] = [
    {
       username : 'np',
       password : 'gg',
       firstname : 'dsf',
       lastname : 'df',
       email : 'sdfgsd'
    }
  ]
  //Before connecting with Backend
  addUser(){
    this.userInfo.push({
      username: this.username,
      password: this.password,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email
    })
    this.username = ''
    this.password = ''
    this.firstname = ''
    this.lastname = ''
    this.email = ''

  }
  ngOnInit(): void {
    
    this.signupForm = this.formBuilder.group({
      username:[''],
      password:[''],
      firstname:[''],
      lastname:[''],
      email:[''],
      favoriteAnimal:['']

    })

  }

}
