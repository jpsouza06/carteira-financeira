import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ApiProperty } from '@nestjs/swagger'
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

	@ApiProperty({ example: '155f18ac-57a6-4266-a399-78156bc7d038', description: 'Id do usuário que vai receber a transfêrencia', type: String })
	get receiverId() {
		return this.props.receiverId
	}

	@ApiProperty({ example: '100.00', description: 'Valor da transfêrencia', type: String })
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