import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Deposit } from '@/domain/wallet/enterprise/entities/deposit'
import { Prisma, Deposit as PrismaDeposit } from '@prisma/client'

export class PrismaDepositMapper {
	static toDomain(raw: PrismaDeposit): Deposit {
		return Deposit.create({
			amount: raw.amount,
			origin: raw.origin,
			receiverId: new UniqueEntityId(raw.receiverId),
			walletId: new UniqueEntityId(raw.walletId)
		}, new UniqueEntityId(raw.id))
	}

	static toPrisma(deposit: Deposit): Prisma.DepositUncheckedCreateInput {
		return {
			id: deposit.id.toString(),
			amount: deposit.amount,
			origin: deposit.origin.toString(),
			receiverId: deposit.receiverId.toString(),
			walletId: deposit.walletId.toString(),
		}
	}
}