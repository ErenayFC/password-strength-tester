declare module "password-strength-tester" {
  interface CharacterCounts {
    upper?: number;
    lower?: number;
    numbers?: number;
    special?: number;
  }

  interface PasswordConfig {
    length?: number;
    charCounts?: CharacterCounts;
  }

  interface PasswordStrengthResult {
    strength: "Very Strong" | "Strong" | "Medium" | "Weak" | "Very Weak";
    score: number;
    suggestion?: string;
  }

  export function check(password: string): PasswordStrengthResult;
  export function generateStrongPassword(config?: PasswordConfig): string;
}
