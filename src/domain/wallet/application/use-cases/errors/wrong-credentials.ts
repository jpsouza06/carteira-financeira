import { UseCaseError } from '@/core/erros/use-case-error'

export class WrongCredentials extends Error implements UseCaseError {
	constructor() {
		super('Credentials are not valid.')
	}
}