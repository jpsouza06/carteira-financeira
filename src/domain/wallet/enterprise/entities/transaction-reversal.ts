import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface TransactionReversalProps {
  transactionId: UniqueEntityId
  reason: string
}

export class TransactionReversal extends Entity<TransactionReversalProps> {
	get transactionId() {
		return this.props.transactionId
	}
  
	static create(
		props: TransactionReversalProps, 
		id?: UniqueEntityId
	) {
		const transactionreversal = new TransactionReversal(props, id)

		return transactionreversal
	}
}