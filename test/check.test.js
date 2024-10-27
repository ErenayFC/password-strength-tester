const { check } = require('../lib/index');

describe('Password Strength Checker', () => {
  test('should throw error for empty password', () => {
    expect(() => check('')).toThrow('Password is required');
  });

  test('should return very weak for simple passwords', () => {
    const result = check('123456');
    expect(result.strength).toBe('Very Weak');
    expect(result.score).toBeLessThan(30);
    expect(result.suggestion).toBeDefined();
  });

  test('should return weak for simple passwords with letters', () => {
    const result = check('password');
    expect(result.strength).toBe('Weak');
    expect(result.score).toBeLessThan(50);
    expect(result.suggestion).toBeDefined();
  });

  test('should return medium for mixed case and numbers', () => {
    const result = check('Password123');
    expect(result.strength).toBe('Medium');
    expect(result.score).toBeGreaterThanOrEqual(50);
    expect(result.score).toBeLessThan(70);
  });

  test('should return strong for complex passwords', () => {
    const result = check('Password123!');
    expect(result.strength).toBe('Strong');
    expect(result.score).toBeGreaterThanOrEqual(70);
    expect(result.score).toBeLessThan(90);
  });

  test('should return very strong for very complex passwords', () => {
    const result = check('P@ssw0rd!2024$XyZ');
    expect(result.strength).toBe('Very Strong');
    expect(result.score).toBeGreaterThanOrEqual(90);
  });

  test('should penalize consecutive characters', () => {
    const result = check('Password123456');
    expect(result.score).toBeLessThan(check('Password847293').score);
  });

  test('should penalize sequential letters', () => {
    const result = check('Passwordabcdef');
    expect(result.score).toBeLessThan(check('PasswordKxMnPq').score);
  });
});
