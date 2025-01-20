import { DepositRepository } from '@/domain/wallet/application/repositories/deposit-repository'
import { Deposit } from '@/domain/wallet/enterprise/entities/deposit'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaDepositMapper } from '../mappers/prisma-deposit-mapper'

@Injectable()
export class PrismaDepositRepository implements DepositRepository {
	constructor(private prisma: PrismaService) {}

	async create(deposit: Deposit): Promise<void> {
		const data = PrismaDepositMapper.toPrisma(deposit)
        
		await this.prisma.deposit.create({
			data,
		})
	}
}