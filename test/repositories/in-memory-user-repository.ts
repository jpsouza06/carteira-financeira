import { UserRepository } from '@/domain/wallet/application/repositories/user-repository'
import { User } from '@/domain/wallet/enterprise/entities/user'

export class InMemoryUserRepository implements UserRepository {
	public items: User[] = []

	constructor() {}
	async findByEmail(email: string)  {
		const user = this.items.find(user => user.email == email)

		if(!user) {
			return null
		}

		return user
	}

	async findById(userId: string)  {
		const user = this.items.find(user => user.id.toString() == userId)

		if(!user) {
			return null
		}

		return user
	}

	async create(user: User) {
		this.items.push(user)
	}
}