export default function asArray<T>(args: T | T[]): T[] {
  return ([] as T[]).concat(args);
}
