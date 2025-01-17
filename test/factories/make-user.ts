import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { User, UserProps } from '@/domain/wallet/enterprise/entities/user'

export function makeUser(
	override: Partial<UserProps> = {},
	id?: UniqueEntityId,
) {
	const user = User.create({
		email: faker.internet.email(),
		name: faker.person.firstName(),
		password: faker.internet.password(),
		...override
	},
	id,
	)

	return user
}