import { DeleteTaskUseCase } from "./delete-task.use-case"

export class DeleteTaskController {
    constructor (private readonly deleteTaskUseCase: DeleteTaskUseCase) { }

    execute (req: any, res: any): void {
        const { id } = req.params
        const currentUser = { id: '12345' }

        this.deleteTaskUseCase.execute({ taskId: id, currentUser })

        res.status(204).send()
    }
}
