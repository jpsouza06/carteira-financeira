import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { InMemoryWalletRepository } from 'test/repositories/in-memory-wallet-repository'
import { makeUser } from 'test/factories/make-user'
import Decimal from 'decimal.js'
import { makeWallet } from 'test/factories/make-wallet'
import { GetWalletByUserIdUseCase } from './get-wallet-by-user-id'

let inMemoryWalletRepository: InMemoryWalletRepository
let inMemoryUserRepository: InMemoryUserRepository
let sut: GetWalletByUserIdUseCase

describe('Create Wallet', () => {
	beforeEach(() => {
		inMemoryWalletRepository = new InMemoryWalletRepository()
		inMemoryUserRepository = new InMemoryUserRepository()
		sut = new GetWalletByUserIdUseCase(inMemoryWalletRepository)
	})

	test('should be able to get a wallet by userId', async () => {
		const balance = new Decimal(175.80)
		const user = makeUser()

		await inMemoryUserRepository.create(user)

		const wallet = makeWallet({
			userId: user.id,
			balance,
		})

		await inMemoryWalletRepository.create(wallet)
    
		const result = await sut.execute({
			userId: user.id.toString()
		})

		expect(result.isRight()).toBe(true)
		expect(inMemoryWalletRepository.items[0].balance).toEqual(balance)
	})
})