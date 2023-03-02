# Detailed work completed in Sprint 2
## FrontEnd
- We have completed a working sign-in page, complete with integration to the backend that checks if the user is valid or not.
- Our sign-in page, sign-up/registration page, and dashboard of our site are all connected.
- We have a shell of a sign-up/registration page that is linked to the sign-in page and stores user data, but still have to connect it with the database.
- We also have an almost-finished About page that will be updated as more ideas come up.
- Our navigation from the sign-in, log-out, and registration page are all linked to a dropdown menu in the dashboard
- We also have 14 unit tests and a cypress test detailed below


### Cypress test
This test checks to see if the link for “New user? Click to signup!!” goes to the correct link to register.
```
describe('home page', () => {
 it('clicking "New user? Click to signup!!" navigates to a new url of the signup page', () => {
   cy.visit('http://localhost:4200')
   cy.contains('New user? Click to signup!!').click()
   cy.url().should('include', '/signup')
 })
})
```

### Unit Tests
These are the unit tests for the login component, the signup component, the navigation bar, and the app module.

These are the unit tests for the login component: These includes tests for if the username and password are empty strings to begin with and if the username and password are updated correctly when user input is. 
```
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('LoginComponent', () => {
 let component: LoginComponent;
 let fixture: ComponentFixture<LoginComponent>;


 beforeEach(async () => {
   await TestBed.configureTestingModule({
     declarations: [ LoginComponent ],
     imports: [ ReactiveFormsModule, HttpClientModule, FormsModule ]
   })
   .compileComponents();


   fixture = TestBed.createComponent(LoginComponent);
   component = fixture.componentInstance;
   fixture.detectChanges();
 });

 //checks if the SignupComponent instance is created successfully
 //using the expect function. If the component is created successfully,
 //the toBeTruthy matcher returns true, indicating that the component
 //is truthy and exists.
 it('should create', () => {
   expect(component).toBeTruthy();
 });

 //tests whether the username and password properties of the component
 // are empty strings on initialization.
 it('should have an empty username and password on initialization', () => {
   expect(component.username).toEqual('');
   expect(component.password).toEqual('');
 });

 //tests whether the username and password properties of the component are
 //updated correctly when the input fields change.
 it('should update the username and password properties when the input fields change', () => {
   const inputUsername = fixture.nativeElement.querySelector('#exampleInputEmail1');
   const inputPassword = fixture.nativeElement.querySelector('#exampleInputPassword1');

   inputUsername.value = 'testuser';
   inputUsername.dispatchEvent(new Event('input'));

   inputPassword.value = 'testpassword';
   inputPassword.dispatchEvent(new Event('input'));

   expect(component.username).toEqual('testuser');
   expect(component.password).toEqual('testpassword');
 });

 /*
 How the above code works: select input fields for username and password using querySelector method
 and stored in inputUsername and inputPassword variables. Then, it simulates the user input by
 setting the value property of the input fields to 'testuser' and 'testpassword'. Then puts
 an input event on each input field using dispatchEvent method. This simulates user typing in the
 input fields thus trigger input events. Then, it checks that the username and password properties
 of the component have been updated to 'testuser' and 'testpassword', using expect method.
 If the components U and P are not updated as expected, the test will fail.
 */
});
```


These are the unit tests for the sign-up component: These tests include checking if the addUser function successfully saves and logs a user and if the input fields are cleared after the user is added.
```
import { ComponentFixture, TestBed } from '@angular/core/testing';


import { SignupComponent } from './signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


describe('SignupComponent', () => {
 let component: SignupComponent;
 let fixture: ComponentFixture<SignupComponent>;


 beforeEach(async () => {
   await TestBed.configureTestingModule({
     declarations: [ SignupComponent ],
     imports: [ FormsModule, ReactiveFormsModule ]
   })
   .compileComponents();


   fixture = TestBed.createComponent(SignupComponent);
   component = fixture.componentInstance;
   fixture.detectChanges();
 });


 it('should create', () => {
   expect(component).toBeTruthy();
 });


 //Test case to check if addUser() function adds a new user to the user list
 it('should add a new user to the user list when addUser() is called', () => {
   const initialUserCount = component.userInfo.length;
   component.username = 'tUser';
   component.password = 'tPass';
   component.firstname = 'Huey';
   component.lastname = 'Magooey';
   component.email = 'HuMagoo@gmail.com';
   component.addUser();
   const newUserCount = component.userInfo.length;
   expect(newUserCount).toEqual(initialUserCount + 1);
   expect(component.userInfo[newUserCount - 1]).toEqual({
     username: 'tUser',
     password: 'tPass',
     firstname: 'Huey',
     lastname: 'Magooey',
     email: 'HuMagoo@gmail.com'
   });
 });


 //Test case to check if the input fields are cleared after addUser() is called
 it('should clear the input fields after addUser() is called', () => {
   component.username = 'tUser';
   component.password = 'tPass';
   component.firstname = 'Huey';
   component.lastname = 'Magooey';
   component.email = 'HuMagoo@gmail.com';
   component.addUser();
   expect(component.username).toEqual('');
   expect(component.password).toEqual('');
   expect(component.firstname).toEqual('');
   expect(component.lastname).toEqual('');
   expect(component.email).toEqual('');
 });


 });
```







## BackEnd


