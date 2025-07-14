package middleware

import (
	"net/http"
)

func AdminOnly(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		role := r.Context().Value("role").(string)
		if role != "admin" {
			http.Error(w, "Forbidden: hanya admin", http.StatusForbidden)
			return
		}
		next.ServeHTTP(w, r)
	}
}
