package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	//"github.com/rs/cors"
	//"gorm.io/gorm"
	//"gorm.io/driver/sqlite"
)

func initializeRouter() {
	r := mux.NewRouter() //creates the router

	//adds CORS middleware
	c := cors.Default()
	r.Use(c.Handler)

	//user methods
	r.HandleFunc("/api/users", GetUsers).Methods("GET")
	r.HandleFunc("/api/users/{id}", GetUser).Methods("GET")
	r.HandleFunc("/api/users", CreateUser).Methods("POST")
	r.HandleFunc("/api/users/{id}", UpdateUser).Methods("PUT")
	r.HandleFunc("/api/users/{id}", DeleteUser).Methods("DELETE")
	r.HandleFunc("/api/login", login).Methods("POST")
	r.HandleFunc("/api/signUp",signUp).Methods("POST")

	//launch server
	//log.Fatal(http.ListenAndServe(":9000", r))
	log.Fatal(http.ListenAndServe("0.0.0.0:8080", r))
}

func main() {
	InitialMigration()
	initializeRouter()

}