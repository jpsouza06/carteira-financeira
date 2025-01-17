import { User } from '../../enterprise/entities/user'

export interface UserRepository {
   findById(userId: string): Promise<User | undefined>
   create(user: User): Promise<void>
}