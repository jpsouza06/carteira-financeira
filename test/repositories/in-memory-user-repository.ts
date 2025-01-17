import { UserRepository } from '@/domain/wallet/application/repositories/user-repository'
import { User } from '@/domain/wallet/enterprise/entities/user'

export class InMemoryUserRepository implements UserRepository {
	public items: User[] = []

	constructor() {}
	async findById(userId: string)  {
		const user = this.items.find(user => user.id.toString() == userId)
		return user
	}

	async create(user: User) {
		this.items.push(user)
	}
}