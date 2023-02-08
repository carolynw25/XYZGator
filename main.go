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

func renderLoginPage(w http.ResponseWriter, r *http.Request) {
    html := `
        <html>
            <head>
                <title>Login</title>
            </head>
            <body>
                <form action="/" method="post">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username">
                    <br>
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password">
                    <br>
                    <input type="submit" value="Submit">
                </form>
            </body>
        </html>
    `
    fmt.Fprintln(w, html)
}
