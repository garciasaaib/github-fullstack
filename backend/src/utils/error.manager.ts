export class ErrorManager extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ErrorManager';
  }
}