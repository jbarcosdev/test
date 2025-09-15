import { UpdateTasksUseCase } from "./update-task.use-case"

export class UpdateTasksController {
    constructor (private readonly updateTasksUseCase: UpdateTasksUseCase) { }

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
