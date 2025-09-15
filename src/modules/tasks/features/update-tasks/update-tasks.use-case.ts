import { Task } from '../../entities'
import { InMemoryTaskRepository } from '../../repositories'

export class UpdateTasksUseCase {

    constructor (private taskRepository: InMemoryTaskRepository = new InMemoryTaskRepository()) { }

    execute (params: UpdateTasksParams): Task {
        const { payload, currentUser } = params
        const { taskId, title, description, completed } = payload

        // 1. find task by id
        const task = this.taskRepository.findById(taskId)

        // 2. if not found, throw error
        if (!task) {
            throw new Error('Task not found')
        }

        // 3. update task fields
        task.title = title ?? task.title
        task.description = description ?? task.description
        task.completed = completed ?? task.completed

        // 4. return updated task
        return task
    }
}

export interface UpdateTasksParams {
    payload: {
        taskId: string
        title?: string
        description?: string
        completed?: boolean
    },
    currentUser: any
}
