import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { CreateWalletUseCase } from './create-wallet'
import { InMemoryWalletRepository } from 'test/repositories/in-memory-wallet-repository'
import { makeUser } from 'test/factories/make-user'
import Decimal from 'decimal.js'
import { randomUUID } from 'crypto'
import { ResourceNotFoundError } from '@/core/erros/errors/resource-not-found-error'

let inMemoryWalletRepository: InMemoryWalletRepository
let inMemoryUserRepository: InMemoryUserRepository
let sut: CreateWalletUseCase

describe('Create Wallet', () => {
	beforeEach(() => {
		inMemoryWalletRepository = new InMemoryWalletRepository()
		inMemoryUserRepository = new InMemoryUserRepository()
		sut = new CreateWalletUseCase(inMemoryWalletRepository, inMemoryUserRepository)
	})

	test('should be able to create a wallet', async () => {
		const user = makeUser()

		await inMemoryUserRepository.create(user)
    
		const result = await sut.execute({
			userId: user.id.toString()
		})

		expect(result.isRight()).toBe(true)
		expect(inMemoryWalletRepository.items[0].userId).toEqual(user.id)
		expect(inMemoryWalletRepository.items[0].balance).toEqual(new Decimal(0.00))
	})

	test('should not be able to create a wallet with an user that does not exist', async () => {    
		const result = await sut.execute({
			userId: randomUUID()
		})

		expect(result.isLeft()).toBe(true)
		expect(result.value).toBeInstanceOf(ResourceNotFoundError)
	})
})