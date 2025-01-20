import { UseCaseError } from '@/core/erros/use-case-error'

export class OnlyCompletedTransactions extends Error implements UseCaseError {
	constructor() {
		super('Only completed transactions can be reversed.')
	}
}