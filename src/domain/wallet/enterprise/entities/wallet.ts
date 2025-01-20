import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import Decimal from 'decimal.js'

export interface WalletProps {
  userId: UniqueEntityId
  balance:  Decimal
  updatedAt?: Date | null
}

export class Wallet extends Entity<WalletProps> {
	get userId() {
		return this.props.userId
	}

	get balance() {
		return this.props.balance
	}

	set balance(value: Decimal) {
		this.props.balance = value
		this.touch()
	}

	private touch() {
		this.props.updatedAt = new Date()
	}

	static create(
		props: WalletProps, 
		id?: UniqueEntityId
	) {
		const wallet = new Wallet(props, id)

		return wallet
	}
}