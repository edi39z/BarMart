package main

import (
	"barmart-backend/handlers"
	"barmart-backend/middleware"
	"fmt"
	"net/http"
)

func withCORS(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Header CORS di sini
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		h.ServeHTTP(w, r)
	})
}

func main() {
	mux := http.NewServeMux()

	// Daftar route
	mux.HandleFunc("/api/hello", handlers.HelloHandler)
	mux.HandleFunc("/api/secret", middleware.AuthMiddleware(handlers.ProtectedHandler))
	mux.HandleFunc("/api/user", middleware.AuthMiddleware(handlers.UserInfoHandler))
	mux.HandleFunc("/api/admin", middleware.AuthMiddleware(middleware.AdminOnly(handlers.AdminHandler)))
	mux.HandleFunc("/api/petugas", middleware.AuthMiddleware(middleware.PetugasOnly(handlers.PetugasHandler)))

	fmt.Println("🚀 Server berjalan di http://localhost:4000")
	http.ListenAndServe(":4000", withCORS(mux)) // ✅ CORS aktif di semua route
}
