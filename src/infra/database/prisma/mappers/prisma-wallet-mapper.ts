import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Wallet } from '@/domain/wallet/enterprise/entities/wallet'
import { Prisma, Wallet as PrismaWallet } from '@prisma/client'

export class PrismaWalletMapper {
	static toDomain(raw: PrismaWallet): Wallet {
		return Wallet.create({
			balance: raw.balance,
			userId: new UniqueEntityId(raw.userId),
			updatedAt: raw.updatedAt
		}, new UniqueEntityId(raw.id))
	}

	static toPrisma(wallet: Wallet): Prisma.WalletUncheckedCreateInput {
		return {
			id: wallet.id.toString(),
			userId: wallet.userId.toString(),
			balance: wallet.balance
		}
	}
}