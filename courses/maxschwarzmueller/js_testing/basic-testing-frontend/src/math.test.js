// test documentation - https://vitest.dev/api/
import { it, expect } from "vitest";
import { add } from "./math";

it("should summarize all number values in an array", () => {
  // AAA Pattern
  // Arrange
  const numbers = [1, 2];

  // Act
  const result = add(numbers);

  // Assert
  const expectedResult = numbers.reduce(
    (prevValue, curValue) => prevValue + curValue,
    0
  );
  expect(result).toBe(expectedResult);
});

it("should yield Nan if atleast one invalid number is provided", () => {
  const inputs = ["invalid", 1];

  const result = add(inputs);

  expect(result).toBeNaN();
});

it("should yield 0 if an empty array is provided", () => {
  const numbers = [];
  const result = add(numbers);
  expect(result).toBe(0);
});

it("should throw an error if no value is passed into the function", () => {
  const resultFn = () => {
    add();
  };
  // not an error example
  // expect(resultFn).not.toThrow();
  // error example
  expect(resultFn).toThrow();
});
it("should throw an error if provided with multiple arguments instead of array", () => {
  const num1 = 1;
  const num2 = 2;

  const resultFn = () => {
    add(num1, num2);
  };

  expect(resultFn).toThrow();
});
