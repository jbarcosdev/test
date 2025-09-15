import { ListTasksUseCase } from "./list-tasks.use-case"

export class ListTasksController {
    constructor (private readonly listTasksUseCase: ListTasksUseCase) { }

    async execute (): Promise<any> {
        const currentUser = { id: '12345' }
        const tasks = this.listTasksUseCase.execute({ currentUser })
        return tasks.map(task => task.toJson())
    }
}
