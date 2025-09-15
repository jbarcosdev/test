import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { CurrentUser, UserRole } from '../auth'

interface DecodedToken {
    id: string
    email: string
    role: UserRole
    firstname: string
    lastname: string
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: CurrentUser
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authorization token not provided.' })
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as DecodedToken

        // Crear la instancia de CurrentUser usando el método estático
        req.currentUser = CurrentUser.fromJson({
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
            firstname: decoded.firstname,
            lastname: decoded.lastname
        })

        next()
    } catch (error) {
        console.error('JWT verification error:', error)
        return res.status(401).json({ error: 'Invalid or expired token.' })
    }
}
