import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { FakerEncrypter } from 'test/cryptography/fake-encrypter'
import { AuthenticateUserUseCase } from './authenticate-user'
import { makeUser } from 'test/factories/make-user'

let inMemoryUserRepository: InMemoryUserRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakerEncrypter

let sut: AuthenticateUserUseCase

describe('User Authenticate', () => {
	beforeEach(() => {
		inMemoryUserRepository = new InMemoryUserRepository()
		fakeHasher = new FakeHasher()
		fakeEncrypter = new FakerEncrypter()
		sut = new AuthenticateUserUseCase(
			inMemoryUserRepository, 
			fakeHasher, 
			fakeEncrypter
		)
	})

	test('should be able to authenticate a user', async () => {
		const user = makeUser({
			email: 'fulano@teste.com',
			password: await fakeHasher.hash('123456')
		})

		inMemoryUserRepository.create(user)
    
		const result = await sut.execute({
			email: 'fulano@teste.com',
			password: '123456'
		})

		expect(result.isRight()).toBe(true)
		expect(result.value).toEqual({
			accessToken: expect.any(String)
		})
	})
})