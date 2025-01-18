import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import Decimal from 'decimal.js'

export interface TransactionProps {
  amount: Decimal
  receiverId: UniqueEntityId
  senderId: UniqueEntityId
  status: 'pending' | 'completed' | 'reversed'
	updatedAt?: Date
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

	get status() {
		return this.props.status
	}

	set status(status: 'pending' | 'completed' | 'reversed') {
		this.props.status = status
		this.touch()
	}

	private touch() {
		this.props.updatedAt = new Date()
	}


	static create(
		props: TransactionProps, 
		id?: UniqueEntityId
	) {
		const transaction = new Transaction(props, id)

		return transaction
	}
}