package main

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"golang.org/x/crypto/bcrypt"
	"testing"
	"github.com/gorilla/mux"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

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

func TestLogin(t *testing.T) {
	// Initialize a new router instance and register the Login function as a handler for the POST request
	r := mux.NewRouter()
	r.HandleFunc("/login", login).Methods("POST")

	// Create a new instance of httptest.ResponseRecorder to record the response
	w := httptest.NewRecorder()

	// Create a new request to the /login endpoint with a username and password in the request body
	loginData := []byte(`{"username": "johnsmith", "password": "password123"}`) //make sure this user is in database
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

func TestGetID(t *testing.T) {
	// Initialize a new router instance and register the GetID function as a handler for the GET request
	r := mux.NewRouter()
	r.HandleFunc("/getID", getID).Methods("GET")

	// Create a new instance of httptest.ResponseRecorder to record the response
	w := httptest.NewRecorder()

	// Create a new request to the /login endpoint with a username and password in the request body
	loginData := []byte(`{"username": "johnsmith", "password": "password123"}`)
	req, err := http.NewRequest("GET", "/getID", bytes.NewBuffer(loginData))
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


//UPDATE USER TESTS
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

//MATCH SCORES

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

func TestSetMatchScore(t *testing.T) {
    // Initialize a new router instance and register the SetMatchScore function as a handler for the PUT request
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

    // Call the SetMatchScore function with the response recorder and request objects
    setMatchScore(w, req)

    // Assert that the response status code is 200 OK
    if status := w.Code; status != http.StatusOK {
        t.Errorf("Handler returned wrong status code: got %v want %v",
            status, http.StatusOK)
    }
}

//MATH TESTS

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

    // Call the GetMathScore function with the response recorder and request objects
    GetMathScore(w, req)

    // Assert that the response status code is 200 OK
    if status := w.Code; status != http.StatusOK {
        t.Errorf("Handler returned wrong status code: got %v want %v",
            status, http.StatusOK)
    }
}

func TestSetMathScore(t *testing.T) {
    // Initialize a new router instance and register the SetMathScore function as a handler for the PUT request
    r := mux.NewRouter()
    r.HandleFunc("/users/{id}/math/{target}/score", setMathScore).Methods("PUT")

    // Create a new instance of httptest.ResponseRecorder to record the response
    w := httptest.NewRecorder()

    // Create a new request to the /users/{id}/math/{target}/score endpoint with an id of 1 and a target of 2 and a score of 75
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

//WORD SCORE
func TestGetWordScore(t *testing.T) {
    // Initialize a new router instance and register the GetWordScore function as a handler for the GET request
    r := mux.NewRouter()
    r.HandleFunc("/users/{id}/word/{target}", GetWordScore).Methods("GET")

    // Create a new instance of httptest.ResponseRecorder to record the response
    w := httptest.NewRecorder()

    // Create a new request to the /users/{id}/word/{target} endpoint with an id of 1 and a target of 2
    req, err := http.NewRequest("GET", "/users/1/word/2", nil)
    if err != nil {
        t.Fatal(err)
    }

    // Initialize the database connection
    DB, _ = gorm.Open(mysql.Open(DNS), &gorm.Config{})

    // Call the GetWordScore function with the response recorder and request objects
    GetWordScore(w, req)

    // Assert that the response status code is 200 OK
    if status := w.Code; status != http.StatusOK {
        t.Errorf("Handler returned wrong status code: got %v want %v",
            status, http.StatusOK)
    }
}

func TestSetWordScore(t *testing.T) {
    // Initialize a new router instance and register the SetWordScore function as a handler for the PUT request
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

    // Call the SetWordScore function with the response recorder and request objects
    setWordScore(w, req)

    // Assert that the response status code is 200 OK
    if status := w.Code; status != http.StatusOK {
        t.Errorf("Handler returned wrong status code: got %v want %v",
            status, http.StatusOK)
    }
}

//ANIMAL TESTS

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

    // Call the GetAnimalScore function with the response recorder and request objects
    GetAnimalScore(w, req)

    // Assert that the response status code is 200 OK
    if status := w.Code; status != http.StatusOK {
        t.Errorf("Handler returned wrong status code: got %v want %v",
            status, http.StatusOK)
    }
}

func TestSetAnimalScore(t *testing.T) {
    // Initialize a new router instance and register the SetAnimalScore function as a handler for the PUT request
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

    // Call the SetAnimalScore function with the response recorder and request objects
    setAnimalScore(w, req)

    // Assert that the response status code is 200 OK
    if status := w.Code; status != http.StatusOK {
        t.Errorf("Handler returned wrong status code: got %v want %v",
            status, http.StatusOK)
    }
}

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
