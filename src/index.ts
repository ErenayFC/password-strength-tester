/**
 * Module for checking and scoring password strength
 * @module password-strength-tester
 */

/**
 * Password character sets
 * @private
 */
const CHAR_SETS = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  special: "!@#$%^&*()_+-=[]{}|;:,.<>?",
} as const;

/**
 * Scoring rules
 * @private
 */
const SCORING_RULES = {
  minLength: {
    score: 15,
    threshold: 8,
  },
  extraLength: {
    score: 10,
    threshold: 12,
  },
  upperCase: {
    oneChar: 15,
    multipleChars: 5,
    threshold: 2,
  },
  lowerCase: {
    oneChar: 10,
    multipleChars: 5,
    threshold: 3,
  },
  numbers: {
    oneChar: 10,
    multipleChars: 5,
    threshold: 2,
  },
  special: {
    oneChar: 5,
    multipleChars: 5,
    threshold: 2,
  },
  allTypes: 15,
  consecutive: -10,
} as const;

/**
 * Password strength levels
 * @private
 */
const STRENGTH_LEVELS = {
  VERY_STRONG: { min: 90, text: "Very Strong" },
  STRONG: { min: 70, text: "Strong" },
  MEDIUM: { min: 50, text: "Medium" },
  WEAK: { min: 30, text: "Weak" },
  VERY_WEAK: { min: 0, text: "Very Weak" },
} as const;

type StrengthLevel =
  (typeof STRENGTH_LEVELS)[keyof typeof STRENGTH_LEVELS]["text"];

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
 * Counts characters
 * @private
 * @param {string} password - Password to check
 * @param {RegExp} regex - Character regex
 * @returns {number} Character count
 */
const countCharacters = (password: string, regex: RegExp): number =>
  (password.match(regex) || []).length;

/**
 * Checks and scores password strength
 * @param {string} password - Password to check
 * @returns {PasswordStrengthResult} Password strength result
 */
const check = (password: string): PasswordStrengthResult => {
  if (!password) throw new TypeError("Password is required");
  let score = 0;

  if (password.length >= SCORING_RULES.minLength.threshold) {
    score += SCORING_RULES.minLength.score;
    if (password.length >= SCORING_RULES.extraLength.threshold) {
      score += SCORING_RULES.extraLength.score;
    }
  }

  const charCounts = {
    upper: countCharacters(password, /[A-Z]/g),
    lower: countCharacters(password, /[a-z]/g),
    numbers: countCharacters(password, /[0-9]/g),
    special: countCharacters(password, /[^\w\s]/g),
  };

  if (charCounts.upper >= 1) {
    score += SCORING_RULES.upperCase.oneChar;
    if (charCounts.upper >= SCORING_RULES.upperCase.threshold) {
      score += SCORING_RULES.upperCase.multipleChars;
    }
  }

  if (charCounts.lower >= 1) {
    score += SCORING_RULES.lowerCase.oneChar;
    if (charCounts.lower >= SCORING_RULES.lowerCase.threshold) {
      score += SCORING_RULES.lowerCase.multipleChars;
    }
  }

  if (charCounts.numbers >= 1) {
    score += SCORING_RULES.numbers.oneChar;
    if (charCounts.numbers >= SCORING_RULES.numbers.threshold) {
      score += SCORING_RULES.numbers.multipleChars;
    }
  }

  if (charCounts.special >= 1) {
    score += SCORING_RULES.special.oneChar;
    if (charCounts.special >= SCORING_RULES.special.threshold) {
      score += SCORING_RULES.special.multipleChars;
    }
  }

  if (/(?:012|123|234|345|456|567|678|789)/.test(password)) {
    score += SCORING_RULES.consecutive;
  }
  if (
    /(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|rst|stu|tuv|uvw|vwx|wxy|xyz)/i.test(
      password
    )
  ) {
    score += SCORING_RULES.consecutive;
  }

  if (
    charCounts.upper &&
    charCounts.lower &&
    charCounts.numbers &&
    charCounts.special
  ) {
    score += SCORING_RULES.allTypes;
  }

  score = Math.min(Math.max(score, 0), 100);

  let strength: StrengthLevel = STRENGTH_LEVELS.VERY_WEAK.text;
  for (const level of Object.values(STRENGTH_LEVELS)) {
    if (score >= level.min) {
      strength = level.text;
      break;
    }
  }

  if (score < STRENGTH_LEVELS.MEDIUM.min) {
    return {
      strength,
      score,
      suggestion: generateStrongPassword(),
    };
  }

  return { strength, score };
};

/**
 * Generates a strong password with custom configuration
 * @param {PasswordConfig} config - Password generation configuration
 * @returns {string} Generated strong password
 */
function generateStrongPassword(config: PasswordConfig = {}): string {
  const defaultConfig = {
    length: 9,
    charCounts: {
      upper: 2,
      lower: 3,
      numbers: 2,
      special: 2,
    },
  };

  const finalConfig = {
    length: config.length || defaultConfig.length,
    charCounts: {
      ...defaultConfig.charCounts,
      ...config.charCounts,
    },
  };

  const totalChars = Object.values(finalConfig.charCounts).reduce(
    (a, b) => a + b,
    0
  );
  if (totalChars > finalConfig.length) {
    throw new Error("Total character counts cannot exceed password length");
  }

  let password = "";

  const addRandomChars = (charSet: string, count: number): void => {
    for (let i = 0; i < count; i++) {
      password += charSet[Math.floor(Math.random() * charSet.length)];
    }
  };

  if (finalConfig.charCounts.upper > 0) {
    addRandomChars(CHAR_SETS.upper, finalConfig.charCounts.upper);
  }
  if (finalConfig.charCounts.lower > 0) {
    addRandomChars(CHAR_SETS.lower, finalConfig.charCounts.lower);
  }
  if (finalConfig.charCounts.numbers > 0) {
    addRandomChars(CHAR_SETS.numbers, finalConfig.charCounts.numbers);
  }
  if (finalConfig.charCounts.special > 0) {
    addRandomChars(CHAR_SETS.special, finalConfig.charCounts.special);
  }

  const remainingLength = finalConfig.length - password.length;
  if (remainingLength > 0) {
    const allowedSets = Object.entries(CHAR_SETS)
      .filter(
        ([key]) => finalConfig.charCounts[key as keyof CharacterCounts] > 0
      )
      .map(([_, value]) => value)
      .join("");

    if (allowedSets.length === 0) {
      addRandomChars(CHAR_SETS.lower, remainingLength);
    } else {
      addRandomChars(allowedSets, remainingLength);
    }
  }

  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

export { check, generateStrongPassword };
