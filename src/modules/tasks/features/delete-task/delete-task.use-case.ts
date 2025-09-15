import { InMemoryTaskRepository } from '../../repositories'

export class DeleteTaskUseCase {

    constructor (private taskRepository: InMemoryTaskRepository) { }

    execute (params: DeleteTaskParams): void {
        const { taskId, currentUser } = params
        
        // 1. find task by id
        const task = this.taskRepository.findById(taskId)

        // 2. if not found, throw error
        if (!task) {
            throw new Error('Task not found')
        }
        
        // 3. delete task
        this.taskRepository.delete(taskId)

        // 4. return nothing
        return
    }
}

interface DeleteTaskParams {
    taskId: string
    currentUser: any
}