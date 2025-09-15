import { DeleteTaskUseCase } from "./delete-task.use-case"

export class DeleteTaskController {
    constructor (private readonly deleteTaskUseCase: DeleteTaskUseCase) { }

            /**
             * @swagger
             * /tasks/{id}:
             *   delete:
             *     summary: Delete a task
             *     tags:
             *       - Tasks
             *     parameters:
             *       - in: path
             *         name: id
             *         required: true
             *         schema:
             *           type: string
             *     responses:
             *       204:
             *         description: Task deleted
             *       500:
             *         description: Internal server error
             */
    execute (req: any, res: any): void {
        const { id } = req.params
        const currentUser = { id: '12345' }

        this.deleteTaskUseCase.execute({ taskId: id, currentUser })

        res.status(204).send()
    }
}
