import { BaseEntity, BaseEntityProps } from '../../../common/core' // TODO: add alias for 'common' to use @common

export class Task extends BaseEntity {
    public title: string
    public description: string
    public completed: boolean

    constructor (props: TaskProps) {
        super(props)
        this.title = props.title
        this.description = props.description
        this.completed = props.completed ?? false
    }

    static fromJson (json: any): Task {
        return new Task({
            id: json.id,
            ownerId: json.ownerId,
            createdAt: new Date(json.createdAt),
            updatedAt: new Date(json.updatedAt),
            createdBy: json.createdBy,
            updatedBy: json.updatedBy,
            deletedAt: json.deletedAt ? new Date(json.deletedAt) : undefined,
            deletedBy: json.deletedBy,
            title: json.title,
            description: json.description,
            completed: json.completed
        })
    }

    toJson (): any {
        return {
            id: this.id,
            ownerId: this.ownerId,
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
            createdBy: this.createdBy,
            updatedBy: this.updatedBy,
            deletedAt: this.deletedAt ? this.deletedAt.toISOString() : null,
            deletedBy: this.deletedBy || null,
            title: this.title,
            description: this.description,
            completed: this.completed
        }
    }
}

interface TaskProps extends BaseEntityProps {
    title: string
    description: string
    completed?: boolean
}