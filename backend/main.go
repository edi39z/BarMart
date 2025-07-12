package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func protectedHandler(w http.ResponseWriter, r *http.Request) {
	userId := r.Context().Value(userIDKey).(string)
	email := r.Context().Value(emailKey).(string)

	res := map[string]string{
		"message": "Iniss data rahasia dari backend Go!",
		"userId":  userId,
		"email":   email,
	}

	json.NewEncoder(w).Encode(res)
}

func helloHandler(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(map[string]string{"message": "Halo dari Go!"})
}
func userInfoHandler(w http.ResponseWriter, r *http.Request) {
	userId := r.Context().Value(userIDKey).(string)
	email := r.Context().Value(emailKey).(string)

	res := map[string]string{
		"userId": userId,
		"email":  email,
		"status": "✅ Ini data user yang berhasil diverifikasi lewat JWT",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)
}

func main() {
	http.HandleFunc("/api/hello", helloHandler)
	http.HandleFunc("/api/secret", AuthMiddleware(protectedHandler))
	http.HandleFunc("/api/user", AuthMiddleware(userInfoHandler)) // 🆕
	fmt.Println("🚀 Backend Go jalan di http://localhost:4000")
	http.ListenAndServe(":4000", nil)
}