# BackEnd Documentation for REST API using Gorilla Mux Router and GORM
 This REST API uses the Gorilla Mux Router and GORM as a backend database driver.

## Prerequisites

+ Gorilla Mux Router

+ GORM package

+ Go programming language

## Table of contents

+ initializeRouter()
+ main()
+ InitialMigration()
+ GetUser()
+ UpdateUser()
+ DeleteUser()
+ login()
+ signUp()
<a name="initializeRouter"></a>

## initializeRouter()

The initializeRouter() function creates a router using the Gorilla Mux package. The API endpoints are then defined using the r.HandleFunc() function. Finally, CORS middleware is added to the router using the cors.New() and c.Handler() functions. The server is then launched using the http.ListenAndServe() function.

```
go
func initializeRouter() {
	r := mux.NewRouter() //creates the router

	//user methods
	r.HandleFunc("/api/users", GetUsers).Methods("GET")
	r.HandleFunc("/api/users/{id}", GetUser).Methods("GET")
	r.HandleFunc("/api/users/{id}", UpdateUser).Methods("PUT")
	r.HandleFunc("/api/users/{id}", DeleteUser).Methods("DELETE")
	r.HandleFunc("/api/login", login).Methods("POST")
	r.HandleFunc("/api/signUp", signUp).Methods("POST")

	//adds CORS middleware
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
	})
	handler := c.Handler(r)

	//launch server
	log.Fatal(http.ListenAndServe("localhost:8080", handler))
}
```
<a name="main"></a>

## main()
The main() function is the entry point of the program. It calls the InitialMigration() and initializeRouter() functions.
```
go
Copy code
func main() {
	InitialMigration()
	initializeRouter()
}
```
<a name="InitialMigration"></a>

## InitialMigration()
The InitialMigration() function initializes a connection to the database and runs the migrations. It uses the GORM package to connect to the database using the gorm.Open() function. It then runs the migrations using the DB.AutoMigrate() function.
```
go
func InitialMigration() {
	DB, err = gorm.Open(mysql.Open(DNS), &gorm.Config{})
	if err != nil {
		fmt.Println(err.Error())
		panic("Cannot connect to DB")
	}
	DB.AutoMigrate(&User{})
}
```
<a name="GetUser"></a>

## GetUser()
The GetUser() function retrieves a user from the database by their ID using the mux.Vars() function to get the ID from the request parameters and the DB.First() function to query the database. It then returns the user as a JSON-encoded response using the json.NewEncoder() function.
```
go
func GetUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	var user User
	DB.First(&user, params["id"])
	json.NewEncoder(w).Encode(user)

}
```

<a name="UpdateUser"></a>

## UpdateUser()
UpdateUser() is a handler function for updating a user's information. It accepts an HTTP request with a user ID parameter and the updated user information in the request body, updates the user in the database, and returns the updated user information as a JSON response.
```
go
func UpdateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	var user User
	DB.First(&user, params["id"])
	json.NewDecoder(r.Body).Decode(&user)
	DB.Save(&user)
	json.NewEncoder(w).Encode(user)
}
```
<a name="DeleteUser"></a>
## DeleteUser()
DeleteUser() is a handler function for deleting a user's information. It accepts an HTTP request with a user ID parameter, deletes the user from the database, and returns a success message as a JSON response.
```
go 
func DeleteUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	var user User
	DB.Delete(&user, params["id"])
	json.NewEncoder(w).Encode("The user has been deleted successfully")
}
```
<a name="login()"><\a>
## login()
login() is a handler function for authenticating a user. It accepts an HTTP request with a user's login credentials in the request body, queries the database for the user with the given username and password, and returns a success message as a JSON response if the user exists in the database.
```
go
func login(w http.ResponseWriter, r *http.Request) {
	//Parse the login credentials from the request body
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Error parsing request body", http.StatusBadRequest)
		return
	}

	//Query the database for the user with the given username and password
	var dbUser User
	result := DB.Where("user_name = ? AND password = ?", user.UserName, user.Password).First(&dbUser)
	if result.Error != nil {
		http.Error(w, "Invalid username or password", http.StatusUnauthorized)
		return
	}

	//If the query was successful, return the user ID to the frontend
	response := "Login Successful"
	json.NewEncoder(w).Encode(response)
}
```
<a name="signUp()"><\a>
signUp() is a handler function for registering a new user. It accepts an HTTP request with a user's registration credentials in the request body, queries the database for an existing user with the same username or email, creates a new user if no user is found, and returns a success message as a JSON response.
```
go
func signUp(w http.ResponseWriter, r *http.Request) {
	// Parse the sign-up credentials from the request body
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Error parsing request body", http.StatusBadRequest)
		return
	}

	// Query the database for an existing user with the same username or email
	var dbUser User
	result := DB.Where("user_name = ? OR email = ?", user.UserName, user.Email).First(&dbUser)
	if result.RowsAffected > 0 {
		http.Error(w, "User Name or email already taken", http.StatusConflict)
		return
	}

	// If no user is found, create a new user with the passed-in credentials
	newUser := User{
		UserName:  user.UserName,
		Password:  user.Password,
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Email:     user.Email,
	}
	DB.Create(&newUser)

	// Return the new user's ID to the frontend
	response := "Sign-up Successful"
	json.NewEncoder(w).Encode(response)
}
```
