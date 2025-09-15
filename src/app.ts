import express, { Express } from 'express'
import { InMemoryTaskRepository } from './modules/tasks/repositories'
import { AuthController, LoginUseCase } from './modules/auth/features/login'
import { authMiddleware } from './common/middlewares'
import { CreateTaskController, CreateTaskUseCase } from './modules/tasks/features/create-task'
import { ListTasksController, ListTasksUseCase } from './modules/tasks/features/list-tasks'
import { UpdateTasksController, UpdateTasksUseCase } from './modules/tasks/features/update-tasks'
import { DeleteTaskController, DeleteTaskUseCase } from './modules/tasks/features/delete-task'
import { GetTaskController, GetTaskUseCase } from './modules/tasks/features/get-task'

class App {
    public readonly app: Express

    constructor() {
        this.app = express()
        this.middlewares()
        this.routes()
    }

    private middlewares(): void {
        this.app.use(express.json())
    }

    private routes(): void {
        const taskRepository = new InMemoryTaskRepository()

        const loginUseCase = new LoginUseCase()
        const authController = new AuthController(loginUseCase)
        this.app.post('/login', (req, res) => authController.login(req, res))

        const createTaskUseCase = new CreateTaskUseCase(taskRepository)
        const createTaskController = new CreateTaskController(createTaskUseCase)
        this.app.post('/tasks', authMiddleware, (req, res) => createTaskController.execute(req, res))

        const listTasksUseCase = new ListTasksUseCase(taskRepository)
        const listTasksController = new ListTasksController(listTasksUseCase)
        this.app.get('/tasks', authMiddleware, async (req, res) => {
            const tasks = await listTasksController.execute()
            res.json(tasks)
        })

        const updateTasksUseCase = new UpdateTasksUseCase(taskRepository)
        const updateTasksController = new UpdateTasksController(updateTasksUseCase)
        this.app.put('/tasks/:id', authMiddleware, (req, res) => updateTasksController.execute(req, res))

        const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository)
        const deleteTaskController = new DeleteTaskController(deleteTaskUseCase)
        this.app.delete('/tasks/:id', authMiddleware, (req, res) => deleteTaskController.execute(req, res))

        const getTaskUseCase = new GetTaskUseCase(taskRepository)
        const getTaskController = new GetTaskController(getTaskUseCase)
        this.app.get('/tasks/:id', authMiddleware, (req, res) => getTaskController.execute(req, res))
    }
}

export default new App().app