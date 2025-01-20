import { TransactionReversalRepository } from '@/domain/wallet/application/repositories/transaction-reversal-repository'
import { TransactionReversal } from '@/domain/wallet/enterprise/entities/transaction-reversal'
import { Injectable } from '@nestjs/common'
import { PrismaTransactionReversalMapper } from '../mappers/prisma-transaction-reversal-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaTransactionReversalRepository implements TransactionReversalRepository {
	constructor(private prisma: PrismaService) {}

	async findByTransactionId(transactionId: string): Promise<TransactionReversal | null> {
		const transactionReversal = await this.prisma.transactionReversal.findUnique({
			where: {
				transactionId: transactionId,
			}
		})
				
		if(!transactionReversal){
			return null
		}
				
		return PrismaTransactionReversalMapper.toDomain(transactionReversal)
	}
	async create(transactionReversal: TransactionReversal): Promise<void> {
		const data = PrismaTransactionReversalMapper.toPrisma(transactionReversal)
				
		await this.prisma.transactionReversal.create({
			data,
		})
	}
}