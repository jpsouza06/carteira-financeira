// Stubs de Criptografia

import { Encrypter } from '@/domain/wallet/application/cryptography/encrypter'

export class FakerEncrypter implements Encrypter {
	async encrypt(payload: Record<string, unknown>): Promise<string> {
		return JSON.stringify(payload)
	}

}