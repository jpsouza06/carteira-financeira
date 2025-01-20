import { UserRepository } from '@/domain/wallet/application/repositories/user-repository'
import { User } from '@/domain/wallet/enterprise/entities/user'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper'

@Injectable()
export class PrismaUserRepository implements UserRepository {
	constructor(private prisma: PrismaService) {}

	async findByEmail(email: string): Promise<User | null> {
		const user = await this.prisma.user.findUnique({
			where: {
				email: email,
			} 
		})
    
		if(!user){
			return null
		}
    
		return PrismaUserMapper.toDomain(user)
	}
  
	async findById(userId: string): Promise<User | null> {
		const user = await this.prisma.user.findUnique({
			where: {
				id: userId,
			}
		})
    
		if(!user){
			return null
		}
    
		return PrismaUserMapper.toDomain(user)
	}
	async create(user: User): Promise<void> {
		const data = PrismaUserMapper.toPrisma(user)
    
		await this.prisma.user.create({
			data,
		})
	}
}