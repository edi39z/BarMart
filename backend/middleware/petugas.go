package middleware

import (
	"net/http"
)

func PetugasOnly(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		role := r.Context().Value("role").(string)
		if role != "petugas" {
			http.Error(w, "Forbidden: hanya petugas", http.StatusForbidden)
			return
		}
		next.ServeHTTP(w, r)
	}
}
