# Work completed in Sprint 4
## Frontend
- Created two games: a wordsearch and a animal identification game
	- Wordsearch game: Has a timer, a random generation of 5 words, random generation of wordsearch board, saves quickest time to find words, 			highlights letters selected
	- Animal Guess game: Counts number correct, randomly generates a picture and selection of animal names to choose from to identify it, button 			turns green if correct, button turns red if wrong, keeps high score of animals correctly identified in a round.
- Linked frontEnd to backEnd for forget password, getting user scores, and updating user profile data
- Modified About Us page to have more information
- Finalized game page design and game summaries/how-to-play
- Simplified dashboard to look less cluttered and correctly display user scores
- Completely redid the user profile page to accurately display what our site needs. 
## Backend
- 'Forgot password' feature finished and completed, switched to using a security question to allow the user to reset their password
- Fixed functionality to receive and store the time taken to complete the memory game, and then store the record/best time (lowest time)
- Fixed functionality to receive and store the score for the math game, and then store the highest score
- Added functionality to receive and store the score for the word game, and then store the highest score
- Added functionality to receive and store the score for the animal game, and then store the highest score
- Finished implementing functionality to update user information separately (email, username, first name, last name, and password)
## Together
- Connected Frontend and Backend for forget password fuctionality, sending user game scores back and forth and updating personal user data
- Fixed and connected Frontend and Backend for all games and for updating user information

