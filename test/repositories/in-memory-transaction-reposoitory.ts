import { TransactionRepository } from '@/domain/wallet/application/repositories/transaction-repository'
import { Transaction } from '@/domain/wallet/enterprise/entities/transaction'

export class InMemoryTransactionRepository implements TransactionRepository {
	public items: Transaction[] = []

	constructor() {}
	async findById(id: string) {
		const transaction = this.items.find(transaction => transaction.id.toString() == id)
		return transaction
	}
	async findManyByUserId(transactionId: string)  {
		const transaction = this.items.filter(transaction => transaction.id.toString() == transactionId)
		return transaction
	}

	async save(transaction: Transaction){
		const itemIndex = this.items.findIndex((item) => item.id === transaction.id)
	
		this.items[itemIndex] = transaction
	}

	async create(transaction: Transaction) {
		this.items.push(transaction)
	}
}