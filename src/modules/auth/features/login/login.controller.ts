import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { LoginUseCase } from './login.use-case'

export class AuthController {
    constructor(private readonly loginUseCase: LoginUseCase) { }

    async login(request: Request, response: Response): Promise<Response> {
        try {
            const { email, password } = request.body

            if (!email || !password) {
                return response.status(400).json({ error: 'Email and password are required.' })
            }

            const user = await this.loginUseCase.execute({ email, password })

            if (!user) {
                return response.status(401).json({ error: 'Invalid credentials.' })
            }

            const token = jwt.sign(
                { id: user.id, email: user.email, role: user.role, firstname: user.firstname, lastname: user.lastname },
                process.env.JWT_SECRET || 'secret',
                { expiresIn: '1h' }
            )

            return response.status(200).json({ token })
        } catch (error) {
            console.error(error)
            return response.status(500).json({ error: 'Internal server error.' })
        }
    }
}
