import { UpdateTasksUseCase } from "./update-task.use-case"

export class UpdateTasksController {
    constructor (private readonly updateTasksUseCase: UpdateTasksUseCase) { }

            /**
             * @swagger
             * /tasks/{id}:
             *   put:
             *     summary: Update a task
             *     tags:
             *       - Tasks
             *     parameters:
             *       - in: path
             *         name: id
             *         required: true
             *         schema:
             *           type: string
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
             *               completed:
             *                 type: boolean
             *     responses:
             *       200:
             *         description: Task updated
             *       500:
             *         description: Internal server error
             */
    execute (req: any, res: any): void {
        const { id } = req.params
        const { title, description, completed } = req.body
        const currentUser = { id: '12345' }

        const task = this.updateTasksUseCase.execute({ 
            payload: { taskId: id, title, description, completed }, 
            currentUser 
        })

        res.json(task.toJson())
    }
}
