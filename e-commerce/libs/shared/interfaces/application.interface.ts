export interface InputDto {}

export interface OutputDto {}

export interface IUsecaseQuery<
    Input,
    Output extends OutputDto,
> {
    query(
        filterQuery: Input,
        options?: unknown,
    ): Output | Promise<Output>;
}

export interface IUsecaseExecute<Input, Output extends OutputDto> {
    execute(
        input: Input,
        options?: unknown,
    ): Output | Output[] | Promise<Output> | Promise<Output[]> | void | Promise<void>;
}