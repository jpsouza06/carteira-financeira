import { Wallet } from '../../enterprise/entities/wallet'

export abstract class WalletRepository {
  abstract findByUserId(userId: string): Promise<Wallet | null>
  abstract save(wallet: Wallet): Promise<void>
  abstract create(wallet: Wallet): Promise<void>
}