# Frontend unit tests
Picture Game Unit Tests
```
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { PictureGuessComponent } from './picture-guess.component';
import { UserIdService } from 'app/userIdService';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import Swal from 'sweetalert2';


describe('PictureGuessComponent', () => {
  let component: PictureGuessComponent;
  let fixture: ComponentFixture<PictureGuessComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ PictureGuessComponent ],
      providers: [UserIdService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PictureGuessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  /*checks to see if component created successfully*/
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* Checks whether component initialized with correct values verifies that pictures array has at 
  least 1 element, answers array as 47 elements, imageNames array has at least one element, 
  and that score and high score are both initially equal to 0 and that newRecord is set to false to start. */
  it('should initialize correctly', () => {
    expect(component.pictures.length).toBeGreaterThan(0);
    expect(component.answers.length).toEqual(47);
    expect(component.imageNames.length).toBeGreaterThan(0);
    expect(component.score).toEqual(0);
    expect(component.highScore).toEqual(0);
    expect(component.newRecord).toBeFalsy();
  });

  /* Checks whether the pictures are loaded correctly in the component. 
  Verifies that the first element of the pictures array has a URL that contains the string 'assets/img/pictureGame/'*/
  it('should load pictures correctly', () => {
    expect(component.pictures[0].url).toContain('assets/img/pictureGame/');
  });

  /*Checks whether the answer choices are generated correctly in the component. 
  It verifies that the answers array has 47 elements.*/
  it('should generate answer choices correctly', () => {
    expect(component.answers.length).toEqual(47);
  });

  /*Checks whether the next question is selected correctly in the component. 
  It verifies that the selection variable is not changed after calling the nextQuestion() method*/
  it('should select next question correctly', () => {
    const initialSelection = component.selection;
    component.nextQuestion();
    //equal?
    expect(component.selection).toEqual(initialSelection);
  });

  /*Checks whether the game is reset correctly in the component. 
  It verifies that the highScore, score, and newRecord variables are set to their initial 
  values after calling the bigReset() method */
  it('should reset game correctly', () => {
    spyOn(component, 'bigReset');
    spyOn(component, 'reset');
    component.bigReset();
    expect(component.highScore).toEqual(0);
    expect(component.score).toEqual(0);
    expect(component.newRecord).toBeFalsy();
    //expect(component.reset).toHaveBeenCalled();
  });

});
```
User/Profile Page Unit Tests
```
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { UserComponent } from './user.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';


describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      imports: [ FormsModule, ReactiveFormsModule, HttpClientModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test case for checking whether the form fields exist or not.
  it('should have all the form fields', () => {
    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    const inputFields = form.querySelectorAll('input');
    expect(inputFields.length).toBe(5);
  });

  // Test case for checking the functionality of the "Update Profile" button.
  it('should call updateUserData() function when Update Profile button is clicked', () => {
    spyOn(component, 'updateUserData');
    const button = fixture.debugElement.query(By.css('.btn-primary')).nativeElement;
    button.click();
    fixture.detectChanges();
    expect(component.updateUserData).toHaveBeenCalled();
  });

  // Test case for checking whether the form fields are being updated or not.
  it('should update the corresponding variable when the input field is updated', () => {
    const usernameInput = fixture.debugElement.query(By.css('input[type="text"]')).nativeElement;
    usernameInput.value = 'testuser';
    usernameInput.dispatchEvent(new Event('input'));
    expect(component.username).toBe('testuser');
  });


});
```
Dashboard Unit Tests
```
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { HttpClientModule } from '@angular/common/http';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the dashboard component', () => {
    expect(component).toBeTruthy();
  });

  /* checks if title of dashboard correctly set to GatorXYZ*/
  //querySelector methods finds h2 element in template to check content
  it('should have a title with GatorXYZ', () => {
    const title = fixture.nativeElement.querySelector('h2');
    expect(title.textContent).toContain('GatorXYZ');
  });

  /* Checks if there is a line break after title*/
  it('should have a line break after the title', () => {
    const br = fixture.nativeElement.querySelector('br');
    expect(br).toBeTruthy();
  });

  /* Checks if there are two cards in HTML template */
  it('should have two cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.card');
    expect(cards.length).toEqual(2);
  });

  /* This sets lowestTimeMemory to a minute 30 and then checks if memory score is 
  displayed correctly  */
  it('should display the correct memory score', () => {
    component.lowestTimeMemory = { minutes: 1, seconds: 30 };
    fixture.detectChanges();
    const memoryScore = fixture.nativeElement.querySelector('.card-body p.card-category:nth-child(2) + p');
    expect(memoryScore.textContent).toContain('1:30');
  });

  /* This sets lowestTimeMemory property of component to 'null' and checks if memory score is displayed as '-' */
  it('should display "-" if there is no memory score', () => {
    component.lowestTimeMemory = null;
    fixture.detectChanges();
    const memoryScore = fixture.nativeElement.querySelector('.card-body p.card-category:nth-child(2) + p');
    expect(memoryScore.textContent).toContain('-');
  });
});
```
Wordsearch Game Unit Tests
```
import { WordSearchComponent } from './word-search.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('WordSearchComponent', () => {
  let component: WordSearchComponent;
  let fixture: ComponentFixture<WordSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [WordSearchComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    //component = new WordSearchComponent(null, null); // pass null as arguments for userIDService and http
  });



  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the lowest time when available', () => {
    component.lowestTime = { minutes: 1, seconds: 30 };
    fixture.detectChanges();
    const lowestTime = fixture.nativeElement.querySelector('.lowest-time');
    expect(lowestTime.textContent).toContain('1:30');
  });


  it('should limit possible words to 10 letters', () => {
    expect(component.possibleWords.every(word => word.length <= 10)).toBe(true);
  });

  it('should generate a grid with correct dimensions and letters', () => {
    component.words = ['APPLE', 'BANANA', 'CHERRY', 'PEAR', 'WATERMELON'];
    component.generateGrid();
    expect(component.grid.length).toBe(10);
    expect(component.grid.every(row => row.length === 25)).toBe(true);
    const allLetters = component.grid.flat().join('');
    expect(allLetters).toMatch(/^[A-Z]{250}$/); // grid should contain only capital letters
    for (const word of component.words) {
      const found = component.grid.some(row =>
        row.join('').includes(word.charAt(0))
      );
      expect(found).toBe(true); // each word should be present in the grid
    }
  });

  it('should return null when word cannot be placed', () => {
    component.grid = [['A', 'P', 'P', 'L', 'E'], ['B', '', '', '', ''], ['C', '', '', '', ''], ['D', '', '', '', ''], ['E', '', '', '', '']];
    const positions = component.canPlaceWord('BANANA', 0, 0, 1, 1);
    expect(positions).toBe(null); // BANANA overlaps with APPLE
  });

  it('should start the timer', () => {
    component.startTimer();
    expect(component.minutes).toBe(0);
    expect(component.seconds).toBe(0);
    expect(component.timer).toBeTruthy();
  });


  it('should stop the timer', () => {
    component.startTimer();
    component.stopTimer();
    expect(component.minutes).toBe(0);
    expect(component.seconds).toBe(0);
  });


  it('should reset the game', () => {
    component.reset();
    expect(component.highlightedWords.length).toBe(0);
    expect(component.coords.length).toBe(0);
    expect(component.wordsFound).toBe(0);
    expect(component.start).toBeFalsy();
    expect(component.words.length).toBe(5);
    expect(component.grid.length).toBe(10);
    expect(component.grid[0].length).toBe(25);
    expect(component.newRecord).toBeFalsy();
  });


})
```
Forget Password Unit Tests
```
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ForgetPasswordComponent } from './forget-password.component';
import { UserIdService } from 'app/userIdService';

describe('ForgetPasswordComponent', () => {
  let component: ForgetPasswordComponent;
  let fixture: ComponentFixture<ForgetPasswordComponent>;
  let userIdService: UserIdService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgetPasswordComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        UserIdService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userIdService = TestBed.inject(UserIdService);
  });

  //This test verifies that the component is created successfully, which ensures 
  //that its constructor and initialization code are error-free.
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  //This test checks that the component's forgetPasswordForm property is 
  //initialized correctly. Specifically, it ensures that the form has fields for email, security question, and new password.
  it('should initialize the form', () => {
    expect(component.forgetPasswordForm.get('email')).toBeTruthy();
    expect(component.forgetPasswordForm.get('securityQuestion')).toBeTruthy();
    expect(component.forgetPasswordForm.get('newPass')).toBeTruthy();
  });

  //This test checks that the form is reset after it is submitted. 
  //It simulates a form submission event by dispatching a submit event on the form element, 
  //then verifies that the form values are cleared out.
  it('should reset form after submission', () => {
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(component.forgetPasswordForm.value.email).toEqual('');
    expect(component.forgetPasswordForm.value.securityQuestion).toEqual('');
    expect(component.forgetPasswordForm.value.newPass).toEqual('');
  });

});
```
Cypress Game Unit Test
```
describe('memory game', () => {
  it('timer starts with 1:00', () => {
    cy.visit('http://localhost:4200/#/game2')
    cy.get('.timer').contains("1:00")
  })
  it('clicking "Return" button navigates to the game page', () => {
    cy.visit('http://localhost:4200/#/game1')
    cy.contains('Return').click()
    cy.url().should('include', '/notifications')
  })
})
describe('math game', () => {
  it('current score starts with 0', () => {
    cy.visit('http://localhost:4200/#/game2')
    cy.get('.correct-count').contains("0")
  })
  it('clicking "Return" button navigates to the game page', () => {
    cy.visit('http://localhost:4200/#/game2')
    cy.contains('Return').click()
    cy.url().should('include', '/notifications')
  })
})
describe('wordsearch game', () => {
  it('timer starts with 1:00', () => {
    cy.visit('http://localhost:4200/#/game2')
    cy.get('.timer').contains("1:00")
  })
  it('clicking "Return" button navigates to the game page', () => {
    cy.visit('http://localhost:4200/#/game3')
    cy.contains('Return').click()
    cy.url().should('include', '/notifications')
  })
})
describe('picture fame', () => {
  it('current score starts with 0', () => {
    cy.visit('http://localhost:4200/#/game2')
    cy.get('.correct-count').contains("0")
  })
  it('clicking "Return" button navigates to the game page', () => {
    cy.visit('http://localhost:4200/#/game4')
    cy.contains('Return').click()
    cy.url().should('include', '/notifications')
  })
})
```

