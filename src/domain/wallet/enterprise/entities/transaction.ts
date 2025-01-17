import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import Decimal from 'decimal.js'

interface TransactionProps {
  amount: Decimal
  receiverId: UniqueEntityId
  senderId: UniqueEntityId
  status: 'pending' | 'completed' | 'reversed'
}

export class Transaction extends Entity<TransactionProps> {
	get senderId() {
		return this.props.senderId
	}

	get receiverId() {
		return this.props.receiverId
	}

	get amount() {
		return this.props.amount
	}

	static create(
		props: TransactionProps, 
		id?: UniqueEntityId
	) {
		const transaction = new Transaction(props, id)

		return transaction
	}
}