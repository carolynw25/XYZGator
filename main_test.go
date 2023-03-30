package main

import (
	"bytes"
	"encoding/json"
	//"fmt"
	//"io/ioutil"
	"net/http"
	"net/http/httptest"
	"strings"

	"testing"

	"github.com/gorilla/mux"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

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
func TestUpdateEmail(t *testing.T) {
    // Initialize a new router instance and register the UpdateFirstName function as a handler for the PUT request
    r := mux.NewRouter()
    r.HandleFunc("/users/{id}/email", UpdateEmail).Methods("PUT")

    // Create a new instance of httptest.ResponseRecorder to record the response
    w := httptest.NewRecorder()

    // Create a new request to the /users/{id}/firstname endpoint with an id of 1 and a request body containing updated user data
    updateUser := User{
        Email: "randomemail@something.com",
    }
    updateUserJSON,  := json.Marshal(updateUser)
    req, err := http.NewRequest("PUT", "/users/1/email", bytes.NewReader(updateUserJSON))
    if err != nil {
        t.Fatal(err)
    }

    // Call the UpdateFirstName function with the response recorder and request objects
    DB,  = gorm.Open(mysql.Open(DNS), &gorm.Config{})
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
    updateUserJSON,  := json.Marshal(updateUser)
    req, err := http.NewRequest("PUT", "/users/1/name", bytes.NewReader(updateUserJSON))
    if err != nil {
        t.Fatal(err)
    }

    // Call the UpdateUsername function with the response recorder and request objects
    DB,  = gorm.Open(mysql.Open(DNS), &gorm.Config{})
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
/*
func TestUpdateUser(t *testing.T) {
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
}*/
func TestSignUp(t *testing.T) {
    // Initialize a new router instance and register the SignUp function as a handler for the POST request
    r := mux.NewRouter()
    r.HandleFunc("/signup", signUp).Methods("POST")

    // Create a new instance of httptest.ResponseRecorder to record the response
    w := httptest.NewRecorder()

    // Create a new request to the /signup endpoint with user data in the request body
    userData := []byte({"username": "johnsmith", "password": "password123", "email": "johnsmith@example.com"})
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
