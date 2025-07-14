import jwt from "jsonwebtoken"
import { DecodedUser } from "./types"

const JWT_SECRET = process.env.JWT_SECRET!

export function verifyToken(token: string): DecodedUser | null {
    try {
        return jwt.verify(token, JWT_SECRET) as DecodedUser
    } catch {
        return null
    }
}
