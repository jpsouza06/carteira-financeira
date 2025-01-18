import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import Decimal from 'decimal.js'
import { Transaction, TransactionProps } from '@/domain/wallet/enterprise/entities/transaction'

export function makeTransaction(
	override: Partial<TransactionProps> = {},
	id?: UniqueEntityId,
) {
	const transaction = Transaction.create({
		amount: new Decimal(faker.number.float()),
		receiverId: new UniqueEntityId(),
		senderId: new UniqueEntityId(),
		status: 'completed',
		...override
	},
	id,
	)

	return transaction
}