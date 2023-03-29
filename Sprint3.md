# Work completed in Sprint 3
## Frontend
## Backend
- Created function to get the user's ID when needed
- Updated signup function so that the password is hashed - this provides more security for the user's information
- Created functionality to receive and store the the time taken to complete the memory game, and then store the record/best time (lowest time)
- Modified function for updating users - now includes separate functionality for updating each piece of the user's information (usage will become more apparent when frontend adds a profile/settings page showing current user information)
- IN PROGRESS: Creating functionality for the 'forgot password' feature - involves sending a password reset link via email so that users can reset the password themselves
## Together
- Connected FrontEnd and Backend for User Signup (Now have a working login and signup)

# Frontend unit tests
- 

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
```
go
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
```
go
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
## TestUpdateUser()
This test function ensures that the updateUser endpoint works as expected. It creates a new instance of the httptest.ResponseRecorder to record the response and a new request to the /users/{id} endpoint with an id of 1 and a request body containing updated user data. The updateUser function is then called with the response recorder and request objects. The function updates the user data in the MySQL database. The test asserts that the response status code is 200 OK and that the updated user data in the database matches the request body data.
```func TestUpdateUser(t *testing.T) {
	// Initialize a new router instance and register the UpdateUser function as a handler for the PUT request
	r := mux.NewRouter()
	r.HandleFunc("/users/{id}", UpdateUser).Methods("PUT")

	// Create a new instance of httptest.ResponseRecorder to record the response
	w := httptest.NewRecorder()

	// Create a new request to the /users/{id} endpoint with an id of 1 and a request body containing updated user data
	updateUser := User{
		UserName:  "vishalj0525",
		Password:  "wack",
		FirstName: "Vishal",
		LastName:  "Janapati",
		Email:     "vjanapati05@gmail.com",
	}
	updateUserJSON, _ := json.Marshal(updateUser)
	req, err := http.NewRequest("PUT", "/users/1", bytes.NewReader(updateUserJSON))
	if err != nil {
		t.Fatal(err)
	}

	// Call the UpdateUser function with the response recorder and request objects
	DB, _ = gorm.Open(mysql.Open(DNS), &gorm.Config{})
	UpdateUser(w, req)

	// Assert that the response status code is 200 OK
	if status := w.Code; status != http.StatusOK {
		t.Errorf("Handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	// Retrieve the updated user from the database
	var updatedUser User
	DB.First(&updatedUser, 1)

	// Assert that the updated user data in the database matches the request body data
	if updatedUser.UserName != updateUser.UserName || updatedUser.Password != updateUser.Password ||
		updatedUser.FirstName != updateUser.FirstName || updatedUser.LastName != updateUser.LastName ||
		updatedUser.Email != updateUser.Email {
		t.Errorf("Handler did not update user data correctly: got %v want %v",
			updatedUser, updateUser)
	}
}
```
## TestSignUp()
This test function ensures that the signUp endpoint works as expected. It creates a new instance of the httptest.ResponseRecorder to record the response and a new request to the /signUp endpoint with a JSON request body containing user data. The signUp function is then called with the response recorder and request objects. The function adds the new user data to the MySQL database. The test asserts that the response status code is 200 OK and that the new user data is correctly added to the database.
```
go
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

# Updated documentation for your backend API
- 
