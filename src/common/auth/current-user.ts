export class CurrentUser {
    public id: string
    public firstname: string
    public lastname: string
    public email: string
    public role: UserRole

    constructor (props: CurrentUserProps) {
        this.id = props.id
        this.firstname = props.firstname
        this.lastname = props.lastname
        this.email = props.email
        this.role = props.role
    }

    static fromJson (json: any): CurrentUser {
        return new CurrentUser({
            id: json.id,
            firstname: json.firstname,
            lastname: json.lastname,
            email: json.email,
            role: json.role
        })
    }

    toJson (): any {
        return {
            id: this.id,
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            role: this.role
        }
    }

    isAdmin (): boolean {
        return this.role === 'admin'
    }
}

export interface CurrentUserProps {
    id: string
    firstname: string
    lastname: string
    email: string
    role: UserRole
}

type UserRole = 'admin' | 'user' | 'guest'