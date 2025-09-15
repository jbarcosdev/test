import { Request, Response } from 'express'
import { CreateTaskUseCase } from './create-task.use-case'

export class CreateTaskController {
    constructor (private readonly createTaskUseCase: CreateTaskUseCase) { }

    async execute (request: Request, response: Response): Promise<Response> {
        try {
            console.log('Received request to create task:', request.body)
            const { title, description } = request.body
            const currentUser = { id: '12345' }

            if (!title) {
                return response.status(400).json({ error: 'Title is required.' })
            }

            const task = this.createTaskUseCase.execute({
                payload: { title, description },
                currentUser
            })

            return response.status(201).json(task.toJson())
        } catch (error) {
            console.error(error)
            return response.status(500).json({ error: 'Internal server error.' })
        }
    }
}
