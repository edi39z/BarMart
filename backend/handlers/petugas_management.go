package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
)

type Petugas struct {
	ID    int    `json:"id"`
	Email string `json:"email"`
	Name  string `json:"name"`
	HP    string `json:"hp"`
}

// Simulasi data petugas (dalam implementasi nyata, ambil dari database)
var petugasList = []Petugas{
	{ID: 1, Email: "petugas1@gmail.com", Name: "Petugas 1", HP: "081111111111"},
	{ID: 2, Email: "petugas2@gmail.com", Name: "Petugas 2", HP: "082222222222"},
}

func PetugasListHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	response := map[string]interface{}{
		"success": true,
		"data":    petugasList,
		"message": "Data petugas berhasil diambil",
	}

	json.NewEncoder(w).Encode(response)
}

func PetugasDeleteHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	idStr := r.URL.Query().Get("id")
	if idStr == "" {
		http.Error(w, "ID petugas wajib diisi", http.StatusBadRequest)
		return
	}

	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "ID tidak valid", http.StatusBadRequest)
		return
	}

	// Cari dan hapus petugas
	for i, petugas := range petugasList {
		if petugas.ID == id {
			petugasList = append(petugasList[:i], petugasList[i+1:]...)
			w.Header().Set("Content-Type", "application/json")
			response := map[string]interface{}{
				"success": true,
				"message": "Petugas berhasil dihapus",
			}
			json.NewEncoder(w).Encode(response)
			return
		}
	}

	http.Error(w, "Petugas tidak ditemukan", http.StatusNotFound)
}
