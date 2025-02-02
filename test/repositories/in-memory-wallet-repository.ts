import { WalletRepository } from '@/domain/wallet/application/repositories/wallet-repository'
import { Wallet } from '@/domain/wallet/enterprise/entities/wallet'

export class InMemoryWalletRepository implements WalletRepository {
	public items: Wallet[] = []

	constructor() {}
	async findByUserId(userId: string) {
		const wallet = this.items.find(wallet => wallet.userId.toString() === userId)

		if(!wallet) {
			return null
		}

		return wallet
	}
	async save(wallet: Wallet){
		const itemIndex = this.items.findIndex((item) => item.id === wallet.id)

		this.items[itemIndex] = wallet
	}

	async create(wallet: Wallet) {
		this.items.push(wallet)
	}
}