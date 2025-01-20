import { WalletRepository } from '@/domain/wallet/application/repositories/wallet-repository'
import { Wallet } from '@/domain/wallet/enterprise/entities/wallet'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaWalletMapper } from '../mappers/prisma-wallet-mapper'

@Injectable()
export class PrismaWalletRepository implements WalletRepository {
	constructor(private prisma: PrismaService) {}

	async findByUserId(userId: string): Promise<Wallet | null> {
		const wallet = await this.prisma.wallet.findUnique({
			where: {
				userId,
			}
		})

		if(!wallet){
			return null
		}

		return PrismaWalletMapper.toDomain(wallet)
	}
	async save(wallet: Wallet): Promise<void> {
		const data = PrismaWalletMapper.toPrisma(wallet)

		await this.prisma.wallet.update({
			where: {
				id: data.id
			},
			data,
		})
	}
  
	async create(wallet: Wallet): Promise<void> {
		const data = PrismaWalletMapper.toPrisma(wallet)

		await this.prisma.wallet.create({
			data,
		})
	}
}