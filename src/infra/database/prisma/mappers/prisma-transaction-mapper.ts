import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Transaction } from '@/domain/wallet/enterprise/entities/transaction'
import { Prisma, Transaction as PrismaTransaction } from '@prisma/client'

export class PrismaTransactionMapper {
	static toDomain(raw: PrismaTransaction): Transaction {
		return Transaction.create({
			amount: raw.amount,
			receiverId: new UniqueEntityId(raw.receiverId),
			senderId: new UniqueEntityId(raw.senderId),
			status: raw.status
		}, new UniqueEntityId(raw.id))
	}

	static toPrisma(transaction: Transaction): Prisma.TransactionUncheckedCreateInput {
		return {
			id: transaction.id.toString(),
			amount: transaction.amount,
			receiverId: transaction.receiverId.toString(),
			senderId: transaction.senderId.toString(),
			status: transaction.status
		}
	}
}