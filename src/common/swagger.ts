import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Task API',
        version: '1.0.0',
        description: 'API for managing tasks',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Local server',
        },
    ],
}

const options = {
    swaggerDefinition,
    apis: ['./src/modules/tasks/features/**/*.controller.ts'],
}

const swaggerSpec = swaggerJSDoc(options)

export { swaggerUi, swaggerSpec }
