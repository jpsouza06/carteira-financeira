import { UseCaseError } from '@/core/erros/use-case-error'

export class NotEnoughBalanceError extends Error implements UseCaseError {
	constructor() {
		super('Not enough balance.')
	}
}