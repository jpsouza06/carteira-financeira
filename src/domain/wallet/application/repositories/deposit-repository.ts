import { Deposit } from '../../enterprise/entities/deposit'

export abstract class DepositRepository {
  abstract create(deposit: Deposit): Promise<void>
}