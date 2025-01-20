import { InMemoryWalletRepository } from 'test/repositories/in-memory-wallet-repository'
import { makeWallet } from 'test/factories/make-wallet'
import { UpdateWalletUseCase } from './update-wallet'
import Decimal from 'decimal.js'

let inMemoryWalletRepository: InMemoryWalletRepository
let sut: UpdateWalletUseCase

describe('Update Wallet', () => {
	beforeEach(() => {
		inMemoryWalletRepository = new InMemoryWalletRepository()
		sut = new UpdateWalletUseCase(inMemoryWalletRepository)
	})

	test('should be able to update an wallet', async () => {
		const balance = '175.80'

		const wallet = makeWallet({})

		await inMemoryWalletRepository.create(wallet)

		const result = await sut.execute({
			userId: wallet.userId.toString(),
			balance,
		})

		expect(result.isRight()).toBe(true)
		expect(inMemoryWalletRepository.items[0].balance.equals(new Decimal(balance))).toBe(true)
	})
})