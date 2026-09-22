export class DomainError extends Error {
  constructor(public code: string, message: string, public status = 400, public fieldErrors: Array<{field:string;message:string}> = []) { super(message); }
}
