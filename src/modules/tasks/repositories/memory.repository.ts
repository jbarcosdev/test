import { Task } from '../entities'

export class InMemoryTaskRepository {
    private tasks: Task[] = []
    
    save (task: Task): void {
        this.tasks.push(task)
    }

    findById (id: string): Task | undefined {
        return this.tasks.find(task => task.id === id)
    }

    findAll (): Task[] {
        return this.tasks
    }

    delete (id: string): void {
        this.tasks = this.tasks.filter(task => task.id !== id)
    }
}
