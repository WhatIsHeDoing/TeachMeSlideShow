export const randomNumberBetween = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min);

export function randomArrayElement<T>(arr: T[]) {
    return arr[randomNumberBetween(0, arr.length - 1)];
}
