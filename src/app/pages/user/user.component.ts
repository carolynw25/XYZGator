import { HttpClient } from '@angular/common/http';
import { Component, OnInit , ChangeDetectionStrategy} from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from "@angular/forms"
import { Router } from '@angular/router';

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
            this.router.navigate(['/main']);
            //document.write("Welcome to the Web Page!");
          },
          error => {
            // If the login is unsuccessful, display an error message
            console.log(error);
    
          }
        );
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
