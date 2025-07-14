export type Role = "admin" | "petugas" | "pedagang"

export type AuthUser = {
    id: string | number
    email: string
    password: string
    role: Role
}

// Tipe khusus untuk data dari JWT token
export type DecodedUser = {
    userId: string
    email: string
    role: Role
}
