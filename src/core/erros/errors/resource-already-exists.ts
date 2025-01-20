import { UseCaseError } from '@/core/erros/use-case-error'

export class ResourceAlreadyExists extends Error implements UseCaseError {
	constructor(identifier = 'Resource') {
		super(`${identifier} already exists.`)
	}
}