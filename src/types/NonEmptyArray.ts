type NonEmptyArray<T> = [T, ...T[]];
type ReadonlyNonEmptyArray<T> = ReadonlyArray<T> & NonEmptyArray<T>;

const isNonEmptyArray = <T>(
  array: T[] | ReadonlyArray<T>
): array is NonEmptyArray<T> => {
  return array.length > 0;
};

export { isNonEmptyArray };
export type { NonEmptyArray, ReadonlyNonEmptyArray };