# Backend unit tests
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
+ TestGetMathScore()
+ TestGetWordScore()
+ TestGetAnimalScore()
+ TestSetMatchScore()
+ TestSetMathScore()
+ TestSetWordScore()
+ TestSetAnimalScore()
+ TestForgotPassword()

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
	loginData := []byte(`{"username": "vishalj05", "password": "wack"}`) //make sure this user is in database
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

    // Initialize the database connection
    DB, _ = gorm.Open(mysql.Open(DNS), &gorm.Config{})

    // Call the GetUser function with the response recorder and request objects
   GetUser(w, req)

    // Assert that the response status code is 200 OK
    if status := w.Code; status != http.StatusOK {
        t.Errorf("Handler returned wrong status code: got %v want %v",
            status, http.StatusOK)
    }
}
```

## TestSignUp()
This test function ensures that the signUp endpoint works as expected. It creates a new instance of the httptest.ResponseRecorder to record the response and a new request to the /signUp endpoint with a JSON request body containing user data. The signUp function is then called with the response recorder and request objects. The function adds the new user data to the MySQL database. The test asserts that the response status code is 200 OK and that the new user data is correctly added to the database.
```go
func TestSignUp(t *testing.T) {
	// Initialize a new router instance and register the SignUp function as a handler for the POST request
	r := mux.NewRouter()
	r.HandleFunc("/signup", signUp).Methods("POST")

	// Create a new instance of httptest.ResponseRecorder to record the response
	w := httptest.NewRecorder()

	// Create a new request to the /signup endpoint with user data in the request body
	userData := []byte(`{"username": "johnsmith", "password": "password123", "firstname": "Jonathan", "lastname": "Kahn", "email": "johnsmith@example.com"}`)
	req, err := http.NewRequest("POST", "/api/signup", bytes.NewBuffer(userData))
	if err != nil {
		t.Fatal(err)
	}

	// Call the SignUp function with the response recorder and request objects
	DB, _ = gorm.Open(mysql.Open(DNS), &gorm.Config{})
	signUp(w, req)

	// Assert that the response status code is 200 OK
	if status := w.Code; status != http.StatusOK {
		t.Errorf("Handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	// Assert that the response body contains the user's ID
	var user User
	if err := json.Unmarshal(w.Body.Bytes(), &user); err != nil {
		t.Errorf("Unable to parse response body: %v", err)
	}
	if user.ID == 0 {
		t.Errorf("User not created, ID is 0")
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
}
```
## TestUpdatePassword
The TestUpdatePassword function is a unit test for the API endpoint that updates a user's password. The function uses the following steps to test the endpoint:
1) Initialize a new router instance using the Gorilla mux library and register the UpdatePassword function as a handler for the PUT request to /users/{id}/pass.
2) Create a new instance of httptest.ResponseRecorder to record the response.
3) Create a new request to the /users/{id}/pass endpoint with an ID of 1 and a request body containing updated password data in JSON format.
4) Call the UpdatePassword function with the response recorder and request objects, which will update the user's password in the database.
5) Assert that the response status code is 200 OK.
6) Retrieve the updated user from the database and hash the password in the request body using bcrypt with default cost.
7) Assert that the updated user data in the database matches the request body data.
```go
func TestUpdatePassword(t *testing.T) {
	// Initialize a new router instance and register the UpdatePassword function as a handler for the PUT request
	r := mux.NewRouter()
	r.HandleFunc("/users/{id}/pass", UpdatePassword).Methods("PUT")

	// Create a new instance of httptest.ResponseRecorder to record the response
	w := httptest.NewRecorder()

	// Create a new request to the /users/{id}/pass endpoint with an id of 1 and a request body containing updated username data
	updateUser := User{
		Password: "wack3",
	}
	updateUserJSON, _ := json.Marshal(updateUser)
	req, err := http.NewRequest("PUT", "/users/1/pass", bytes.NewReader(updateUserJSON))
	if err != nil {
		t.Fatal(err)
	}

	// Call the UpdatePassword function with the response recorder and request objects
	DB, _ = gorm.Open(mysql.Open(DNS), &gorm.Config{})
	UpdatePassword(w, req)

	// Assert that the response status code is 200 OK
	if status := w.Code; status != http.StatusOK {
		t.Errorf("Handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	// Retrieve the updated user from the database
	var updatedUser User
	DB.First(&updatedUser, 1)

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(updateUser.Password), bcrypt.DefaultCost)
    if err != nil {
        w.WriteHeader(http.StatusInternalServerError)
        json.NewEncoder(w).Encode(map[string]string{"error": "Failed to hash password"})
        return
    }

	// Assert that the updated user data in the database matches the request body data
	if bytes.Equal([]byte(updatedUser.Password), hashedPassword) {
		t.Errorf("Handler did not update username data correctly: got %v want %v",
			updatedUser.Password, hashedPassword)
	}
}
```
## TestUpdateFirstName()
This function is a unit test that tests the UpdateFirstName function in the API. It performs the following steps:
1) Initializes a new router instance and registers the UpdateFirstName function as a handler for the PUT request.
2) Creates a new instance of httptest.ResponseRecorder to record the response.
3) Creates a new request to the /users/{id}/first endpoint with an id of 1 and a request body containing updated first name data.
4) Calls the UpdateFirstName function with the response recorder and request objects.
5) Asserts that the response status code is 200 OK.
6) Retrieves the updated user from the database.
7) Asserts that the updated user data in the database matches the request body data.
```go
func TestUpdateFirstname(t *testing.T) {
	// Initialize a new router instance and register the UpdateFirstName function as a handler for the PUT request
	r := mux.NewRouter()
	r.HandleFunc("/users/{id}/first", UpdateFirstName).Methods("PUT")

	// Create a new instance of httptest.ResponseRecorder to record the response
	w := httptest.NewRecorder()

	// Create a new request to the /users/{id}/username endpoint with an id of 1 and a request body containing updated username data
	updateUser := User{
		FirstName: "LEROY",
	}
	updateUserJSON, _ := json.Marshal(updateUser)
	req, err := http.NewRequest("PUT", "/users/1/first", bytes.NewReader(updateUserJSON))
	if err != nil {
		t.Fatal(err)
	}

	// Call the UpdateUsername function with the response recorder and request objects
	DB, _ = gorm.Open(mysql.Open(DNS), &gorm.Config{})
	UpdateFirstName(w, req)

	// Assert that the response status code is 200 OK
	if status := w.Code; status != http.StatusOK {
		t.Errorf("Handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	// Retrieve the updated user from the database
	var updatedUser User
	DB.First(&updatedUser, 1)

	// Assert that the updated user data in the database matches the request body data
	if updatedUser.FirstName != updateUser.FirstName {
		t.Errorf("Handler did not update username data correctly: got %v want %v",
			updatedUser.FirstName, updateUser.FirstName)
	}
}
```
## TestLastName()
This function updates the last name of a user with the given ID. It receives the updated last name in the request body as a JSON object and updates the corresponding user's last name in the database.
```go
func TestUpdateLastname(t *testing.T) {
	// Initialize a new router instance and register the UpdateLastName function as a handler for the PUT request
	r := mux.NewRouter()
	r.HandleFunc("/users/{id}/last", UpdateLastName).Methods("PUT")

	// Create a new instance of httptest.ResponseRecorder to record the response
	w := httptest.NewRecorder()

	// Create a new request to the /users/{id}/last endpoint with an id of 1 and a request body containing updated username data
	updateUser := User{
		LastName: "PATEL",
	}
	updateUserJSON, _ := json.Marshal(updateUser)
	req, err := http.NewRequest("PUT", "/users/1/last", bytes.NewReader(updateUserJSON))
	if err != nil {
		t.Fatal(err)
	}

	// Call the UpdateUsername function with the response recorder and request objects
	DB, _ = gorm.Open(mysql.Open(DNS), &gorm.Config{})
	UpdateLastName(w, req)

	// Assert that the response status code is 200 OK
	if status := w.Code; status != http.StatusOK {
		t.Errorf("Handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	// Retrieve the updated user from the database
	var updatedUser User
	DB.First(&updatedUser, 1)

	// Assert that the updated user data in the database matches the request body data
	if updatedUser.LastName != updateUser.LastName {
		t.Errorf("Handler did not update username data correctly: got %v want %v",
			updatedUser.UserName, updateUser.UserName)
	}
}
```
## TestUpdateEmail()
This test function ensures that the updateEmail endpoint works as expected. It creates a new instance of the httptest.ResponseRecorder to record the response and a new request to the /users/{id}/email endpoint with an id of 1 and a request body containing the updated email address. The updateEmail function is then called with the response recorder and request objects. The function updates the email address in the MySQL database. The test asserts that the response status code is 200 OK and that the updated email address in the database matches the request body data.
```go
func TestUpdateEmail(t *testing.T) {
	// Initialize a new router instance and register the UpdateEmail function as a handler for the PUT request
	r := mux.NewRouter()
	r.HandleFunc("/users/{id}/email", UpdateEmail).Methods("PUT")

	// Create a new instance of httptest.ResponseRecorder to record the response
	w := httptest.NewRecorder()

	// Create a new request to the /users/{id}/email endpoint with an id of 1 and a request body containing updated user data
	updateUser := User{
		Email: "randomemail@something.com",
	}
	updateUserJSON, _ := json.Marshal(updateUser)
	req, err := http.NewRequest("PUT", "/users/1/email", bytes.NewReader(updateUserJSON))
	if err != nil {
		t.Fatal(err)
	}

	// Call the UpdateEmail function with the response recorder and request objects
	DB, _ = gorm.Open(mysql.Open(DNS), &gorm.Config{})
	UpdateEmail(w, req)

	// Assert that the response status code is 200 OK
	if status := w.Code; status != http.StatusOK {
		t.Errorf("Handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	// Retrieve the updated user from the database
	var updatedUser User
	DB.First(&updatedUser, 1)

	// Assert that the updated user data in the database matches the request body data
	if updatedUser.Email != updateUser.Email {
		t.Errorf("Handler did not update user data correctly: got %v want %v",
			updatedUser.Email, updateUser.Email)
	}
}
```
## TestGetMatchScore()
GetMatchScore is an HTTP handler function that retrieves the match score for a given user ID and target ID from a MySQL database.
```go
func TestGetMatchScore(t *testing.T) {
    // Initialize a new router instance and register the GetMatchScore function as a handler for the GET request
    r := mux.NewRouter()
    r.HandleFunc("/users/{id}/match/{target}", GetMatchScore).Methods("GET")

    // Create a new instance of httptest.ResponseRecorder to record the response
    w := httptest.NewRecorder()

    // Create a new request to the /users/{id}/match/{target} endpoint with an id of 1 and a target of 2
    req, err := http.NewRequest("GET", "/users/1/match/2", nil)
    if err != nil {
        t.Fatal(err)
    }

    // Initialize the database connection
    DB, _ = gorm.Open(mysql.Open(DNS), &gorm.Config{})

    // Call the GetMatchScore function with the response recorder and request objects
    GetMatchScore(w, req)

    // Assert that the response status code is 200 OK
    if status := w.Code; status != http.StatusOK {
        t.Errorf("Handler returned wrong status code: got %v want %v",
            status, http.StatusOK)
    }
}
```
## TestGetMathScore()
TestGetMathScore is a test function written in Go to test the functionality of the GetMathScore function. It initializes a new router instance using the mux package and registers GetMathScore function as a handler for the GET request with the endpoint /users/{id}/math/{target}. It then creates a new instance of httptest.ResponseRecorder to record the response and a new request to the /users/{id}/math/{target} endpoint with an id of 1 and a target of 2. The function initializes the database connection and calls the GetMathScore function with the response recorder and request objects. Finally, it asserts that the response status code is 200 OK.
```go
func TestGetMathScore(t *testing.T) {
    // Initialize a new router instance and register the GetMathScore function as a handler for the GET request
    r := mux.NewRouter()
    r.HandleFunc("/users/{id}/math/{target}", GetMathScore).Methods("GET")

    // Create a new instance of httptest.ResponseRecorder to record the response
    w := httptest.NewRecorder()

    // Create a new request to the /users/{id}/math/{target} endpoint with an id of 1 and a target of 2
    req, err := http.NewRequest("GET", "/users/1/math/2", nil)
    if err != nil {
        t.Fatal(err)
    }

    // Initialize the database connection
    DB, _ = gorm.Open(mysql.Open(DNS), &gorm.Config{})

    // Call the GetMatchScore function with the response recorder and request objects
    GetMathScore(w, req)

    // Assert that the response status code is 200 OK
    if status := w.Code; status != http.StatusOK {
        t.Errorf("Handler returned wrong status code: got %v want %v",
            status, http.StatusOK)
    }
}
```
## TestGetWordScore()
TestGetWordScore is a test function written in Go to test the functionality of the GetWordScore function. It initializes a new router instance using the mux package and registers GetWordScore function as a handler for the GET request with the endpoint /users/{id}/word/{target}. It then creates a new instance of httptest.ResponseRecorder to record the response and a new request to the /users/{id}/word/{target} endpoint with an id of 1 and a target of 2. The function initializes the database connection and calls the GetMathScore function with the response recorder and request objects. Finally, it asserts that the response status code is 200 OK.
```go
func TestGetWordScore(t *testing.T) {
    // Initialize a new router instance and register the GetWordScore function as a handler for the GET request
    r := mux.NewRouter()
    r.HandleFunc("/users/{id}/word/{target}", GetMathScore).Methods("GET")

    // Create a new instance of httptest.ResponseRecorder to record the response
    w := httptest.NewRecorder()

    // Create a new request to the /users/{id}/word/{target} endpoint with an id of 1 and a target of 2
    req, err := http.NewRequest("GET", "/users/1/word/2", nil)
    if err != nil {
        t.Fatal(err)
    }

    // Initialize the database connection
    DB, _ = gorm.Open(mysql.Open(DNS), &gorm.Config{})

    // Call the GetMatchScore function with the response recorder and request objects
    GetWordScore(w, req)

    // Assert that the response status code is 200 OK
    if status := w.Code; status != http.StatusOK {
        t.Errorf("Handler returned wrong status code: got %v want %v",
            status, http.StatusOK)
    }
}
```
## TestGetAnimalScore()
TestGetAnimalScore is a test function written in Go to test the functionality of the GetAnimalScore function. It initializes a new router instance using the mux package and registers GetAnimalScore function as a handler for the GET request with the endpoint /users/{id}/animal/{target}. It then creates a new instance of httptest.ResponseRecorder to record the response and a new request to the /users/{id}/animal/{target} endpoint with an id of 1 and a target of 2. The function initializes the database connection and calls the GetAnimalScore function with the response recorder and request objects. Finally, it asserts that the response status code is 200 OK.
```go
func TestGetAnimalScore(t *testing.T) {
    // Initialize a new router instance and register the GetAnimalScore function as a handler for the GET request
    r := mux.NewRouter()
    r.HandleFunc("/users/{id}/animal/{target}", GetAnimalScore).Methods("GET")

    // Create a new instance of httptest.ResponseRecorder to record the response
    w := httptest.NewRecorder()

    // Create a new request to the /users/{id}/animal/{target} endpoint with an id of 1 and a target of 2
    req, err := http.NewRequest("GET", "/users/1/animal/2", nil)
    if err != nil {
        t.Fatal(err)
    }

    // Initialize the database connection
    DB, _ = gorm.Open(mysql.Open(DNS), &gorm.Config{})

    // Call the GetMatchScore function with the response recorder and request objects
    GetAnimalScore(w, req)

    // Assert that the response status code is 200 OK
    if status := w.Code; status != http.StatusOK {
        t.Errorf("Handler returned wrong status code: got %v want %v",
            status, http.StatusOK)
    }
}
```
## TestSetMatchScore
This function tests the setMatchScore function by creating a new router instance and registering setMatchScore as the handler for the PUT request to the /users/{id}/match/{target}/score endpoint. It then creates a new instance of httptest.ResponseRecorder to record the response, and creates a new request to the /users/{id}/match/{target}/score endpoint with an ID of 1, a target of 2, and a score of 75.

The function initializes the database connection and calls setMatchScore with the response recorder and request objects. Finally, it asserts that the response status code is 200 OK.
```go
func TestSetMatchScore(t *testing.T) {
    // Initialize a new router instance and register the SetMathScore function as a handler for the PUT request
    r := mux.NewRouter()
    r.HandleFunc("/users/{id}/match/{target}/score", setMatchScore).Methods("PUT")

    // Create a new instance of httptest.ResponseRecorder to record the response
    w := httptest.NewRecorder()

    // Create a new request to the /users/{id}/match/{target}/score endpoint with an id of 1 and a target of 2 and a score of 75
    body := bytes.NewBuffer([]byte(`{"score":75}`))
    req, err := http.NewRequest("PUT", "/users/1/match/2/score", body)
    if err != nil {
        t.Fatal(err)
    }

    // Initialize the database connection
    DB, _ = gorm.Open(mysql.Open(DNS), &gorm.Config{})

    // Call the SetMathScore function with the response recorder and request objects
    setMatchScore(w, req)

    // Assert that the response status code is 200 OK
    if status := w.Code; status != http.StatusOK {
        t.Errorf("Handler returned wrong status code: got %v want %v",
            status, http.StatusOK)
    }
}
```
## TestSetMathScore
The TestSetMathScore function is a test function that is used to test the setMathScore handler function. This function tests if the handler returns the expected status code 200 OK when called with a PUT request to the /users/{id}/math/{target}/score endpoint with a score value in the request body.
```go
func TestSetMathScore(t *testing.T) {
    // Initialize a new router instance and register the SetMathScore function as a handler for the PUT request
    r := mux.NewRouter()
    r.HandleFunc("/users/{id}/math/{target}/score", setMathScore).Methods("PUT")

    // Create a new instance of httptest.ResponseRecorder to record the response
    w := httptest.NewRecorder()

    // Create a new request to the /users/{id}/match/{target}/score endpoint with an id of 1 and a target of 2 and a score of 75
    body := bytes.NewBuffer([]byte(`{"score":75}`))
    req, err := http.NewRequest("PUT", "/users/1/math/2/score", body)
    if err != nil {
        t.Fatal(err)
    }

    // Initialize the database connection
    DB, _ = gorm.Open(mysql.Open(DNS), &gorm.Config{})

    // Call the SetMathScore function with the response recorder and request objects
    setMathScore(w, req)

    // Assert that the response status code is 200 OK
    if status := w.Code; status != http.StatusOK {
        t.Errorf("Handler returned wrong status code: got %v want %v",
            status, http.StatusOK)
    }
}
```
## TestSetWordScore
This function tests the setWordScore function by creating a new router instance and registering setWordScore as the handler for the PUT request to the /users/{id}/word/{target}/score endpoint. It then creates a new instance of httptest.ResponseRecorder to record the response, and creates a new request to the /users/{id}/word/{target}/score endpoint with an ID of 1, a target of 2, and a score of 75.

The function initializes the database connection and calls setWordScore with the response recorder and request objects. Finally, it asserts that the response status code is 200 OK.
```go
func TestSetWordScore(t *testing.T) {
    // Initialize a new router instance and register the SetMathScore function as a handler for the PUT request
    r := mux.NewRouter()
    r.HandleFunc("/users/{id}/word/{target}/score", setWordScore).Methods("PUT")

    // Create a new instance of httptest.ResponseRecorder to record the response
    w := httptest.NewRecorder()

    // Create a new request to the /users/{id}/word/{target}/score endpoint with an id of 1 and a target of 2 and a score of 75
    body := bytes.NewBuffer([]byte(`{"score":75}`))
    req, err := http.NewRequest("PUT", "/users/1/word/2/score", body)
    if err != nil {
        t.Fatal(err)
    }

    // Initialize the database connection
    DB, _ = gorm.Open(mysql.Open(DNS), &gorm.Config{})

    // Call the SetMathScore function with the response recorder and request objects
    setWordScore(w, req)

    // Assert that the response status code is 200 OK
    if status := w.Code; status != http.StatusOK {
        t.Errorf("Handler returned wrong status code: got %v want %v",
            status, http.StatusOK)
    }
}
```
## TestSetAnimalScore
This function tests the setMatchScore function by creating a new router instance and registering setAnimalScore as the handler for the PUT request to the /users/{id}/animal/{target}/score endpoint. It then creates a new instance of httptest.ResponseRecorder to record the response, and creates a new request to the /users/{id}/animal/{target}/score endpoint with an ID of 1, a target of 2, and a score of 75.

The function initializes the database connection and calls setAnimalScore with the response recorder and request objects. Finally, it asserts that the response status code is 200 OK.
```go
func TestSetAnimalScore(t *testing.T) {
    // Initialize a new router instance and register the SetMathScore function as a handler for the PUT request
    r := mux.NewRouter()
    r.HandleFunc("/users/{id}/animal/{target}/score", setAnimalScore).Methods("PUT")

    // Create a new instance of httptest.ResponseRecorder to record the response
    w := httptest.NewRecorder()

    // Create a new request to the /users/{id}/animal/{target}/score endpoint with an id of 1 and a target of 2 and a score of 75
    body := bytes.NewBuffer([]byte(`{"score":75}`))
    req, err := http.NewRequest("PUT", "/users/1/animal/2/score", body)
    if err != nil {
        t.Fatal(err)
    }

    // Initialize the database connection
    DB, _ = gorm.Open(mysql.Open(DNS), &gorm.Config{})

    // Call the SetMathScore function with the response recorder and request objects
    setAnimalScore(w, req)

    // Assert that the response status code is 200 OK
    if status := w.Code; status != http.StatusOK {
        t.Errorf("Handler returned wrong status code: got %v want %v",
            status, http.StatusOK)
    }
}
```
## TestGetID()
The TestGetID function tests the getID function. It initializes a new router instance and registers the getID function as a handler for the GET request. It creates a new instance of httptest.ResponseRecorder to record the response. It creates a new request to the /getid endpoint with a JSON payload containing a username and password. Then, it calls the getID function with the response recorder and request objects. Finally, it asserts that the response status code is 200 OK.
```go
func TestGetID(t *testing.T) {
	// Initialize a new router instance and register the GetID function as a handler for the GET request
	r := mux.NewRouter()
	r.HandleFunc("/getid", getID).Methods("GET")

	// Create a new instance of httptest.ResponseRecorder to record the response
	w := httptest.NewRecorder()

	// Create a new request to the /login endpoint with a username and password in the request body
	loginData := []byte(`{"username": "vishalj0525", "password": "wack"}`)
	req, err := http.NewRequest("GET", "/getid", bytes.NewBuffer(loginData))
	if err != nil {
		t.Fatal(err)
	}

	// Call the Login function with the response recorder and request objects
	DB, _ = gorm.Open(mysql.Open(DNS), &gorm.Config{})
	getID(w, req)

	// Assert that the response status code is 200 OK
	if status := w.Code; status != http.StatusOK {
		t.Errorf("Handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	
}
```
## TestForgotPassword()
The TestForgotPassword function tests the ForgotPassword function. First, the function initializes a new router instance and registers the ForgotPassword function as a handler for the POST request. Then, it creates a new instance of httptest.ResponseRecorder to record the response. After that, a new request to the /forgotPassword endpoint with a request body containing user data is created. The function then calls ForgotPassword with the response recorder and request objects. The test asserts that the response status code is 200 OK. If it is not, an error message is logged.
```go
func TestForgotPassword(t *testing.T) {
    // Initialize a new router instance and register the ForgotPassword function as a handler for the POST request
    r := mux.NewRouter()
    r.HandleFunc("/forgotPassword", ForgotPassword).Methods("POST")

    // Create a new instance of httptest.ResponseRecorder to record the response
    w := httptest.NewRecorder()

    // Create a new request to the /forgotPassword endpoint with a request body containing user data
    requestBody := []byte(`{
        "email": "viJap@gmail.com",
        "favoriteAnimal": "DOLPHIN",
        "password": "wack3"
    }`)
    req, err := http.NewRequest("POST", "/forgotPassword", bytes.NewReader(requestBody))
    if err != nil {
        t.Fatal(err)
    }

    // Call the ForgotPassword function with the response recorder and request objects
    DB, _ = gorm.Open(mysql.Open(DNS), &gorm.Config{})
    ForgotPassword(w, req)

    // Assert that the response status code is 200 OK
    if status := w.Code; status != http.StatusOK {
        t.Errorf("Handler returned wrong status code: got %v want %v",
            status, http.StatusOK)
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
+ getID()
+ UpdateUsername()
+ UpdatePassword()
+ UpdateFirstName()
+ UpdateLastName()
+ GetMatchScore()
+ GetMathScore()
+ GetWordScore()
+ GetAnimalScore()
+ setMatchScore()
+ setMathScore()
+ setWordScore
+ setAnimalScore
+ ForgotPassword()

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
## UpdateUser()
UpdateUser() is a handler function for updating a user's information. It accepts an HTTP request with a user ID parameter and the updated user information in the request body, updates the new information in the database, and returns the updated information as a JSON response.
```go
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
	// Parse the login credentials from the request body
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Error parsing request body", http.StatusBadRequest)
		return
	}

	// Query the database for the user with the given username
	var dbUser User
	result := DB.Where("user_name = ?", user.UserName).First(&dbUser)
	if result.Error != nil {
		http.Error(w, "Invalid username or password", http.StatusUnauthorized)
		return
	}

	// Compare the hashed password of the user in the database with the hashed password of the user in the request body
	err = bcrypt.CompareHashAndPassword([]byte(dbUser.Password), []byte(user.Password))
	if err != nil {
		http.Error(w, "Invalid username or password", http.StatusUnauthorized)
		return
	}

	// If the passwords match, return the user ID to the frontend
	response := "Login Successful"
	json.NewEncoder(w).Encode(response)
}
```
## SignUp()
signUp() is a handler function for registering a new user. It accepts an HTTP request with a user's registration credentials in the request body, queries the database for an existing user with the same username or email, creates a new user if no user is found, and returns a success message as a JSON response.
```go
func signUp(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    var user User
    json.NewDecoder(r.Body).Decode(&user)

    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
    if err != nil {
        http.Error(w, "Error hashing password", http.StatusInternalServerError)
        return
    }

    user.Password = string(hashedPassword)
    DB.Create(&user)
    json.NewEncoder(w).Encode(user)
}
```
## getID()
This function is an HTTP handler function that is registered to handle GET requests to the /getid endpoint. The goal of this function is to retrieve the user ID associated with a given username and password.

The function performs the following steps:

+ Sets the response header to indicate that the response content type is JSON.
+ Parses the username and password credentials from the request body.
+ Queries the database to retrieve the user with the given username.
+ Compares the received password with the stored hash to verify the password.
+ If the query and password check are successful, returns the user ID as a JSON response
```go
func getID(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")

    // Parse the login credentials from the request body
    var creds Credentials
    err := json.NewDecoder(r.Body).Decode(&creds)
    if err != nil {
        http.Error(w, "Error parsing request body", http.StatusBadRequest)
        return
    }

    // Query the database for the user with the given username
    var user User
    result := DB.Where("user_name = ?", creds.Username).First(&user)
    if result.Error != nil {
        http.Error(w, "Invalid username or password", http.StatusUnauthorized)
        return
    }

    // Compare the received password with the stored hash
    err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(creds.Password))
    if err != nil {
        http.Error(w, "Invalid username or password", http.StatusUnauthorized)
        return
    }

    // If the query and password check were successful, return the user ID to the frontend
    response := struct {
        ID uint `json:"id"`
    }{
        ID: user.ID,
    }
    json.NewEncoder(w).Encode(response)
}
```
## UpdateUsername()
The UpdateUsername function is a HTTP handler function for updating a user's username. The function receives a HTTP request with a PUT method and expects a JSON payload containing the new username to be updated. The function uses the gorilla/mux package to extract the user ID from the URL parameters and the gorm package to update the user's username in the database.
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
## UpdatePassword()
The UpdatePassword() function is used to update the password of a specific user identified by their id. The function takes in two parameters, a http.ResponseWriter and a http.Request.
```go
func UpdatePassword(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    params := mux.Vars(r)
    var user User
    DB.First(&user, params["id"])
    var data map[string]string
    json.NewDecoder(r.Body).Decode(&data)
    password, ok := data["password"]
    if !ok {
        w.WriteHeader(http.StatusBadRequest)
        json.NewEncoder(w).Encode(map[string]string{"error": "Missing password field"})
        return
    }
    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
    if err != nil {
        w.WriteHeader(http.StatusInternalServerError)
        json.NewEncoder(w).Encode(map[string]string{"error": "Failed to hash password"})
        return
    }
    user.Password = string(hashedPassword)
    DB.Save(&user)
    json.NewEncoder(w).Encode(user)
}
```
## UpdateFirstName()
The UpdateFirstName function updates the first name of a user with the provided id. It receives an HTTP request and response object, and uses the mux router to extract the id parameter from the URL path. It then decodes the request body, which is expected to contain a JSON object with a firstName field. If the firstName field is missing, it returns an HTTP 400 Bad Request response with an error message. Otherwise, it updates the firstName field of the corresponding user and returns the updated user object in the response body as a JSON object.
```go
func UpdateFirstName(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	var user User
	DB.First(&user, params["id"])
	var data map[string]string
	json.NewDecoder(r.Body).Decode(&data)
	firstName, ok := data["firstName"]
	if !ok {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Missing firstName field"})
		return
	}
	user.FirstName = firstName
	DB.Save(&user)
	json.NewEncoder(w).Encode(user)
}
```
## UpdateLastName()
This function is responsible for updating the last name of a user in the database.
```go
func UpdateLastName(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	var user User
	DB.First(&user, params["id"])
	var data map[string]string
	json.NewDecoder(r.Body).Decode(&data)
	lastName, ok := data["lastName"]
	if !ok {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Missing lastName field"})
		return
	}
	user.LastName = lastName
	DB.Save(&user)
	json.NewEncoder(w).Encode(user)
}
```
## UpdateEmail()
Updates the email address of a user with the specified ID.
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
## GetMatchScore()
This function is used to retrieve the memory game match score of a user. It takes a HTTP request and response as input and returns the user's match score as a JSON object in the response body. It first sets the content type of the response to JSON, then uses mux.Vars to extract the user ID from the request parameters. It queries the database to retrieve the user with the given ID, and encodes the user's match score to JSON using json.NewEncoder and writes it to the response body using w.Write.
```go
func GetMatchScore(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	var user User
	DB.First(&user, params["id"])
	json.NewEncoder(w).Encode(user.MatchScore)
}
```
## GetMathScore()
This function is used to retrieve the math score of a user. It takes a HTTP request and response as input and returns the user's math score as a JSON object in the response body. It first sets the content type of the response to JSON, then uses mux.Vars to extract the user ID from the request parameters. It queries the database to retrieve the user with the given ID, and encodes the user's math score to JSON using json.NewEncoder and writes it to the response body using w.Write.
```go
func GetMathScore(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	var user User
	DB.First(&user, params["id"])
	json.NewEncoder(w).Encode(user.MathScore)
}
```
## GetWordScore()
This function is used to retrieve the user's score for the word game. It takes a HTTP request and response as input and returns the user's word game score as a JSON object in the response body. It first sets the content type of the response to JSON, then uses mux.Vars to extract the user ID from the request parameters. It queries the database to retrieve the user with the given ID, and encodes the user's word game score to JSON using json.NewEncoder and writes it to the response body using w.Write.
```go
func GetWordScore(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	var user User
	DB.First(&user, params["id"])
	json.NewEncoder(w).Encode(user.WordScore)
}
```
## GetAnimalScore()
This function is used to retrieve the user's score for the animal game. It takes a HTTP request and response as input and returns the user's animal game score as a JSON object in the response body. It first sets the content type of the response to JSON, then uses mux.Vars to extract the user ID from the request parameters. It queries the database to retrieve the user with the given ID, and encodes the user's animal game score to JSON using json.NewEncoder and writes it to the response body using w.Write.
```go
func GetAnimalScore(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	var user User
	DB.First(&user, params["id"])
	json.NewEncoder(w).Encode(user.AnimalScore)
}
```
## setMatchScore()
This function is used to update a user's memory game match score. It takes a HTTP request and response as input and returns the updated user object as a JSON object in the response body. It first sets the content type of the response to JSON, then uses mux.Vars to extract the user ID from the request parameters. It queries the database to retrieve the user with the given ID, and parses the new match score from the request body. If the new match score is higher than the user's current match score, it updates the user's match score and saves the changes to the database. Finally, it encodes the updated user object to JSON using json.NewEncoder and writes it to the response body using w.Write.
```go
func setMatchScore(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	var user User
	result := DB.First(&user, params["id"])
	if result.Error != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	// Parse the new math score from the request body
	var score struct {
		Score int `json:"matchScore"`
	}
	err := json.NewDecoder(r.Body).Decode(&score)
	if err != nil {
		http.Error(w, "Error parsing request body", http.StatusBadRequest)
		return
	}

	// Update the user's math score if the new score is higher
	if score.Score > user.MatchScore {
		user.MatchScore = score.Score
		result = DB.Save(&user)
		if result.Error != nil {
			http.Error(w, "Error updating match score", http.StatusInternalServerError)
			return
		}
	}

	json.NewEncoder(w).Encode(user)
}
```
## setMathScore()
This function is used to update a user's math score. It takes a HTTP request and response as input and returns the updated user object as a JSON object in the response body. It first sets the content type of the response to JSON, then uses mux.Vars to extract the user ID from the request parameters. It queries the database to retrieve the user with the given ID, and parses the new math score from the request body. If the new math score is higher than the user's current math score, it updates the user's math score and saves the changes to the database. Finally, it encodes the updated user object to JSON using json.NewEncoder and writes it to the response body using w.Write.
```go
func setMathScore(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	var user User
	result := DB.First(&user, params["id"])
	if result.Error != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	// Parse the new math score from the request body
	var score struct {
		Score int `json:"mathScore"`
	}
	err := json.NewDecoder(r.Body).Decode(&score)
	if err != nil {
		http.Error(w, "Error parsing request body", http.StatusBadRequest)
		return
	}

	// Update the user's math score if the new score is higher
	if score.Score > user.MathScore {
		user.MathScore = score.Score
		result = DB.Save(&user)
		if result.Error != nil {
			http.Error(w, "Error updating math score", http.StatusInternalServerError)
			return
		}
	}

	json.NewEncoder(w).Encode(user)
}
```
## setWordScore()
This function is used to update a user's word game score. It takes a HTTP request and response as input and returns the updated user object as a JSON object in the response body. It first sets the content type of the response to JSON, then uses mux.Vars to extract the user ID from the request parameters. It queries the database to retrieve the user with the given ID, and parses the new word game score from the request body. If the new score is higher than the user's current match score, it updates the user's score and saves the changes to the database. Finally, it encodes the updated user object to JSON using json.NewEncoder and writes it to the response body using w.Write.
```go
func setWordScore(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	var user User
	result := DB.First(&user, params["id"])
	if result.Error != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	// Parse the new word score from the request body
	var score struct {
		Score int `json:"wordScore"`
	}
	err := json.NewDecoder(r.Body).Decode(&score)
	if err != nil {
		http.Error(w, "Error parsing request body", http.StatusBadRequest)
		return
	}

	// Update the user's word score if the new score is higher
	if score.Score < user.WordScore {
		user.WordScore = score.Score
		result = DB.Save(&user)
		if result.Error != nil {
			http.Error(w, "Error updating match score", http.StatusInternalServerError)
			return
		}
	}

	json.NewEncoder(w).Encode(user)
}
```
## setAnimalScore()
This function is used to update a user's animal game score. It takes a HTTP request and response as input and returns the updated user object as a JSON object in the response body. It first sets the content type of the response to JSON, then uses mux.Vars to extract the user ID from the request parameters. It queries the database to retrieve the user with the given ID, and parses the new animal game score from the request body. If the new game score is higher than the user's current score, it updates the user's match score and saves the changes to the database. Finally, it encodes the updated user object to JSON using json.NewEncoder and writes it to the response body using w.Write.
```go
func setAnimalScore(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	var user User
	result := DB.First(&user, params["id"])
	if result.Error != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	// Parse the new animal score from the request body
	var score struct {
		Score int `json:"animalScore"`
	}
	err := json.NewDecoder(r.Body).Decode(&score)
	if err != nil {
		http.Error(w, "Error parsing request body", http.StatusBadRequest)
		return
	}

	// Update the user's animal score if the new score is higher
	if score.Score > user.AnimalScore {
		user.AnimalScore = score.Score
		result = DB.Save(&user)
		if result.Error != nil {
			http.Error(w, "Error updating match score", http.StatusInternalServerError)
			return
		}
	}

	json.NewEncoder(w).Encode(user)
}
```
## ForgotPassword()
This function is an HTTP request handler for the backend API that handles a request to reset a user's forgotten password. The function expects a POST request with a JSON payload that contains the user's email, favorite animal answer, and new password. The function first checks if the request payload is valid and contains all the required fields. If the request payload is not valid, it returns an HTTP error response. The function then checks if the provided email exists in the database. If the email is not found, it returns an HTTP error response. Next, the function checks if the provided favorite animal answer is correct. If the answer is incorrect, it returns an HTTP error response. If the email and favorite animal answer are correct, the function hashes the new password using the `bcrypt` package and updates the user's password in the database. If there is an error during the password hashing or database update, the function returns an HTTP error response. Finally, the function returns a JSON response with a success message indicating that the password has been updated successfully. In summary, the `ForgotPassword` function is responsible for handling password reset requests, verifying the user's identity, and updating the user's password in the database.
```go
func ForgotPassword(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")

    var data map[string]string
    if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
        http.Error(w, "Invalid request body", http.StatusBadRequest)
        return
    }

    email, ok := data["email"]
    if !ok {
        http.Error(w, "Missing email field", http.StatusBadRequest)
        return
    }

    answer, ok := data["favoriteAnimal"]
    if !ok {
        http.Error(w, "Missing favoriteAnimal field", http.StatusBadRequest)
        return
    }

    // Check if email exists in the database
    var user User
    result := DB.Where("email = ?", email).First(&user)
    if result.Error != nil {
        http.Error(w, "Email not found", http.StatusBadRequest)
        return
    }

    // Check if the favorite animal answer is correct
    if answer != user.FavoriteAnimal {
        http.Error(w, "Incorrect favorite animal answer", http.StatusUnauthorized)
        return
    }
	password, ok := data["password"]
    if !ok {
        http.Error(w, "Missing password field", http.StatusBadRequest)
        return
    }

    // Hash the new password
    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
    if err != nil {
        http.Error(w, "Failed to hash password", http.StatusInternalServerError)
        return
    }

    // Update the user's password in the database
    user.Password = string(hashedPassword)
    if err := DB.Save(&user).Error; err != nil {
        http.Error(w, "Failed to save user data", http.StatusInternalServerError)
        return
    }

    json.NewEncoder(w).Encode(map[string]string{"message": "Password updated successfully."})
}
```
