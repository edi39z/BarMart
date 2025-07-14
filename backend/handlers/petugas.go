package handlers

import (
	"encoding/json"
	"net/http"
)

func PetugasHandler(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Halo Petugas",
		"email":   r.Context().Value("email").(string),
	})
}
