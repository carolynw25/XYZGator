package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			renderLoginPage(w, r)
			return
		}
		username := r.FormValue("username")
		password := r.FormValue("password")
		if username == "admin" && password == "admin" {
			fmt.Fprintln(w, "Welcome, admin!")
			return
		}
		fmt.Fprintln(w, "Invalid username or password")
	})
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		fmt.Println(err)
	}
}
