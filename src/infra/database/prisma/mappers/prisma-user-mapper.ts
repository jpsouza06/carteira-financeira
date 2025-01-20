import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { User } from '@/domain/wallet/enterprise/entities/user'
import { Prisma, User as PrismaUser } from '@prisma/client'

export class PrismaUserMapper {
	static toDomain(raw: PrismaUser): User {
		return User.create({
			email: raw.email,
			name: raw.name,
			password: raw.password
		}, new UniqueEntityId(raw.id))
	}

	static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
		return {
			id: user.id.toString(),
			name: user.name,
			email: user.email,
			password: user.password
		}
	}
}