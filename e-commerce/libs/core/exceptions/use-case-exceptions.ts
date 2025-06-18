interface IUseCaseException {
    code: string;
    message: string;
}

export abstract class UseCaseException implements IUseCaseException {
    public readonly message: string;
    public readonly code: string;

    constructor(message: string, code: string = 'BAD_REQUEST') {
        this.message = message;
        this.code = code;
    }
}