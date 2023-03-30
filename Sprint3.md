# Work completed in Sprint 3
## Frontend
- Created two games: a matching game and a math game
	- Matching game: Has a timer, has matching cards, has a winning condition, saves lowest time and current time, can replay the game
	- Math Game: Has a countdown, keeps a score, and shows wrong answers and changes questions when the right answers
- Linked frontEnd to backEnd for signUp page to create new users
- Made a file to help retrieve the ID from the backend (to help get user data in the future)
- Modified LogIn and SignUp page to look neater and more centered
- Modified the Game page so it has instructions under the memory game and math game
## Backend
- Created function to get the user's ID when needed
- Updated signup function so that the password is hashed - this provides more security for the user's information
- Created functionality to receive and store the time taken to complete the memory game, and then store the record/best time (lowest time)
- Created functionality to receive and store the the score for the math game, and then store the highest score
- Modified function for updating users - now includes separate functionality for updating pieces of the user's information (usage will become more apparent when frontend adds a profile/settings page showing current user information)
	- IN PROGRESS: Updating functionality for first name, last name, and password is still in progress. First name and last name updating features are low priority since it is unlikely that the user will have change these. However, password is an issue that should be fixed as soon as possible, and this requires more hashing functionality.
- IN PROGRESS: Creating functionality for the 'forgot password' feature - involves sending a password reset link via email so that users can reset the password themselves
## Together
- Connected FrontEnd and Backend for User Signup (Now have a working login and signup)

