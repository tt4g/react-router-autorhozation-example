type NonEmptyArray<T> = [T, ...T[]];
type ReadonlyNonEmptyArray<T> = ReadonlyArray<T> & NonEmptyArray<T>;

export type { NonEmptyArray, ReadonlyNonEmptyArray };
