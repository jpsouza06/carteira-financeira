import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { HashComparer } from '../cryptography/hash-comparer'
import { WrongCredentials } from './errors/wrong-credentials'
import { UserRepository } from '../repositories/user-repository'
import { Encrypter } from '../cryptography/encrypter'

interface AuthenticateUserUseCaseRequest {
  email: string
  password: string
}

type AuthenticateUserUseCaseResponse = Either<
  WrongCredentials,
   {
      accessToken: string
   }
>

@Injectable()
export class AuthenticateUserUseCase {
	constructor(
    private userRepository: UserRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter
	) {}
	async execute  (
		{
			email,
			password
		}: AuthenticateUserUseCaseRequest
	): Promise<AuthenticateUserUseCaseResponse> {
		const user = await this.userRepository.findByEmail(email)

		if(!user) {
			return left(new WrongCredentials())
		}

		const isPasswordValid = await this.hashComparer.compare(
			password, 
			user.password
		)

		if(!isPasswordValid) {
			return left(new WrongCredentials())
		}

		const accessToken = await this.encrypter.encrypt({ sub: user.id.toString() })

		return right({
			accessToken,
		})
	}
}