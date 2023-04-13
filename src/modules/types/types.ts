type Truthy<T> = T extends false | "" | 0 | null | undefined ? never : T;
export const isTruthy = <T>(x: T): x is Truthy<T> => Boolean(x);
