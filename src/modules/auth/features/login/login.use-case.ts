import bcrypt from 'bcryptjs'

interface User {
    id: string
    email: string
    passwordHash: string
    firstname: string
    lastname: string
    role: 'user' | 'admin'
}

const MOCKED_USERS: User[] = [
    {
        id: 'user-123',
        email: 'test@gmail.com',
        // passwordHash: bcrypt.hashSync('1234', 8)
        passwordHash: '$2b$08$KU1MW4EYoE9HATpH/RJCQ.X3tb4wyMdJzBgtyq/E7BwAsVuLgfdSa',
        firstname: 'Test',
        lastname: 'User',
        role: 'user'
    }
]

export class LoginUseCase {
    async execute(params: LoginParams): Promise<User | null> {
        const { email, password } = params

        const user = MOCKED_USERS.find(u => u.email === email)

        if (!user) {
            return null
        }

        const passwordMatch = await bcrypt.compare(password, user.passwordHash)

        if (!passwordMatch) {
            return null
        }

        const { passwordHash, ...userWithoutPassword } = user
        return userWithoutPassword as User
    }
}

interface LoginParams {
    email: string
    password: string
}
