package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"strings"

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

func TestUpdateUser(t *testing.T) {
	// Create a new router and server
	r := mux.NewRouter()
	r.HandleFunc("/api/users/{id}", UpdateUser).Methods("PUT")
	server := httptest.NewServer(r)
	defer server.Close()

	// Add a user to the database
	user := User{
		UserName:  "testuser",
		Password:  "testpassword",
		FirstName: "Test",
		LastName:  "User",
		Email:     "test.user@example.com",
	}
	DB.Create(&user)

	// Update the user's last name
	updatedUser := User{
		UserName:  "testuser",
		Password:  "testpassword",
		FirstName: "Test",
		LastName:  "Updated User",
		Email:     "test.user@example.com",
	}
	updatedUserJSON, err := json.Marshal(updatedUser)
	if err != nil {
		t.Errorf("Error marshaling updated user: %v", err)
	}

	// Create a PUT request to update the user
	req, err := http.NewRequest("PUT", fmt.Sprintf("%s/users/%d", server.URL, user.ID), bytes.NewBuffer(updatedUserJSON))
	if err != nil {
		t.Errorf("Error creating PUT request: %v", err)
	}
	res, err := http.DefaultClient.Do(req)
	if err != nil {
		t.Errorf("Error sending PUT request: %v", err)
	}
	defer res.Body.Close()

	// Verify that the response code is 200 OK
	if res.StatusCode != http.StatusOK {
		t.Errorf("Expected status code 200, but got %d", res.StatusCode)
	}

	// Retrieve the updated user from the database
	var retrievedUser User
	DB.First(&retrievedUser, user.ID)

	// Verify that the last name was updated
	if retrievedUser.LastName != updatedUser.LastName {
		t.Errorf("Expected last name to be %s, but got %s", updatedUser.LastName, retrievedUser.LastName)
	}

	// Clean up the user from the database
	DB.Delete(&retrievedUser)
}

/*
func TestDeleteUser(t *testing.T) {
	// Create a new router and server
	r := mux.NewRouter()
	r.HandleFunc("/api/users/{id}", DeleteUser).Methods("DELETE")
	server := httptest.NewServer(r)
	defer server.Close()

	// Create a new user to add to the database
	newUser := User{
		Model:     gorm.Model{},
		UserName:  "testuser",
		Password:  "testpassword",
		FirstName: "Test",
		LastName:  "User",
		Email:     "test.user@example.com",
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
		DeletedAt: time.Time{},
	}
	DB.Create(&newUser)

	// Send a DELETE request to the server to delete the user
	req, err := http.NewRequest("DELETE", fmt.Sprintf("%s/users/%d", server.URL, newUser.ID), nil)
	if err != nil {
		t.Errorf("Failed to create request: %v", err)
		return
	}
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		t.Errorf("Failed to send request: %v", err)
		return
	}
	defer resp.Body.Close()

	// Check that the response has a success status code and the expected message
	if resp.StatusCode != http.StatusOK {
		t.Errorf("Expected status OK, but got %v", resp.StatusCode)
		return
	}
	var message string
	if err := json.NewDecoder(resp.Body).Decode(&message); err != nil {
		t.Errorf("Failed to decode response: %v", err)
		return
	}
	expectedMessage := "The user has been deleted successfully"
	if message != expectedMessage {
		t.Errorf("Expected message '%v', but got '%v'", expectedMessage, message)
		return
	}

	// Check that the user has been deleted from the database
	var deletedUser User
	if err := DB.First(&deletedUser, newUser.ID).Error; err == nil {
		t.Errorf("Expected user to be deleted, but got: %+v", deletedUser)
	}
}*/

func TestLogin(t *testing.T) {
	// Initialize a new in-memory sqlite database for testing

	db, err := gorm.Open(mysql.Open(DNS), &gorm.Config{})
	if err != nil {
		t.Fatal(err)
	}
	db.AutoMigrate(&User{})
	user := User{UserName: "cwang", Password: "wangus"}
	body, _ := json.Marshal(user)
	// Create a new HTTP request with the appropriate method, URL, and request body
	//requestBody := []byte(`{"username":"cwang","password":"wangus"}`)
	request, err := http.NewRequest("POST", "/api/login", bytes.NewBuffer(body))
	if err != nil {
		t.Fatal(err)
	}
	request.Header.Set("Content-Type", "application/json")
	// Create a new HTTP response writer to capture the response
	response := httptest.NewRecorder()

	// Call the login function with the request and response writer
	login(response, request)

	// Check the response status code
	if response.Code != http.StatusOK {
		t.Errorf("Expected status code %d but got %d", http.StatusOK, response.Code)
	}

	// Check the response body
	responseBody, err := ioutil.ReadAll(response.Body)
	if err != nil {
		t.Fatal(err)
	}
	expectedResponseBody := "Login Successful"
	if string(responseBody) != expectedResponseBody {
		t.Errorf("Expected response body %q but got %q", expectedResponseBody, string(responseBody))
	}
}
