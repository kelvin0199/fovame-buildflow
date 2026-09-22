import { Injectable } from '@nestjs/common';
import { DomainError } from './domain-error';
@Injectable()
export class IdempotencyService {
  require(key?:string){ if(!key?.trim()) throw new DomainError('IDEMPOTENCY_KEY_REQUIRED','Idempotency-Key is required for this operation.',400); return key.trim(); }
}
