import { Module } from '@nestjs/common'
import { CreateAccountController } from './controllers/create-account.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateTransactionController } from './controllers/create-transaction.controller'
import { DatabaseModule } from '../database/database.module'
import { CreateUserUseCase } from '@/domain/wallet/application/use-cases/create-user'
import { AuthenticateUserUseCase } from '@/domain/wallet/application/use-cases/authenticate-user'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { CreateTransactionUseCase } from '@/domain/wallet/application/use-cases/create-transaction'
import { CreateDepositController } from './controllers/create-deposit.controller'
import { CreateDepositUseCase } from '@/domain/wallet/application/use-cases/create-deposit'
import { CreateTransactionReversalController } from './controllers/create-transaction-reversal'
import { CreateTransactionReversalUseCase } from '@/domain/wallet/application/use-cases/create-transaction-reversal'

@Module({
	imports: [DatabaseModule, CryptographyModule],
	controllers: [
		CreateAccountController, 
		AuthenticateController, 
		CreateTransactionController,
		CreateDepositController,
		CreateTransactionReversalController
	],
	providers: [
		CreateUserUseCase, 
		AuthenticateUserUseCase, 
		CreateTransactionUseCase,
		CreateDepositUseCase,
		CreateTransactionReversalUseCase
	]
})

export class HttpModule{}