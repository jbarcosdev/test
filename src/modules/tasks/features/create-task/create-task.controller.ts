import { Request, Response } from 'express'
import { CreateTaskUseCase } from './create-task.use-case'

export class CreateTaskController {
    constructor (private readonly createTaskUseCase: CreateTaskUseCase) { }

            /**
             * @swagger
             * /tasks:
             *   post:
             *     summary: Create a new task
             *     tags:
             *       - Tasks
             *     requestBody:
             *       required: true
             *       content:
             *         application/json:
             *           schema:
             *             type: object
             *             properties:
             *               title:
             *                 type: string
             *               description:
             *                 type: string
             *     responses:
             *       201:
             *         description: Task created successfully
             *       400:
             *         description: Missing required data
             *       500:
             *         description: Internal server error
             */
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
