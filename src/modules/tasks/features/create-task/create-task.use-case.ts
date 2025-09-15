import { Task } from '../../entities'
import { InMemoryTaskRepository } from '../../repositories'

export class CreateTaskUseCase {

    constructor (private taskRepository: InMemoryTaskRepository) {
        // TODO: add dependency injection package instead of instancing here
    }

    execute (params: CreateTaskParams): Task {
        const { payload, currentUser } = params

        // 1. create task entity
        const task = new Task({
            id: crypto.randomUUID(), // use uuid v4
            ownerId: currentUser.id,
            title: payload.title,
            description: payload.description,
            completed: false
        })

        // 2. persist task entity to database (memory for the moment)
        this.taskRepository.save(task)

        // 3. return created task
        return task
    }
}

interface CreateTaskParams {
    payload: {
        title: string
        description: string
    },
    currentUser: any // TODO: add interface de current user
}
