import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import Decimal from 'decimal.js'

export interface DepositProps {
  origin: string
  walletId: UniqueEntityId
  receiverId: UniqueEntityId
  amount:  Decimal
}

export class Deposit extends Entity<DepositProps> {
	get origin() {
		return this.props.origin
	}

	get walletId() {
		return this.props.walletId
	}

	get receiverId() {
		return this.props.receiverId
	}

	get amount() {
		return this.props.amount
	}

	static create(
		props: DepositProps, 
		id?: UniqueEntityId
	) {
		const deposit = new Deposit(props, id)

		return deposit
	}
}