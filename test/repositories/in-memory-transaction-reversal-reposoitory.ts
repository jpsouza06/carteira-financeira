import { TransactionReversalRepository } from '@/domain/wallet/application/repositories/transaction-reversal-repository'
import { TransactionReversal } from '@/domain/wallet/enterprise/entities/transaction-reversal'

export class InMemoryTransactionReversalRepository implements TransactionReversalRepository {
	public items: TransactionReversal[] = []

	constructor() {}
	async findByTransactionId(transactionId: string)  {
		const transactionReversal = this.items.find(transactionReversal => transactionReversal.id.toString() == transactionId)

		if(!transactionReversal) {
			return null
		}

		return transactionReversal
	}

	async create(transactionReversal: TransactionReversal) {
		this.items.push(transactionReversal)
	}
}