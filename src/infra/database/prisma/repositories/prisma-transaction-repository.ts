import { TransactionRepository } from '@/domain/wallet/application/repositories/transaction-repository'
import { Transaction } from '@/domain/wallet/enterprise/entities/transaction'
import { Injectable } from '@nestjs/common'
import { PrismaTransactionMapper } from '../mappers/prisma-transaction-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaTransactionRepository implements TransactionRepository {
	constructor(private prisma: PrismaService) {}

	async findById(id: string): Promise<Transaction | null> {
		const transaction = await this.prisma.transaction.findUnique({
			where: {
				id,
			}
		})
				
		if(!transaction){
			return null
		}
				
		return PrismaTransactionMapper.toDomain(transaction)
	}
	async save(transaction: Transaction): Promise<void> {
		const data = PrismaTransactionMapper.toPrisma(transaction)
				
		await this.prisma.transaction.update({
			where: {
				id: transaction.id.toString()
			},
			data,
		})
	}
	async create(transaction: Transaction): Promise<void> {
		const data = PrismaTransactionMapper.toPrisma(transaction)
				
		await this.prisma.transaction.create({
			data,
		})
	}
}