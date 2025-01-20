import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ApiProperty } from '@nestjs/swagger'

interface TransactionReversalProps {
  transactionId: UniqueEntityId
  reason: string
}

export class TransactionReversal extends Entity<TransactionReversalProps> {
	@ApiProperty({ example: '155f18ac-57a6-4266-a399-78156bc7d038', description: 'Id da transfêrencia', type: String })
	get transactionId() {
		return this.props.transactionId
	}

	@ApiProperty({ example: 'Refound', description: 'Razão para reverter a transacação', type: String })
	get reason() {
		return this.props.reason
	}
  
	static create(
		props: TransactionReversalProps, 
		id?: UniqueEntityId
	) {
		const transactionreversal = new TransactionReversal(props, id)

		return transactionreversal
	}
}