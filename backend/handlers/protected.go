package handlers

import (
	"encoding/json"
	"net/http"
)

func ProtectedHandler(w http.ResponseWriter, r *http.Request) {
	userIDVal := r.Context().Value("userId")
	emailVal := r.Context().Value("email")

	userId, ok1 := userIDVal.(string)
	email, ok2 := emailVal.(string)

	if !ok1 || !ok2 {
		http.Error(w, "Unauthorized: context missing", http.StatusUnauthorized)
		return
	}

	res := map[string]string{
		"message": "Ini data rahasia dari backend Go!",
		"userId":  userId,
		"email":   email,
	}

	json.NewEncoder(w).Encode(res)
}
