import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaWalletRepository } from './prisma/repositories/prisma-wallet-repository'
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository'
import { PrismaTransactionRepository } from './prisma/repositories/prisma-transaction-repository'
import { UserRepository } from '@/domain/wallet/application/repositories/user-repository'
import { TransactionRepository } from '@/domain/wallet/application/repositories/transaction-repository'
import { TransactionReversalRepository } from '@/domain/wallet/application/repositories/transaction-reversal-repository'
import { WalletRepository } from '@/domain/wallet/application/repositories/wallet-repository'
import { PrismaTransactionReversalRepository } from './prisma/repositories/prisma-transaction-reversal-repository'
import { DepositRepository } from '@/domain/wallet/application/repositories/deposit-repository'
import { PrismaDepositRepository } from './prisma/repositories/prisma-deposit-repository'

@Module({
	providers: [
		PrismaService,
		{
			provide: UserRepository,
			useClass: PrismaUserRepository
		},
		{
			provide: TransactionRepository,
			useClass: PrismaTransactionRepository
		},
		{
			provide: TransactionReversalRepository,
			useClass: PrismaTransactionReversalRepository
		},
		{
			provide: WalletRepository,
			useClass: PrismaWalletRepository
		},
		{
			provide: DepositRepository,
			useClass: PrismaDepositRepository
		},
	],
	exports: [
		PrismaService,
		UserRepository,
		TransactionRepository,
		TransactionReversalRepository,
		WalletRepository,
		DepositRepository
	],
})
export class DatabaseModule {}