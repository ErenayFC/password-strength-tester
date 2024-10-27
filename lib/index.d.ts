/**
 * Module for checking and scoring password strength
 * @module password-strength-tester
 */
/**
 * Password strength levels
 * @private
 */
declare const STRENGTH_LEVELS: {
    readonly VERY_STRONG: {
        readonly min: 90;
        readonly text: "Very Strong";
    };
    readonly STRONG: {
        readonly min: 70;
        readonly text: "Strong";
    };
    readonly MEDIUM: {
        readonly min: 50;
        readonly text: "Medium";
    };
    readonly WEAK: {
        readonly min: 30;
        readonly text: "Weak";
    };
    readonly VERY_WEAK: {
        readonly min: 0;
        readonly text: "Very Weak";
    };
};
type StrengthLevel = (typeof STRENGTH_LEVELS)[keyof typeof STRENGTH_LEVELS]["text"];
interface PasswordStrengthResult {
    strength: StrengthLevel;
    score: number;
    suggestion?: string;
}
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
/**
 * Checks and scores password strength
 * @param {string} password - Password to check
 * @returns {PasswordStrengthResult} Password strength result
 */
declare const check: (password: string) => PasswordStrengthResult;
/**
 * Generates a strong password with custom configuration
 * @param {PasswordConfig} config - Password generation configuration
 * @returns {string} Generated strong password
 */
declare function generateStrongPassword(config?: PasswordConfig): string;
export { check, generateStrongPassword };
//# sourceMappingURL=index.d.ts.map