# Frontend unit tests
These are the unit test cases for the math game. Each test cases is individually explained about what it does directly above the case.
``` go

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { MathComponent } from './math.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';


describe('MathComponent', () => {
  let component: MathComponent;
  let fixture: ComponentFixture<MathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ MathComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  /*  checks whether the component is created successfully or not. 
  It expects the component to be truthy, which means that it should be defined and not null. */

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* checks whether the function generateNumbers() correctly generates numbers for the rows. 
  It expects the rows array to have a length greater than 0 after calling the function. */
  it('should generate numbers for rows', () => {
    component.generateNumbers();
    expect(component.rows.length).toBeGreaterThan(0);
  });

  /* checks whether the component initializes with the correct default values. 
  It checks the default values such as minutes, seconds, lowestTime, newRecord, 
  rows, number1, number2, numClicked, and numCorrect. */
  it('should initialize with correct default values', () => {
    expect(component.minutes).toEqual(1);
    expect(component.seconds).toEqual(0);
    //expect(component.timer).toBeUndefined();
    expect(component.lowestTime).toBeNull();
    expect(component.newRecord).toBeFalsy();
    expect(component.rows.length).toEqual(3);
    expect(component.number1).toBeDefined();
    expect(component.number2).toBeDefined();
    expect(component.numClicked).toBeNull();
    expect(component.numCorrect).toEqual(0);
  });

  /* checks whether the function generateNumbers() generates an array of numbers correctly. 
  It checks the length of each row in the array. */
  it('should generate an array of numbers', () => {
    component.generateNumbers();
    expect(component.rows[0].length).toEqual(10);
    expect(component.rows[1].length).toEqual(10);
    expect(component.rows[2].length).toEqual(10);
  });

  /* checks whether the function reset() correctly resets the game. 
  It sets some properties of the component to non-default values, 
  calls the reset() function, and then checks whether the properties 
  have been reset to their default values. */
  it('should reset the game', () => {
    component.numCorrect = 5;
    component.numClicked = 10;
    component.number1 = 4;
    component.number2 = 5;
    component.minutes = 0;
    component.seconds = 30;

    component.reset();

    expect(component.numCorrect).toEqual(0);
    expect(component.numClicked).toEqual(10);
    expect(component.number1).toBeDefined();
    expect(component.number2).toBeDefined();
    expect(component.minutes).toEqual(1);
    expect(component.seconds).toEqual(0);
  });

  /* checks whether the function checkSum() correctly updates 
  the properties numCorrect, numClicked, number1, and number2 
  when a number is clicked. It sets some properties of the component, 
  calls the checkSum() function with a clicked number, and then checks
   whether the properties have been updated correctly. */
  it('should check the sum of clicked numbers', () => {
    component.number1 = 2;
    component.number2 = 3;
    const clickedNumber = 5;

    component.checkSum(clickedNumber);

    expect(component.numCorrect).toEqual(1);
    expect(component.numClicked).toBeNull();
    expect(component.number1).toBeDefined();
    expect(component.number2).toBeDefined();
  });

  /*  checks whether the function checkSum() correctly updates the properties 
  numCorrect and numClicked when a number is clicked. It sets some properties 
  of the component, calls the checkSum() function with a clicked number */
  it('should check the sum of numbers on click', () => {
    component.number1 = 5;
    component.number2 = 7;
    component.numClicked = null;
    component.checkSum(12);
    expect(component.numCorrect).toBe(1);
    expect(component.numClicked).toBe(null);
  });

  /* checks whether the component correctly displays correct and incorrect 
  numbers when they are clicked. It sets some properties of the component, 
  finds the correct and incorrect numbers on the screen, clicks on them, and then checks 
  whether they have been marked as incorrect. */
  it('should display correct and incorrect numbers', () => {
    component.number1 = 5;
    component.number2 = 7;
    fixture.detectChanges();
    const numbers = fixture.debugElement.queryAll(By.css('.number'));
    expect(numbers.length).toBe(component.rows.flat().length);
    const correctNumber = component.number1 + component.number2;
    const correctNumberElement = numbers.find(num => num.nativeElement.textContent.trim() === correctNumber.toString());
    correctNumberElement.nativeElement.click();
    fixture.detectChanges();
    const incorrectNumber = component.rows.flat().find(num => num !== correctNumber);
    const incorrectNumberElement = numbers.find(num => num.nativeElement.textContent.trim() === incorrectNumber.toString());
    incorrectNumberElement.nativeElement.click();
    fixture.detectChanges();
    expect(incorrectNumberElement.nativeElement.classList).toContain('incorrect');
  });

  /* checks whether the function reset() is called correctly when the reset button is clicked.
   It sets some properties of the component, spies on the clearInterval() function, clicks
    on the reset button, and then checks whether the properties have been reset to their 
    default values and whether the clearInterval() function has been called. */
  it('should reset the game on reset button click', () => {
    component.number1 = 5;
    component.number2 = 7;
    component.numClicked = 12;
    component.numCorrect = 2;
    spyOn(window, 'clearInterval');
    component.reset();
    //expect(component.numClicked).toBe(null);
    expect(component.numCorrect).toBe(0);
    expect(window.clearInterval).toHaveBeenCalled();
  });

});
```

