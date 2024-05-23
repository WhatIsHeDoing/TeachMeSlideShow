import { randomArrayElement, randomNumberBetween } from "./random";

describe("randomNumberBetween", () => {
    it("returns a number within a positive range", () => {
        const min = 1;
        const max = 10;

        const actual = randomNumberBetween(min, max);

        expect(actual).toBeGreaterThanOrEqual(min);
        expect(actual).toBeLessThanOrEqual(max);
    });

    it("returns the bounded number when the range is identical", () => {
        const bound = 5;
        const actual = randomNumberBetween(bound, bound);
        expect(actual).toBe(bound);
    });

    it("handles negative numbers", () => {
        const min = -10;
        const max = -1;

        const actual = randomNumberBetween(min, max);

        expect(actual).toBeGreaterThanOrEqual(min);
        expect(actual).toBeLessThanOrEqual(max);
    });

    it("handles a mix of negative and positive numbers", () => {
        const min = -5;
        const max = 5;

        const actual = randomNumberBetween(min, max);

        expect(actual).toBeGreaterThanOrEqual(min);
        expect(actual).toBeLessThanOrEqual(max);
    });

    it("returns different numbers on subsequent calls", () => {
        const min = 1;
        const max = 10;

        const results = new Set(Array.from({ length: 100 }, (_x, _i) => randomNumberBetween(min, max)));

        // It is highly unlikely all 100 numbers will be the same.
        expect(results.size).toBeGreaterThan(1);
    });

    it("handles the maximum range", () => {
        const min = Number.MIN_SAFE_INTEGER;
        const max = Number.MAX_SAFE_INTEGER;

        const actual = randomNumberBetween(min, max);

        expect(actual).toBeGreaterThanOrEqual(min);
        expect(actual).toBeLessThanOrEqual(max);
    });
});

describe("randomArrayElement", () => {
    it("returns an element from the array", () => {
        const arr = [1, 2, 3, 4, 5];
        const actual = randomArrayElement(arr);
        expect(arr).toContain(actual);
    });

    it("returns undefined for an empty array", () => {
        const arr: any[] = [];
        const actual = randomArrayElement(arr);
        expect(actual).toBeUndefined();
    });

    it("return the only element in a single-element array", () => {
        const arr = [42];
        const actual = randomArrayElement(arr);
        expect(actual).toBe(42);
    });

    it("returns different elements on subsequent calls", () => {
        const array = Array.from({ length: 100 }, (_x, i) => i);

        const results = new Set(Array.from({ length: 100 }, (_x, _i) => randomArrayElement(array)));

        // It is highly unlikely all 100 numbers will be the same.
        expect(results.size).toBeGreaterThan(1);
    });
});
