package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	//"database/sql"
	"time"

	"github.com/gorilla/mux"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
    gorm.Model
    UserName   string    `json:"username"`
    Password   string    `json:"password"`
    FirstName  string    `json:"firstname"`
    LastName   string    `json:"lastname"`
    Email      string    `json:"email"`
    CreatedAt  time.Time `gorm:"-"`
    UpdatedAt  time.Time `gorm:"-"`
    DeletedAt  time.Time `gorm:"-"`
    MatchScore int       `json:"matchScore" gorm:"default:-1"`
    MathScore  int       `json:"mathScore" gorm:"default:-1"`
	WordScore  int       `json:"wordScore" gorm:"default:-1"`
	AnimalScore int      `json:"animalScore" gorm:"default:-1"`
}

var DB *gorm.DB
var err error

//const DNS = "root:Jr5rxs!!@tcp(127.0.0.1:3306)/credentials?charset"
const DNS = "root:Teamindia#1@tcp(127.0.0.1:3306)/credentials?charset=utf8mb4&parseTime=True&loc=Local"

func InitialMigration() {
	DB, err = gorm.Open(mysql.Open(DNS), &gorm.Config{})
	if err != nil {
		fmt.Println(err.Error())
		panic("Cannot connect to DB")
	}
	DB.AutoMigrate(&User{})
}

func GetUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var users []User
	DB.Find(&users)
	json.NewEncoder(w).Encode(users)

}

func GetUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	var user User
	DB.First(&user, params["id"])
	json.NewEncoder(w).Encode(user)
}

/*
func CreateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var user User
	json.NewDecoder(r.Body).Decode(&user)
	DB.Create(&user)
	json.NewEncoder(w).Encode(user)
}*/

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

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	var user User
	DB.First(&user, params["id"])
	json.NewDecoder(r.Body).Decode(&user)
	DB.Save(&user)
	json.NewEncoder(w).Encode(user)
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	var user User
	DB.Delete(&user, params["id"])
	json.NewEncoder(w).Encode("The user has been deleted successfully")
}

type Credentials struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

/*
	func generateToken(user User) (string, error) {
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"id":       user.ID,
			"username": user.UserName,
			"email":    user.Email,
			"exp":      time.Now().Add(time.Hour * 24).Unix(),
		})
		return token.SignedString([]byte("secret"))
	}
*/
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

func signUp(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")

    // Parse the signup details from the request body
    var user User
    err := json.NewDecoder(r.Body).Decode(&user)
    if err != nil {
        http.Error(w, "Error parsing request body", http.StatusBadRequest)
        return
    }

    // Check if the username already exists in the database
    var existingUser User
    result := DB.Where("user_name = ?", user.UserName).First(&existingUser)
    if result.Error == nil {
        http.Error(w, "User already taken", http.StatusBadRequest)
        return
    }

    // Hash the password before storing in the database
    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
    if err != nil {
        http.Error(w, "Error hashing password", http.StatusInternalServerError)
        return
    }
    user.Password = string(hashedPassword)

    // Create the user in the database
    DB.Create(&user)
    json.NewEncoder(w).Encode(user)
}

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
func GetMatchScore(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    params := mux.Vars(r)
    var user User
    DB.First(&user, params["id"])
    json.NewEncoder(w).Encode(user.MatchScore)
}

func GetMathScore(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    params := mux.Vars(r)
    var user User
    DB.First(&user, params["id"])
    json.NewEncoder(w).Encode(user.MathScore)
}

func GetWordScore(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    params := mux.Vars(r)
    var user User
    DB.First(&user, params["id"])
    json.NewEncoder(w).Encode(user.MathScore)
}

func GetAnimalScore(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    params := mux.Vars(r)
    var user User
    DB.First(&user, params["id"])
    json.NewEncoder(w).Encode(user.MathScore)
}

func setMathScore(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    params := mux.Vars(r)
    var user User
    DB.First(&user, params["id"])
    json.NewDecoder(r.Body).Decode(&user)
    DB.Save(&user)
    json.NewEncoder(w).Encode(user)
}

func setMatchScore(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
    params := mux.Vars(r)
    var user User
    DB.First(&user, params["id"])
    json.NewDecoder(r.Body).Decode(&user)
    DB.Save(&user)
    json.NewEncoder(w).Encode(user)
}

func setWordScore(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
    params := mux.Vars(r)
    var user User
    DB.First(&user, params["id"])
    json.NewDecoder(r.Body).Decode(&user)
    DB.Save(&user)
    json.NewEncoder(w).Encode(user)
}

func setAnimalScore(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
    params := mux.Vars(r)
    var user User
    DB.First(&user, params["id"])
    json.NewDecoder(r.Body).Decode(&user)
    DB.Save(&user)
    json.NewEncoder(w).Encode(user)
}