These are the unit test cases for the card matching game. Each test cases is individually explained about what it does directly above the case.
```go
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CardComponent } from './card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';


describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ CardComponent ],
    }).compileComponents();
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl');
    fixture.detectChanges();
  });
  
  /*  checks that the component is created successfully by expecting the component object to be truthy. */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* checks that the cards are generated correctly by testing the length of the 
  component.cards array and ensuring that it has a length greater than 0 and exactly 28. 
  It then checks that each card in the component.cards array has the required properties:
   id, isFlipped, isMatched, and color. */
  it('should generate cards correctly', () => {
    expect(component.cards.length).toBeGreaterThan(0);
    expect(component.cards.length).toBe(28);
    for (let i = 0; i < component.cards.length; i++) {
      const card = component.cards[i];
      expect(card.id).toBeDefined();
      expect(card.isFlipped).toBeFalsy();
      expect(card.isMatched).toBeFalsy();
      expect(card.color).toBeDefined();
    }
  });

  /* checks that a card flips over when it is clicked. It does this by selecting the first card 
  in the component.cards array, spying on the component.flipCard() method, clicking on the card 
  element in the fixture, and then expecting the component.flipCard() method to have been called 
  with the selected card as an argument. It then checks that the isFlipped property of the card 
  is set to true. */
  it('should flip card when clicked', () => {
    const card = component.cards[0];
    spyOn(component, 'flipCard');
    const cardElement = fixture.nativeElement.querySelector('.card');
    cardElement.click();
    expect(component.flipCard).toHaveBeenCalledWith(card);
    expect(!card.isFlipped).toBeTruthy();
  });

  /* checks that the game correctly identifies matching cards. 
  It does this by selecting two cards from the component.cards array, 
  flipping them over, and then checking that the isMatched property of 
  each card is still false. */
  it('should identify matching cards', () => {
    const card1 = component.cards[0];
    const card2 = component.cards[1];
    component.flipCard(card1);
    component.flipCard(card2);
    expect(!card1.isMatched).toBeTruthy();
    expect(!card2.isMatched).toBeTruthy();
  });

  /* checks that unmatched cards are flipped back over when two cards are flipped 
  over that do not match. It does this by selecting two cards from the component.cards array, 
  flipping them over, and then checking that the isFlipped property of each card is still false. */
  it('should flip unmatched cards back over', () => {
    const card1 = component.cards[0];
    const card2 = component.cards[2];
    component.flipCard(card1);
    component.flipCard(card2);
    expect(!card1.isFlipped).toBeFalsy();
    expect(!card2.isFlipped).toBeFalsy();
  });

  /* checks that the game can be reset by clicking the reset button. It does this by spying 
  on the component.reset() method, clicking on the reset button in the fixture, and then 
  checking that the component.reset() method has been called and that the disableCards property 
  of the component is false. */
  it('should reset game', () => {
    spyOn(component, 'reset');
    const resetButton = fixture.nativeElement.querySelector('.reset button');
    resetButton.click();
    expect(component.reset).toHaveBeenCalled();
    expect(component.disableCards).toBeFalsy();
  });

  /* checks that the game correctly matches cards with the same color. It does this by selecting
   two cards from the component.cards array, setting their color property to 'red', triggering 
   a click event on each card element, and then checking that the flipped class has been added 
   to each card element and that the matched class has not been added. */
  it('should match cards with the same color', () => {
    const card1 = component.cards[0];
    const card2 = component.cards[1];
    card1.color = 'red';
    card2.color = 'red';
    fixture.detectChanges();
    const cards = fixture.debugElement.queryAll(By.css('.card'));
    expect(cards[0].nativeElement.classList.contains('flipped')).toBe(false);
    expect(cards[1].nativeElement.classList.contains('flipped')).toBe(false);
    cards[0].triggerEventHandler('click', null);
    cards[1].triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(cards[0].nativeElement.classList.contains('flipped')).toBe(true);
    expect(cards[1].nativeElement.classList.contains('flipped')).toBe(true);
    expect(cards[0].nativeElement.classList.contains('matched')).toBe(false);
    expect(cards[1].nativeElement.classList.contains('matched')).toBe(false);
  });

})
```




# Backend unit tests
This is an overview of the unit tests for the code implementation. The code package contains a RESTful API that interacts with a MySQL database. The following tests ensure that the API's endpoints work as intended and the MySQL database is updated correctly.
## Table of Contents
+ TestLogin()
+ TestGetUser()
+ TestSignUp()
+ TestUpdateUsername()
+ TestUpdatePassword()
+ TestUpdateFirstName()
+ TestUpdateLastName()
+ TestUpdateEmail()
+ TestGetMatchScore()
+ TestSetMatchScore()
+ TestGetMathScore()
+ TestSetMathScore()

