import { TransactionRepository } from '@/domain/wallet/application/repositories/transaction-repository'
import { Transaction } from '@/domain/wallet/enterprise/entities/transaction'

export class InMemoryTransactionRepository implements TransactionRepository {
	public items: Transaction[] = []

	constructor() {}
	async findManyByUserId(transactionId: string)  {
		const transaction = this.items.filter(transaction => transaction.id.toString() == transactionId)
		return transaction
	}

	async create(transaction: Transaction) {
		this.items.push(transaction)
	}
}