package handlers

import (
	"encoding/json"
	"net/http"
)

func UserInfoHandler(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(map[string]string{
		"userId": r.Context().Value("userId").(string),
		"email":  r.Context().Value("email").(string),
		"status": "✅ Diverifikasi lewat JWT",
	})
}
