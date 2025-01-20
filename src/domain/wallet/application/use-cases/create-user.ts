import { Either, left, right } from '@/core/either'
import { UserRepository } from '../repositories/user-repository'
import { User } from '../../enterprise/entities/user'
import { Injectable } from '@nestjs/common'
import { ResourceAlreadyExists } from '@/core/erros/errors/resource-already-exists'
import { HashGenerator } from '../cryptography/hash-generator'
import { WalletRepository } from '../repositories/wallet-repository'
import { Wallet } from '../../enterprise/entities/wallet'
import Decimal from 'decimal.js'

interface CreateUserUseCaseRequest {
  name: string
  email: string
  password: string
}

type CreateUserUseCaseResponse = Either<
	ResourceAlreadyExists,
   {
      user: User
   }
>

@Injectable()
export class CreateUserUseCase {
	constructor(
    private usersRepository: UserRepository,
		private walletRepository: WalletRepository,
		private hashGenerator: HashGenerator
	) {}
	async execute  (
		{
			name,
			email,
			password
		}: CreateUserUseCaseRequest
	): Promise<CreateUserUseCaseResponse> {
		const userWithSameEmail = await this.usersRepository.findByEmail(email)

		if(userWithSameEmail) {
			return left(new ResourceAlreadyExists(`User "${email}"`))
		}

		const hashedPassword = await this.hashGenerator.hash(password)

		const user = User.create({
			name,
			email,
			password : hashedPassword  
		})

		await this.usersRepository.create(user)

		const wallet = Wallet.create({
			userId: user.id,
			balance: new Decimal(0.00)
		})

		await this.walletRepository.create(wallet)

		return right({
			user,
		})
	}
}