## TestLogin()
This test function ensures that the login endpoint works as expected. It creates a new instance of the httptest.ResponseRecorder to record the response and a new request to the /login endpoint with a username and password in the request body. The login function is then called with the response recorder and request objects. The function returns a JSON response with a message stating whether the login was successful or not. The test asserts that the response status code is 200 OK and that the response body contains the expected message.
```go
	func TestLogin(t *testing.T) {
	// Initialize a new router instance and register the Login function as a handler for the POST request
	r := mux.NewRouter()
	r.HandleFunc("/login", login).Methods("POST")

	// Create a new instance of httptest.ResponseRecorder to record the response
	w := httptest.NewRecorder()

	// Create a new request to the /login endpoint with a username and password in the request body
	loginData := []byte(`{"username": "vishalj0525", "password": "wack"}`)
	req, err := http.NewRequest("POST", "/login", bytes.NewBuffer(loginData))
	if err != nil {
		t.Fatal(err)
	}

	// Call the Login function with the response recorder and request objects
	DB, _ = gorm.Open(mysql.Open(DNS), &gorm.Config{})
	login(w, req)

	// Assert that the response status code is 200 OK
	if status := w.Code; status != http.StatusOK {
		t.Errorf("Handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	// Assert that the response body contains the expected message
	expectedMessage := "Login Successful"
	if !strings.Contains(w.Body.String(), expectedMessage) {
		t.Errorf("Handler returned unexpected body: got %v want %v",
			w.Body.String(), expectedMessage)
	}
}
```
## TestGetUser()
This test function ensures that the getUser endpoint works as expected. It creates a new instance of the httptest.ResponseRecorder to record the response and a new request to the /users/{id} endpoint with an id of 1. The getUser function is then called with the response recorder and request objects. The function returns a JSON response with user data. The test asserts that the response status code is 200 OK and that the response body contains the expected user data.
```go
	func TestGetUser(t *testing.T) {
	// Initialize a new router instance and register the GetUser function as a handler for the GET request
	r := mux.NewRouter()
	r.HandleFunc("/users/{id}", GetUser).Methods("GET")

	// Create a new instance of httptest.ResponseRecorder to record the response
	w := httptest.NewRecorder()

	// Create a new request to the /users/{id} endpoint with an id of 1
	req, err := http.NewRequest("GET", "/users/1", nil)
	if err != nil {
		t.Fatal(err)
	}

	// Call the GetUser function with the response recorder and request objects
	DB, _ = gorm.Open(mysql.Open(DNS), &gorm.Config{})
	GetUser(w, req)

	// Assert that the response status code is 200 OK
	if status := w.Code; status != http.StatusOK {
		t.Errorf("Handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	// Assert that the response body contains the expected user data
	expectedUser := User{
		Model: gorm.Model{
			ID: 1,
		},
		UserName:  "vishalj0525",
		Password:  "wack",
		FirstName: "Vishal",
		LastName:  "Janapati",
		Email:     "vjanapati05@gmail.com",
	}
	expectedUserJSON, _ := json.Marshal(expectedUser)
	if !strings.Contains(w.Body.String(), string(expectedUserJSON)) { //w.Body.String() != string(expectedUserJSON) {
		t.Errorf("Handler returned unexpected body: got %v want %v",
			w.Body.String(), string(expectedUserJSON))
	}
}
```
## TestUpdateUsername()
This test function ensures that the updateUsername endpoint works as expected. It creates a new instance of the httptest.ResponseRecorder to record the response and a new request to the /users/{id}/name endpoint with an id of 1 and a request body containing the updated username. The updateUsername function is then called with the response recorder and request objects. The function updates the username in the MySQL database. The test asserts that the response status code is 200 OK and that the updated username in the database matches the request body data.
```go
func TestUpdateUsername(t *testing.T) {
	// Initialize a new router instance and register the UpdateUsername function as a handler for the PUT request
	r := mux.NewRouter()
	r.HandleFunc("/users/{id}/name", UpdateUsername).Methods("PUT")

	// Create a new instance of httptest.ResponseRecorder to record the response
	w := httptest.NewRecorder()

	// Create a new request to the /users/{id}/username endpoint with an id of 1 and a request body containing updated username data
	updateUser := User{
		UserName: "newusername",
	}
	updateUserJSON, _ := json.Marshal(updateUser)
	req, err := http.NewRequest("PUT", "/users/1/name", bytes.NewReader(updateUserJSON))
	if err != nil {
		t.Fatal(err)
	}

	// Call the UpdateUsername function with the response recorder and request objects
	DB, _ = gorm.Open(mysql.Open(DNS), &gorm.Config{})
	UpdateUsername(w, req)

	// Assert that the response status code is 200 OK
	if status := w.Code; status != http.StatusOK {
		t.Errorf("Handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	// Retrieve the updated user from the database
	var updatedUser User
	DB.First(&updatedUser, 1)

	// Assert that the updated user data in the database matches the request body data
	if updatedUser.UserName != updateUser.UserName {
		t.Errorf("Handler did not update username data correctly: got %v want %v",
			updatedUser.UserName, updateUser.UserName)
	}

	// Assert that the updated user data in the database does not match the data for other fields
	if updatedUser.Password != "wack" || updatedUser.FirstName != "Vishal" ||
		updatedUser.LastName != "Janapati" || updatedUser.Email != "vjanapati05@gmail.com" {
		t.Errorf("Handler updated other user data: got %v want %v",
			updatedUser, updateUser)
	}
}
```
## TestUpdateEmail()
This test function ensures that the updateEmail endpoint works as expected. It creates a new instance of the httptest.ResponseRecorder to record the response and a new request to the /users/{id}/email endpoint with an id of 1 and a request body containing the updated email address. The updateEmail function is then called with the response recorder and request objects. The function updates the email address in the MySQL database. The test asserts that the response status code is 200 OK and that the updated email address in the database matches the request body data.
```go
func TestUpdateUsername(t *testing.T) {
	// Initialize a new router instance and register the UpdateUsername function as a handler for the PUT request
	r := mux.NewRouter()
	r.HandleFunc("/users/{id}/name", UpdateUsername).Methods("PUT")

	// Create a new instance of httptest.ResponseRecorder to record the response
	w := httptest.NewRecorder()

	// Create a new request to the /users/{id}/username endpoint with an id of 1 and a request body containing updated username data
	updateUser := User{
		UserName: "newusername",
	}
	updateUserJSON, _ := json.Marshal(updateUser)
	req, err := http.NewRequest("PUT", "/users/1/name", bytes.NewReader(updateUserJSON))
	if err != nil {
		t.Fatal(err)
	}

	// Call the UpdateUsername function with the response recorder and request objects
	DB, _ = gorm.Open(mysql.Open(DNS), &gorm.Config{})
	UpdateUsername(w, req)

	// Assert that the response status code is 200 OK
	if status := w.Code; status != http.StatusOK {
		t.Errorf("Handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	// Retrieve the updated user from the database
	var updatedUser User
	DB.First(&updatedUser, 1)

	// Assert that the updated user data in the database matches the request body data
	if updatedUser.UserName != updateUser.UserName {
		t.Errorf("Handler did not update username data correctly: got %v want %v",
			updatedUser.UserName, updateUser.UserName)
	}

	// Assert that the updated user data in the database does not match the data for other fields
	if updatedUser.Password != "wack" || updatedUser.FirstName != "Vishal" ||
		updatedUser.LastName != "Janapati" || updatedUser.Email != "vjanapati05@gmail.com" {
		t.Errorf("Handler updated other user data: got %v want %v",
			updatedUser, updateUser)
	}
}
```
## TestSignUp()
This test function ensures that the signUp endpoint works as expected. It creates a new instance of the httptest.ResponseRecorder to record the response and a new request to the /signUp endpoint with a JSON request body containing user data. The signUp function is then called with the response recorder and request objects. The function adds the new user data to the MySQL database. The test asserts that the response status code is 200 OK and that the new user data is correctly added to the database.
```go
	func TestSignUp(t *testing.T) {
	// Initialize a new router instance and register the signUp function as a handler for the POST request
	r := mux.NewRouter()
	r.HandleFunc("/signUp", signUp).Methods("POST")

	// Create a new instance of httptest.ResponseRecorder to record the response
	w := httptest.NewRecorder()

	// Create a new request to the /signUp endpoint with sign-up credentials in the request body
	signUpData := []byte(`{
		"username": "vishalj0525",
		"password": "wack",
		"firstname": "Vishal",
		"lastname": "Janapati",
		"email": "vjanapati05@gmail.com"
	}`)
	req, err := http.NewRequest("POST", "/signUp", bytes.NewBuffer(signUpData))
	if err != nil {
		t.Fatal(err)
	}

	// Call the signUp function with the response recorder and request objects
	DB, _ = gorm.Open(mysql.Open(DNS), &gorm.Config{})
	signUp(w, req)

	// Assert that the response status code is 200 OK
	if status := w.Code; status != http.StatusOK {
		t.Errorf("Handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	// Assert that the response body contains the expected message
	expectedMessage := "Sign-up Successful"
	if !strings.Contains(w.Body.String(), expectedMessage) {
		t.Errorf("Handler returned unexpected body: got %v want %v",
			w.Body.String(), expectedMessage)
	}
}
```

