import { CreateDepositUseCase } from './create-deposit'
import { makeWallet } from 'test/factories/make-wallet'
import { InMemoryWalletRepository } from 'test/repositories/in-memory-wallet-repository'
import { InMemoryDepositRepository } from 'test/repositories/in-memory-deposit-repository'
import Decimal from 'decimal.js'

let inMemoryDepositRepository: InMemoryDepositRepository
let inMemoryWalletRepository: InMemoryWalletRepository
let sut: CreateDepositUseCase

describe('Create Deposit', () => {
	beforeEach(() => {
		inMemoryDepositRepository = new InMemoryDepositRepository()
		inMemoryWalletRepository = new InMemoryWalletRepository()
		sut = new CreateDepositUseCase(inMemoryDepositRepository, inMemoryWalletRepository)
	})

	test('should be able to create a deposit', async () => {
		const wallet = makeWallet()

		await inMemoryWalletRepository.create(wallet)
    
		const result = await sut.execute({
			origin: 'Deposito via boleto',
			amount: '100.50',
			userId: wallet.userId.toString()
		})

		expect(result.isRight()).toBe(true)
		expect(result.value).toEqual({
			deposit: inMemoryDepositRepository.items[0]
		})
    
	})

	test('should be able to add a balance to the wallet', async () => {
		const wallet = makeWallet({balance: new Decimal('100.25')})

		await inMemoryWalletRepository.create(wallet)
    
		const result = await sut.execute({
			origin: 'Deposito via boleto',
			amount: '100.50',
			userId: wallet.userId.toString()
		})

		expect(result.isRight()).toBe(true)
		expect(inMemoryWalletRepository.items[0].balance).toEqual(new Decimal('200.75'))
	})
})