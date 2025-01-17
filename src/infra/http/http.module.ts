import { Module } from '@nestjs/common'
import { CreateAccountController } from './controllers/create-account.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateTransactionController } from './controllers/create-transacation.controller'
import { DatabaseModule } from '../database/database.module'

@Module({
	imports: [DatabaseModule],
	controllers: [
		CreateAccountController, 
		AuthenticateController, 
		CreateTransactionController
	],
	providers: []
})

export class HttpModule{}