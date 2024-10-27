const { generateStrongPassword } = require('../lib/index');

describe('Password Generator', () => {
  test('should generate password with default configuration', () => {
    const password = generateStrongPassword();
    expect(password).toHaveLength(9);
    expect(password).toMatch(/[A-Z]/);
    expect(password).toMatch(/[a-z]/);
    expect(password).toMatch(/[0-9]/);
    expect(password).toMatch(/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/);
  });

  test('should generate password with custom length', () => {
    const password = generateStrongPassword({ length: 16 });
    expect(password).toHaveLength(16);
  });

  test('should generate password with only uppercase and numbers', () => {
    const password = generateStrongPassword({
      length: 10,
      charCounts: {
        upper: 5,
        lower: 0,
        numbers: 5,
        special: 0
      }
    });
    expect(password).toHaveLength(10);
    expect(password).toMatch(/^[A-Z0-9]+$/);
    expect(password).not.toMatch(/[a-z]/);
    expect(password).not.toMatch(/[^A-Z0-9]/);
  });

  test('should generate password with only lowercase', () => {
    const password = generateStrongPassword({
      length: 8,
      charCounts: {
        upper: 0,
        lower: 8,
        numbers: 0,
        special: 0
      }
    });
    expect(password).toHaveLength(8);
    expect(password).toMatch(/^[a-z]+$/);
  });

  test('should throw error when total chars exceed length', () => {
    expect(() => generateStrongPassword({
      length: 5,
      charCounts: {
        upper: 2,
        lower: 2,
        numbers: 2,
        special: 2
      }
    })).toThrow('Total character counts cannot exceed password length');
  });

  test('should fill remaining length with allowed characters', () => {
    const password = generateStrongPassword({
      length: 12,
      charCounts: {
        upper: 2,
        lower: 2,
        numbers: 2,
        special: 0
      }
    });
    expect(password).toHaveLength(12);
    expect(password).not.toMatch(/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/);
  });

  test('should generate different passwords each time', () => {
    const password1 = generateStrongPassword();
    const password2 = generateStrongPassword();
    expect(password1).not.toBe(password2);
  });
});
