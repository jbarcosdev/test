import { Task } from '../../entities'
import { InMemoryTaskRepository } from '../../repositories'

export class ListTasksUseCase {

    constructor (private taskRepository: InMemoryTaskRepository = new InMemoryTaskRepository()) { }

    execute (params: ListTasksParams): Task[] {
        const { currentUser } = params
        
        // 1. list all tasks
        const tasks = this.taskRepository.findAll()

        // 2. return tasks
        return tasks
    }
}

export interface ListTasksParams {
    currentUser: any
}
