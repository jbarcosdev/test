import { GetTaskUseCase } from "./get-task.use-case"

export class GetTaskController {
    constructor (private readonly getTaskUseCase: GetTaskUseCase) { }

            /**
             * @swagger
             * /tasks/{id}:
             *   get:
             *     summary: Get a task by ID
             *     tags:
             *       - Tasks
             *     parameters:
             *       - in: path
             *         name: id
             *         required: true
             *         schema:
             *           type: string
             *     responses:
             *       200:
             *         description: Task found
             *         content:
             *           application/json:
             *             schema:
             *               type: object
             *       404:
             *         description: Task not found
             *       500:
             *         description: Internal server error
             */
    execute (req: any, res: any): void {
        const { id } = req.params
        const currentUser = { id: '12345' }

        const task = this.getTaskUseCase.execute({ taskId: id, currentUser })

        res.json(task.toJson())
    }
}
