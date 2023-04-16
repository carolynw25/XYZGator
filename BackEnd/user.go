package main

import (
	"encoding/json"
	"fmt"
	"net/http"
    "net/smtp"
    "github.com/google/uuid"

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
    MatchScore int       `json:"matchScore" gorm:"default:999999999999999"`
    MathScore  int       `json:"mathScore" gorm:"default:-1"`
	WordScore  int       `json:"wordScore" gorm:"default:99999999999999999"`
	AnimalScore int      `json:"animalScore" gorm:"default:-1"`
    PasswordResetToken     string    `json:"passwordResetToken"`
    PasswordResetExpiresAt int64     `json:"passwordResetExpiresAt"`
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
			http.Error(w, "Error updating match score", http.StatusInternalServerError)
			return
		}
	}

	json.NewEncoder(w).Encode(user)
}

func setMatchScore(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	var user User
	result := DB.First(&user, params["id"])
	if result.Error != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	// Parse the new match score from the request body
	var score struct {
		Score int `json:"matchScore"`
	}
	err := json.NewDecoder(r.Body).Decode(&score)
	if err != nil {
		http.Error(w, "Error parsing request body", http.StatusBadRequest)
		return
	}

	// Update the user's match score if the new score is higher
	if score.Score < user.MatchScore {
		user.MatchScore = score.Score
		result = DB.Save(&user)
		if result.Error != nil {
			http.Error(w, "Error updating match score", http.StatusInternalServerError)
			return
		}
	}

	json.NewEncoder(w).Encode(user)
}

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

func ForgotPassword(w http.ResponseWriter, r *http.Request) {
	// Set Content-Type header to JSON
	w.Header().Set("Content-Type", "application/json")

	// Parse request body into a map
	var data map[string]string
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid request payload"})
		return
	}

	// Get the email from the request payload
	email, ok := data["email"]
	if !ok {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Missing email field"})
		return
	}

	// Check if email exists in the database
	var user User
	err = DB.Where("email = ?", email).First(&user).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			w.WriteHeader(http.StatusNotFound)
			json.NewEncoder(w).Encode(map[string]string{"error": "Email not found"})
			return
		}
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Database error"})
		return
	}

	// Generate and store a password reset token for the user
	token := uuid.New().String()
	user.PasswordResetToken = token
	user.PasswordResetExpiresAt = time.Now().Add(time.Hour * 24).Unix() // Token expires in 24 hours
	err = DB.Save(&user).Error
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Database error"})
		return
	}

	// Send a password reset email to the user
	resetLink := fmt.Sprintf("https://example.com/reset-password/%s", token)
	subject := "Password Reset Request"
	body := fmt.Sprintf("Hello %s,\n\nWe have received a request to reset your password. Please click the following link to reset your password: %s\n\nIf you did not request a password reset, please ignore this email.\n\nBest,\nThe Example Team", user.FirstName, resetLink)
	err = sendEmail(email, subject, body)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Failed to send email"})
		return
	}

	// Return a success response
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Password reset email sent"})
}
func sendEmail(to, subject, body string) error {
	from := "testuser7381@outlook.com" // Replace with your own email address
	password := "example@123"        // Replace with your own email password
	smtpHost := "smtp.office365.com"     // Replace with your email provider's SMTP host

	// Set up authentication information.
	auth := smtp.PlainAuth("", from, password, smtpHost)

	// Compose the email message.
	msg := []byte("To: " + to + "\r\n" +
		"Subject: " + subject + "\r\n" +
		"\r\n" +
		body + "\r\n")

	// Send the email.
	err := smtp.SendMail(smtpHost+":587", auth, from, []string{to}, msg)
	if err != nil {
		return err
	}

	return nil
}