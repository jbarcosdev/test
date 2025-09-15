import { ListTasksUseCase } from "./list-tasks.use-case"

export class ListTasksController {
    constructor (private readonly listTasksUseCase: ListTasksUseCase) { }

            /**
             * @swagger
             * /tasks:
             *   get:
             *     summary: List all tasks
             *     tags:
             *       - Tasks
             *     responses:
             *       200:
             *         description: List of tasks
             *         content:
             *           application/json:
             *             schema:
             *               type: array
             *               items:
             *                 type: object
             *       500:
             *         description: Internal server error
             */
    async execute (): Promise<any> {
        const currentUser = { id: '12345' }
        const tasks = this.listTasksUseCase.execute({ currentUser })
        return tasks.map(task => task.toJson())
    }
}
