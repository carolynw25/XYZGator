package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/gorilla/mux"
	"gorm.io/gorm"
)

func TestGetUsers(t *testing.T) {
	// Create a new router and server
	r := mux.NewRouter()
	r.HandleFunc("/api/users", GetUsers).Methods("GET")
	server := httptest.NewServer(r)
	defer server.Close()

	// Add some test data to the database
	users := []User{
		{
			Model:     gorm.Model{ID: 1},
			UserName:  "user1",
			Password:  "password1",
			FirstName: "John",
			LastName:  "Doe",
			Email:     "john.doe@example.com",
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
			DeletedAt: time.Time{},
		},
		{
			Model:     gorm.Model{ID: 2},
			UserName:  "user2",
			Password:  "password2",
			FirstName: "Jane",
			LastName:  "Doe",
			Email:     "jane.doe@example.com",
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
			DeletedAt: time.Time{},
		},
	}
	for _, u := range users {
		DB.Create(&u)
		defer DB.Delete(&u)
	}

	// Make a GET request to /users
	resp, err := http.Get(server.URL + "/users")
	if err != nil {
		t.Errorf("Error making GET request to /users: %v", err)
	}
	defer resp.Body.Close()

	// Check the response status code
	if resp.StatusCode != http.StatusOK {
		t.Errorf("Expected status code %d, but got %d", http.StatusOK, resp.StatusCode)
	}

	// Decode the response body into a slice of users
	var responseUsers []User
	err = json.NewDecoder(resp.Body).Decode(&responseUsers)
	if err != nil {
		t.Errorf("Error decoding response body: %v", err)
	}

	// Check that the response body contains the expected users
	if len(responseUsers) != len(users) {
		t.Errorf("Expected %d users, but got %d", len(users), len(responseUsers))
	}
	for i := range users {
		if users[i].ID != responseUsers[i].ID {
			t.Errorf("Expected ID %d, but got %d", users[i].ID, responseUsers[i].ID)
		}
		if users[i].UserName != responseUsers[i].UserName {
			t.Errorf("Expected UserName %s, but got %s", users[i].UserName, responseUsers[i].UserName)
		}
		// Check other fields as well
	}
}

func TestGetUser(t *testing.T) {
	// Create a new router and server
	r := mux.NewRouter()
	r.HandleFunc("/api/users/{id}", GetUser).Methods("GET")
	server := httptest.NewServer(r)
	defer server.Close()

	// Create a new user to add to the database
	newUser := User{
		Model:     gorm.Model{},
		UserName:  "cwang",
		Password:  "wangus",
		FirstName: "Carolyn",
		LastName:  "Wang",
		Email:     "carolyn.w2006@gmail.com",
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
		DeletedAt: time.Time{},
	}
	DB.Create(&newUser)

	// Get the new user from the database
	url := fmt.Sprintf("%s/users/%d", server.URL, newUser.ID)
	resp, err := http.Get(url)
	if err != nil {
		t.Errorf("Expected no error, but got %v", err)
	}
	defer resp.Body.Close()

	// Check that the response is OK and has the correct content type
	if resp.StatusCode != http.StatusOK {
		t.Errorf("Expected status code %d, but got %d", http.StatusOK, resp.StatusCode)
	}
	contentType := resp.Header.Get("Content-Type")
	expectedContentType := "application/json"
	if contentType != expectedContentType {
		t.Errorf("Expected content type %q, but got %q", expectedContentType, contentType)
	}

	// Decode the response body into a User struct
	var retrievedUser User
	err = json.NewDecoder(resp.Body).Decode(&retrievedUser)
	if err != nil {
		t.Errorf("Expected no error, but got %v", err)
	}

	// Check that the retrieved user matches the original user
	if retrievedUser.ID != newUser.ID {
		t.Errorf("Expected user ID %d, but got %d", newUser.ID, retrievedUser.ID)
	}
	if retrievedUser.UserName != newUser.UserName {
		t.Errorf("Expected user name %q, but got %q", newUser.UserName, retrievedUser.UserName)
	}
	// repeat this process for each field in User that you want to test
}

func TestCreateUser(t *testing.T) {
	// Create a new router and server
	r := mux.NewRouter()
	r.HandleFunc("/api/users", CreateUser).Methods("POST")
	server := httptest.NewServer(r)
	defer server.Close()

	// Create a new user to add to the database
	newUser := User{
		Model:     gorm.Model{},
		UserName:  "newuser",
		Password:  "newpassword",
		FirstName: "New",
		LastName:  "User",
		Email:     "new.user@example.com",
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
		DeletedAt: time.Time{},
	}
	newUserJSON, err := json.Marshal(newUser)
	if err != nil {
		t.Fatalf("Error marshalling new user: %v", err)
	}

	// Send a POST request to the server to create the user
	resp, err := http.Post(server.URL+"/users", "application/json", bytes.NewBuffer(newUserJSON))
	if err != nil {
		t.Fatalf("Error sending POST request: %v", err)
	}
	defer resp.Body.Close()

	// Check that the response status code is correct
	if resp.StatusCode != http.StatusOK {
		t.Errorf("Expected status code %d but got %d", http.StatusOK, resp.StatusCode)
	}

	// Check that the user was added to the database
	var users []User
	DB.Find(&users)
	if len(users) != 1 {
		t.Errorf("Expected 1 user in the database but found %d", len(users))
	}
	if users[0].UserName != newUser.UserName {
		t.Errorf("Expected user name %s but found %s", newUser.UserName, users[0].UserName)
	}
	if users[0].FirstName != newUser.FirstName {
		t.Errorf("Expected first name %s but found %s", newUser.FirstName, users[0].FirstName)
	}
	if users[0].LastName != newUser.LastName {
		t.Errorf("Expected last name %s but found %s", newUser.LastName, users[0].LastName)
	}
	if users[0].Email != newUser.Email {
		t.Errorf("Expected email %s but found %s", newUser.Email, users[0].Email)
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
}

func TestLogin(t *testing.T) {
	// Create a new router and server
	r := mux.NewRouter()
	r.HandleFunc("/api/login", login).Methods("POST")
	server := httptest.NewServer(r)
	defer server.Close()

	// Create a new user and add to the database
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

	// Prepare the request body with the user's login credentials
	loginCreds := User{
		UserName: "testuser",
		Password: "testpassword",
	}
	loginCredsJSON, err := json.Marshal(loginCreds)
	if err != nil {
		t.Fatalf("Error creating JSON for login credentials: %v", err)
	}

	// Send a request to the login endpoint with the user's credentials
	req, err := http.NewRequest("POST", server.URL+"/login", bytes.NewBuffer(loginCredsJSON))
	if err != nil {
		t.Fatalf("Error creating login request: %v", err)
	}
	req.Header.Set("Content-Type", "application/json")
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		t.Fatalf("Error sending login request: %v", err)
	}
	defer resp.Body.Close()

	// Check that the response has a 200 OK status code
	if resp.StatusCode != http.StatusOK {
		t.Errorf("Expected status code %d but got %d", http.StatusOK, resp.StatusCode)
	}

	// Check that the response body contains the expected user ID
	var responseBody struct {
		UserID uint `json:"userId"`
	}
	err = json.NewDecoder(resp.Body).Decode(&responseBody)
	if err != nil {
		t.Fatalf("Error parsing login response body: %v", err)
	}
	if responseBody.UserID != newUser.ID {
		t.Errorf("Expected user ID %d but got %d", newUser.ID, responseBody.UserID)
	}
}
