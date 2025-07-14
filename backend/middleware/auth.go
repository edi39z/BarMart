package middleware

import (
	"context"
	"fmt"
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt/v5"
)

// ✅ Gunakan JWT secret yang sama dengan frontend
var jwtKey = []byte("your-secret-key-here-make-it-long-and-secure")

type contextKey string

const (
	userIDKey contextKey = "userId"
	emailKey  contextKey = "email"
	roleKey   contextKey = "role"
)

func AuthMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Set CORS headers
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")

		// Handle preflight request
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		authHeader := r.Header.Get("Authorization")
		if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer ") {
			fmt.Printf("❌ Auth header missing or invalid: %s\n", authHeader)
			http.Error(w, "Unauthorized: token missing or invalid", http.StatusUnauthorized)
			return
		}

		tokenStr := strings.TrimPrefix(authHeader, "Bearer ")
		fmt.Printf("🔍 Received token: %s...\n", tokenStr[:min(20, len(tokenStr))])

		token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return jwtKey, nil
		})

		if err != nil {
			fmt.Printf("❌ JWT parse error: %v\n", err)
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		if !token.Valid {
			fmt.Printf("❌ Token is not valid\n")
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			fmt.Printf("❌ Invalid token claims\n")
			http.Error(w, "Invalid token claims", http.StatusUnauthorized)
			return
		}

		fmt.Printf("✅ Token valid for user: %v, role: %v\n", claims["email"], claims["role"])

		ctx := context.WithValue(r.Context(), userIDKey, claims["userId"])
		ctx = context.WithValue(ctx, emailKey, claims["email"])
		ctx = context.WithValue(ctx, roleKey, claims["role"])

		next.ServeHTTP(w, r.WithContext(ctx))
	}
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}
