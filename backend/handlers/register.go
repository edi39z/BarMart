package handlers

import (
	"encoding/json"
	"net/http"
)

type RegisterRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Name     string `json:"name"`
	HP       string `json:"hp"`
}

type RegisterResponse struct {
	Message string `json:"message"`
	Success bool   `json:"success"`
}

func RegisterPetugasHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req RegisterRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	if req.Email == "" || req.Password == "" || req.Name == "" {
		http.Error(w, "Email, password, dan nama wajib diisi", http.StatusBadRequest)
		return
	}

	// Tambahkan petugas baru ke list (simulasi)
	newID := len(petugasList) + 1
	newPetugas := Petugas{
		ID:    newID,
		Email: req.Email,
		Name:  req.Name,
		HP:    req.HP,
	}
	petugasList = append(petugasList, newPetugas)

	response := RegisterResponse{
		Message: "Petugas berhasil didaftarkan: " + req.Name + " (" + req.Email + ")",
		Success: true,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
