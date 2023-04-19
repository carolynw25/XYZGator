package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func initializeRouter() {
	r := mux.NewRouter() //creates the router

	//user methods
	r.HandleFunc("/api/users", GetUsers).Methods("GET")
	r.HandleFunc("/api/users/{id}", GetUser).Methods("GET")
	// r.HandleFunc("/api/users/{id}", DeleteUser).Methods("DELETE")
	r.HandleFunc("/api/login", login).Methods("POST")
	r.HandleFunc("/api/signUp", signUp).Methods("POST")
	r.HandleFunc("/api/getID", getID).Methods("POST")
	
	r.HandleFunc("/api/users/{id}/name", UpdateUsername).Methods("PUT")
    r.HandleFunc("/api/users/{id}/pass", UpdatePassword).Methods("PUT")
	r.HandleFunc("/api/users/{id}/first", UpdateFirstName).Methods("PUT")
	r.HandleFunc("/api/users/{id}/last", UpdateLastName).Methods("PUT")
	r.HandleFunc("/api/users/{id}/email", UpdateEmail).Methods("PUT")

	r.HandleFunc("/api/users/{id}/matchscore", GetMatchScore).Methods("GET")
	r.HandleFunc("/api/users/{id}/mathscore", GetMathScore).Methods("GET")
	r.HandleFunc("/api/users/{id}/wordscore", GetWordScore).Methods("GET")
	r.HandleFunc("/api/users/{id}/animalscore", GetAnimalScore).Methods("GET")

	r.HandleFunc("/api/users/{id}/setMath", setMathScore).Methods("PUT")
	r.HandleFunc("/api/users/{id}/setMatch", setMatchScore).Methods("PUT")
	r.HandleFunc("/api/users/{id}/setWord", setWordScore).Methods("PUT")
	r.HandleFunc("/api/users/{id}/setAnimal", setAnimalScore).Methods("PUT")

	r.HandleFunc("/api/forgotPassword", ForgotPassword).Methods("POST")
	
	
    

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

	log.Fatal(http.ListenAndServe("localhost:8080", handler))
}



func main() {
	InitialMigration()
	initializeRouter()
}