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
