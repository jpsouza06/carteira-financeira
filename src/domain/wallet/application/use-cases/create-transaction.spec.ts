import { InMemoryWalletRepository } from 'test/repositories/in-memory-wallet-repository'
import { CreateTransactionUseCase } from './create-transaction'
import { InMemoryTransactionRepository } from 'test/repositories/in-memory-transaction-reposoitory'
import { makeWallet } from 'test/factories/make-wallet'
import Decimal from 'decimal.js'

let inMemoryTransactionRepository: InMemoryTransactionRepository
let inMemoryWalletRepository: InMemoryWalletRepository
let sut: CreateTransactionUseCase

describe('Create Transaction', () => {
	beforeEach(() => {
		inMemoryTransactionRepository = new InMemoryTransactionRepository()
		inMemoryWalletRepository = new InMemoryWalletRepository()
		sut = new CreateTransactionUseCase(
			inMemoryTransactionRepository, 
			inMemoryWalletRepository
		)
	})

	test('should be able to create a transaction', async () => {
		const senderWallet = makeWallet({balance: new Decimal(150.27)})
		const receiverWallet = makeWallet({balance: new Decimal(50.80)})

		await inMemoryWalletRepository.create(senderWallet)
		await inMemoryWalletRepository.create(receiverWallet)

		const result = await sut.execute({
			amount: '100.00',
			senderId: senderWallet.id.toString(),
			receiverId: receiverWallet.id.toString(),
			status: 'completed'
		})
		console.log(inMemoryTransactionRepository.items[0].receiverId, receiverWallet.userId, inMemoryTransactionRepository.items[0].senderId, senderWallet.userId)
		expect(result.isRight()).toBe(true)
		expect(inMemoryTransactionRepository.items[0].receiverId).toEqual(receiverWallet.userId)
		expect(inMemoryTransactionRepository.items[0].senderId).toEqual(senderWallet.userId)

		expect(inMemoryWalletRepository.items[0].balance).toEqual(new Decimal(50.27))
		expect(inMemoryWalletRepository.items[1].balance).toEqual(new Decimal(150.80))
	})
})