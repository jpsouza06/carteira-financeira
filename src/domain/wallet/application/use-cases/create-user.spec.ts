import { makeUser } from 'test/factories/make-user'
import { CreateUserUseCase } from './create-user'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { ResourceAlreadyExists } from '@/core/erros/errors/resource-already-exists'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryWalletRepository } from 'test/repositories/in-memory-wallet-repository'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryWalletRepository: InMemoryWalletRepository
let fakeHasher: FakeHasher
let sut: CreateUserUseCase

describe('Create User', () => {
	beforeEach(() => {
		inMemoryUserRepository = new InMemoryUserRepository()
		inMemoryWalletRepository = new InMemoryWalletRepository()
		fakeHasher = new FakeHasher()
		sut = new CreateUserUseCase(
			inMemoryUserRepository, 
			inMemoryWalletRepository, 
			fakeHasher
		)
	})

	test('should be able to create a user', async () => {
		const result = await sut.execute({
			name: 'Fulano',
			email: 'fulano@teste.com',
			password: '123456'
		})

		expect(result.isRight()).toBe(true)
		expect(result.value).toEqual({
			user: inMemoryUserRepository.items[0]
		})
	})

	test('should not be able to create a user with email that already exists', async () => {
		const user = makeUser()

		await inMemoryUserRepository.create(user)

		const result = await sut.execute({
			name: 'Fulano',
			email: user.email,
			password: '123456'
		})

		expect(result.isLeft()).toBe(true)
		expect(result.value).toBeInstanceOf(ResourceAlreadyExists)
	})

	test('should hash student password upon registration', async () => {
		const result = await sut.execute({
			name: 'Fulano',
			email: 'fulano@teste.com',
			password: '123456'
		})

		const hashedPassword = await fakeHasher.hash('123456')

		expect(result.isRight()).toBe(true)
		expect(inMemoryUserRepository.items[0].password).toEqual(hashedPassword)
	})

	test('wallet must be created for the user', async () => {
		const result = await sut.execute({
			name: 'Fulano',
			email: 'fulano@teste.com',
			password: '123456'
		})

		const hashedPassword = await fakeHasher.hash('123456')

		expect(result.isRight()).toBe(true)
		expect(inMemoryUserRepository.items[0].password).toEqual(hashedPassword)
		expect(result.value).toMatchObject({
			user: {
				id: inMemoryWalletRepository.items[0].userId,
			},
		})

	})
})