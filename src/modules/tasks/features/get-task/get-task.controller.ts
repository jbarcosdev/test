import { GetTaskUseCase } from "./get-task.use-case"

export class GetTaskController {
    constructor (private readonly getTaskUseCase: GetTaskUseCase) { }

    execute (req: any, res: any): void {
        const { id } = req.params
        const currentUser = { id: '12345' }

        const task = this.getTaskUseCase.execute({ taskId: id, currentUser })

        res.json(task.toJson())
    }
}
