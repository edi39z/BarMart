package handlers

import (
	"encoding/json"
	"net/http"
)

func AdminHandler(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Halo Admin",
		"email":   r.Context().Value("email").(string),
	})
}
