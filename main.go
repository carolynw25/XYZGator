package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
	//"gorm.io/gorm"
	//"gorm.io/driver/sqlite"
	//"golang.org/x/crypto/bcrypt"
)

func initializeRouter() {
	r := mux.NewRouter() //creates the router

	//user methods
	r.HandleFunc("/api/users", GetUsers).Methods("GET")
	r.HandleFunc("/api/users/{id}", GetUser).Methods("GET")
	//r.HandleFunc("/api/users", CreateUser).Methods("POST")
	r.HandleFunc("/api/users/{id}", UpdateUser).Methods("PUT")
	r.HandleFunc("/api/users/{id}", DeleteUser).Methods("DELETE")
	r.HandleFunc("/api/login", login).Methods("POST")
	r.HandleFunc("/api/signUp", signUp).Methods("POST")
	r.HandleFunc("/api/getID", getID).Methods("POST")
	r.HandleFunc("/api/users/{id}/name", UpdateUsername).Methods("PUT")
    r.HandleFunc("/api/users/{id}/pass", UpdatePassword).Methods("PUT")
	r.HandleFunc("/api/users/{id}/first", UpdateFirstName).Methods("PUT")
	r.HandleFunc("/api/users/{id}/last", UpdateLastName).Methods("PUT")
	r.HandleFunc("/api/users/{id}/email}", UpdateEmail).Methods("PUT")

	r.HandleFunc("/api/users/{id}/matchscore", GetMatchScore).Methods("GET")
	r.HandleFunc("/api/users/{id}/mathscore", GetMathScore).Methods("GET")
	r.HandleFunc("/api/users/{id}/wordscore", GetWordScore).Methods("GET")
	r.HandleFunc("/api/users/{id}/animalscore", GetAnimalScore).Methods("GET")

	r.HandleFunc("/api/users/{id}/setMath", setMathScore).Methods("PUT")
	r.HandleFunc("/api/users/{id}/setMatch", setMatchScore).Methods("PUT")
	r.HandleFunc("/api/users/{id}/setWord", setWordScore).Methods("PUT")
	r.HandleFunc("/api/users/{id}/setAnimal", setAnimalScore).Methods("PUT")
	
    
	//r.HandleFunc("/api/test", login).Methods("POST")

	//adds CORS middleware
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:4200"},
		AllowCredentials: true,
	})
	handler := c.Handler(r)
	// add the Access-Control-Allow-Origin header
	handler = func(h http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", "http://localhost:4200")
			w.Header().Set("Access-Control-Allow-Methods", "PUT")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
			h.ServeHTTP(w, r)
		})
	}(handler)

	//launch server
	//log.Fatal(http.ListenAndServe(":9000", r))
	log.Fatal(http.ListenAndServe("localhost:8080", handler))
	//log.Fatal(http.ListenAndServe("128.227.1.31:61478", r))
}



func main() {
	InitialMigration()
	initializeRouter()
}