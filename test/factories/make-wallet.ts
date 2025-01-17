import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Wallet, WalletProps } from '@/domain/wallet/enterprise/entities/wallet'
import Decimal from 'decimal.js'

export function makeWallet(
	override: Partial<WalletProps> = {},
	id?: UniqueEntityId,
) {
	const wallet = Wallet.create({
		balance: new Decimal(faker.number.float()),
		userId: new UniqueEntityId(),
		...override
	},
	id,
	)

	return wallet
}