# Work completed in Sprint 4
## Frontend
- Created two games: a matching game and a math game
	- Matching game: Has a timer, has matching cards, has a winning condition, saves lowest time and current time, can replay the game
	- Math Game: Has a countdown, keeps a score, and shows wrong answers and changes questions when the right answers
- Linked frontEnd to backEnd for signUp page to create new users
- Made a file to help retrieve the ID from the backend (to help get user data in the future)
- Modified LogIn and SignUp page to look neater and more centered
- Modified the Game page so it has instructions under the memory game and math game
## Backend
- 'Forgot password' feature finished and completed, switched to using a security question to allow the user to reset their password
- Fixed functionality to receive and store the time taken to complete the memory game, and then store the record/best time (lowest time)
- Fixed functionality to receive and store the score for the math game, and then store the highest score
- Added functionality to receive and store the score for the word game, and then store the highest score
- Added functionality to receive and store the score for the animal game, and then store the highest score
- Finished implementing functionality to update user information separately (email, username, first name, last name, and password)
## Together
- Connected Frontend and Backend for User Signup (Now have a working login and signup)
- Fixed and connected Frontend and Backend for all games and for updating user information

# Frontend unit tests

# Backend unit tests
## Table of Contents
+ TestLogin()
+ TestGetUser()
+ TestSignUp()
+ TestUpdateUsername()
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
	userData := []byte(`{"username": "johnsmith", "password": "password123", "email": "johnsmith@example.com"}`)
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

	// Assert that the updated user data in the database does not match the data for other fields
	if updatedUser.Password != "wack" || updatedUser.FirstName != "Vishal" ||
		updatedUser.LastName != "Janapati" || updatedUser.Email != "vjanapati05@gmail.com" {
		t.Errorf("Handler updated other user data: got %v want %v",
			updatedUser, updateUser)
	}
}
```
## TestUpdateUserName()
The TestUpdateUsername function tests the ability of the UpdateUsername function to update an existing user's username by sending a PUT request to the "/users/{id}/name" endpoint with the required user ID and updated username data in the request body. The function then asserts that the response status code is 200 OK and that the updated user data in the database matches the request body data.
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
    // Initialize a new router instance and register the GetMatchScore function as a handler for the GET request
    r := mux.NewRouter()
    r.HandleFunc("/users/{id}/math/{target}", GetMathScore).Methods("GET")

    // Create a new instance of httptest.ResponseRecorder to record the response
    w := httptest.NewRecorder()

    // Create a new request to the /users/{id}/match/{target} endpoint with an id of 1 and a target of 2
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
## TestSetMathScore
The TestSetMathScore function is a test function that is used to test the setMathScore handler function. This function tests if the handler returns the expected status code 200 OK when called with a PUT request to the /users/{id}/match/{target}/score endpoint with a score value in the request body.
```go
func TestSetMathScore(t *testing.T) {
    // Initialize a new router instance and register the SetMathScore function as a handler for the PUT request
    r := mux.NewRouter()
    r.HandleFunc("/users/{id}/match/{target}/score", setMathScore).Methods("PUT")

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
    setMathScore(w, req)

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
+ SetMatchScore()
+ SetMathScore()

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
This function is used to retrieve the match score of a user. It takes a HTTP request and response as input and returns the user's match score as a JSON object in the response body. It first sets the content type of the response to JSON, then uses mux.Vars to extract the user ID from the request parameters. It queries the database to retrieve the user with the given ID, and encodes the user's match score to JSON using json.NewEncoder and writes it to the response body using w.Write.
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
## setMatchScore()
This function is used to update a user's match score. It takes a HTTP request and response as input and returns the updated user object as a JSON object in the response body. It first sets the content type of the response to JSON, then uses mux.Vars to extract the user ID from the request parameters. It queries the database to retrieve the user with the given ID, and parses the new match score from the request body. If the new match score is higher than the user's current match score, it updates the user's match score and saves the changes to the database. Finally, it encodes the updated user object to JSON using json.NewEncoder and writes it to the response body using w.Write.
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
