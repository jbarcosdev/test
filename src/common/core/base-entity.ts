export abstract class BaseEntity {
    id: string
    ownerId: string
    createdAt: Date
    updatedAt: Date
    createdBy: string
    updatedBy: string
    deletedAt?: Date
    deletedBy?: string
    
    constructor (props: BaseEntityProps) {
        this.id = props.id
        this.ownerId = props.ownerId
        this.createdAt = props.createdAt ?? new Date()
        this.updatedAt = props.updatedAt ?? new Date()
        this.createdBy = props.createdBy ?? props.ownerId
        this.updatedBy = props.updatedBy ?? props.ownerId
        this.deletedAt = props.deletedAt
        this.deletedBy = props.deletedBy
    }
}

export interface BaseEntityProps {
    id: string
    ownerId: string
    createdAt?: Date
    updatedAt?: Date
    createdBy?: string
    updatedBy?: string
    deletedAt?: Date
    deletedBy?: string
}
