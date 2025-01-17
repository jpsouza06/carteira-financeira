import { CreateUserUseCase } from './create-user'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'

let inMemoryUserRepository: InMemoryUserRepository
let sut: CreateUserUseCase

describe('Create User', () => {
	beforeEach(() => {
		inMemoryUserRepository = new InMemoryUserRepository()
		sut = new CreateUserUseCase(inMemoryUserRepository)
	})

	test('should be able to create a user', async () => {
		const result = await sut.execute({
			name: 'Fulano',
			email: 'fulano@teste.com',
			password: '123456'
		})

		expect(result.isRight()).toBe(true)
		expect(inMemoryUserRepository.items[0]).toEqual(result.value?.user)
	})
})