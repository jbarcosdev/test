import { Task } from '../../entities'
import { InMemoryTaskRepository } from '../../repositories'

export class GetTaskUseCase {

    constructor (private taskRepository: InMemoryTaskRepository) { }

    execute (params: GetTaskParams): Task {
        const { taskId, currentUser } = params
        
        // 1. find task by id
        const task = this.taskRepository.findById(taskId)

        // 2. if not found, throw error
        if (!task) {
            throw new Error('Task not found')
        }
        
        // 3. return task
        return task
    }
}

export interface GetTaskParams {
    taskId: string
    currentUser: any
}
