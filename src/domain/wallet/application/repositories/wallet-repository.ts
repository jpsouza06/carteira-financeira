import { Wallet } from '../../enterprise/entities/wallet'

export interface WalletRepository {
  findByUserId(userId: string): Promise<Wallet | undefined>
  save(wallet: Wallet): Promise<void>
  create(wallet: Wallet): Promise<void>
}