import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { TransactionReversal } from '@/domain/wallet/enterprise/entities/transaction-reversal'
import { Prisma, TransactionReversal as PrismaTransactionReversal } from '@prisma/client'

export class PrismaTransactionReversalMapper {
	static toDomain(raw: PrismaTransactionReversal): TransactionReversal {
		return TransactionReversal.create({
			transactionId: new UniqueEntityId(raw.transactionId),
			reason: raw.reason
		}, new UniqueEntityId(raw.id))
	}

	static toPrisma(transactionReversal: TransactionReversal): Prisma.TransactionReversalUncheckedCreateInput {
		return {
			transactionId: transactionReversal.transactionId.toString(),
			reason: transactionReversal.reason
		}
	}
}