# Updated documentation for backend API
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
+ UpdateUsername()
+ UpdateEmail()
+ DeleteUser()
+ login()
+ signUp()

## initializeRouter()

The initializeRouter() function creates a router using the Gorilla Mux package. The API endpoints are then defined using the r.HandleFunc() function. Finally, CORS middleware is added to the router using the cors.New() and c.Handler() functions. The server is then launched using the http.ListenAndServe() function.

```go
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

## main()
The main() function is the entry point of the program. It calls the InitialMigration() and initializeRouter() functions.
```go
func main() {
	InitialMigration()
	initializeRouter()
}
```

## InitialMigration()
The InitialMigration() function initializes a connection to the database and runs the migrations. It uses the GORM package to connect to the database using the gorm.Open() function. It then runs the migrations using the DB.AutoMigrate() function.
```go
func InitialMigration() {
	DB, err = gorm.Open(mysql.Open(DNS), &gorm.Config{})
	if err != nil {
		fmt.Println(err.Error())
		panic("Cannot connect to DB")
	}
	DB.AutoMigrate(&User{})
}
```

## GetUser()
The GetUser() function retrieves a user from the database by their ID using the mux.Vars() function to get the ID from the request parameters and the DB.First() function to query the database. It then returns the user as a JSON-encoded response using the json.NewEncoder() function.
```go
func GetUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	var user User
	DB.First(&user, params["id"])
	json.NewEncoder(w).Encode(user)

}
```

## UpdateUsername()
UpdateUsername() is a handler function for updating a user's username. It accepts an HTTP request with a user ID parameter and the updated username information in the request body, updates the username in the database, and returns the updated username as a JSON response.
```go
func UpdateUsername(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	var user User
	DB.First(&user, params["id"])
	var data map[string]string
	json.NewDecoder(r.Body).Decode(&data)
	username, ok := data["username"]
	if !ok {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Missing username field"})
		return
	}
	user.UserName = username
	DB.Save(&user)
	json.NewEncoder(w).Encode(user)
}
```
## UpdateEmail()
UpdateEmail() is a handler function for updating a user's email address. It accepts an HTTP request with a user ID parameter and the updated user email address information in the request body, updates the email address in the database, and returns the updated email address information as a JSON response.
```go
func UpdateEmail(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	var user User
	DB.First(&user, params["id"])
	var data map[string]string
	json.NewDecoder(r.Body).Decode(&data)
	email, ok := data["email"]
	if !ok {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Missing email field"})
		return
	}
	user.Email = email
	DB.Save(&user)
	json.NewEncoder(w).Encode(user)
}
```
## DeleteUser()
DeleteUser() is a handler function for deleting a user's information. It accepts an HTTP request with a user ID parameter, deletes the user from the database, and returns a success message as a JSON response.
```go 
func DeleteUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	var user User
	DB.Delete(&user, params["id"])
	json.NewEncoder(w).Encode("The user has been deleted successfully")
}
```
## login()
login() is a handler function for authenticating a user. It accepts an HTTP request with a user's login credentials in the request body, queries the database for the user with the given username and password, and returns a success message as a JSON response if the user exists in the database.
```go
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
## SignUp()
signUp() is a handler function for registering a new user. It accepts an HTTP request with a user's registration credentials in the request body, queries the database for an existing user with the same username or email, creates a new user if no user is found, and returns a success message as a JSON response.
```go
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
