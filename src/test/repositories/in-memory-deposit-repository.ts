import { DepositRepository } from '@/domain/wallet/application/repositories/deposit-repository'
import { Deposit } from '@/domain/wallet/enterprise/entities/deposit'

export class InMemoryDepositRepository implements DepositRepository {
	public items: Deposit[] = []

	constructor() {}
	async create(deposit: Deposit): Promise<void> {
		this.items.push(deposit)
	}


}