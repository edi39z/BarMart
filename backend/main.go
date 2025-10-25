package main

import (
	"barmart-backend/handlers"
	"barmart-backend/middleware"
	"fmt"
	"net/http"
)

func withCORS(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		h.ServeHTTP(w, r)
	})
}

func main() {
	mux := http.NewServeMux()

	// Public routes
	mux.HandleFunc("/api/hello", handlers.HelloHandler)

	// Protected routes
	mux.HandleFunc("/api/secret", middleware.AuthMiddleware(handlers.ProtectedHandler))
	mux.HandleFunc("/api/user", middleware.AuthMiddleware(handlers.UserInfoHandler))
	mux.HandleFunc("/api/admin", middleware.AuthMiddleware(middleware.AdminOnly(handlers.AdminHandler)))
	mux.HandleFunc("/api/petugas", middleware.AuthMiddleware(middleware.PetugasOnly(handlers.PetugasHandler)))

	// Admin-only routes (hanya untuk menambah petugas, bukan admin)
	mux.HandleFunc("/api/register-petugas", middleware.AuthMiddleware(middleware.AdminOnly(handlers.RegisterPetugasHandler)))
	mux.HandleFunc("/api/petugas-list", middleware.AuthMiddleware(middleware.AdminOnly(handlers.PetugasListHandler)))
	mux.HandleFunc("/api/petugas-delete", middleware.AuthMiddleware(middleware.AdminOnly(handlers.PetugasDeleteHandler)))

	fmt.Println("🚀 Server berjalan di http://localhost:4000")
	fmt.Println("📋 Available endpoints:")
	fmt.Println("   GET  /api/hello (public)")
	fmt.Println("   GET  /api/secret (protected)")
	fmt.Println("   GET  /api/admin (admin only)")
	fmt.Println("   GET  /api/petugas (petugas only)")
	fmt.Println("   POST /api/register-petugas (admin only)")
	fmt.Println("   GET  /api/petugas-list (admin only)")
	fmt.Println("   DELETE /api/petugas-delete (admin only)")

	http.ListenAndServe(":4000", withCORS(mux))
}
