# Password Strength Tester

A powerful and customizable password strength checker and generator for Node.js applications. This module provides both password strength validation and customizable password generation capabilities.

## Features

- 🔒 Comprehensive password strength checking
- 🎯 Customizable password generation
- 📊 Detailed strength scoring system
- 🔄 Multiple character sets support
- 📝 TypeScript support
- 🚀 Zero dependencies
- ⚡ Lightweight and fast
- 🧪 Well-tested

## Installation

```bash
npm install password-strength-generator
```

## Usage

```javascript
const { check, generateStrongPassword } = require('password-strength-generator');

// Check password strength
const strengthResult = check('MyPassword123!');
console.log(strengthResult);
// Output: { strength: 'Strong', score: 85 }

// Generate a password with default settings
const password = generateStrongPassword();
console.log(password);
// Output: "Kx7#mN!9p"
```

## Password Strength Checking

The `check` function evaluates passwords based on multiple criteria:

```javascript
const result = check('YourPassword123!');
console.log(result);
```

Returns an object with:

- `strength`: Text representation of password strength
- `score`: Numerical score (0-100)
- `suggestion`: Generated password suggestion (only for weak passwords)

### Strength Levels

- Very Strong (90-100)
- Strong (70-89)
- Medium (50-69)
- Weak (30-49)
- Very Weak (0-29)

### Scoring Criteria

- Length (minimum and extra points)
- Character variety
- Sequential characters
- Common patterns
- Mixed character types bonus

## Password Generation

### Basic Usage

```javascript
// Default configuration (9 characters)
const password = generateStrongPassword();

// Custom length
const longPassword = generateStrongPassword({ length: 16 });
```

### Advanced Configuration

```javascript
const customPassword = generateStrongPassword({
    length: 12,
    charCounts: {
        upper: 3,    // uppercase letters
        lower: 4,    // lowercase letters
        numbers: 3,  // numeric digits
        special: 2   // special characters
    }
});
```

### Configuration Options

```typescript
interface PasswordConfig {
    length?: number;    // Total length (default: 9)
    charCounts?: {
        upper?: number;   // Uppercase count (default: 2)
        lower?: number;   // Lowercase count (default: 3)
        numbers?: number; // Numbers count (default: 2)
        special?: number; // Special chars count (default: 2)
    }
}
```

### Special Use Cases

```javascript
// Only uppercase and numbers
const uppercaseNumbers = generateStrongPassword({
    length: 10,
    charCounts: {
        upper: 5,
        lower: 0,
        numbers: 5,
        special: 0
    }
});

// Only lowercase letters
const lowercaseOnly = generateStrongPassword({
    length: 8,
    charCounts: {
        upper: 0,
        lower: 8,
        numbers: 0,
        special: 0
    }
});

// Extra special characters
const specialHeavy = generateStrongPassword({
    length: 12,
    charCounts: {
        special: 4
    }
});
```

## Character Sets

Default character sets used for generation:

- Uppercase: A-Z
- Lowercase: a-z
- Numbers: 0-9
- Special: !@#$%^&*()_+-=[]{}|;:,.<>?

## Error Handling

The module throws errors for invalid inputs:

```javascript
try {
    const password = generateStrongPassword({
        length: 5,
        charCounts: {
            upper: 10 // Error: exceeds total length
        }
    });
} catch (error) {
    console.error(error.message);
    // "Total character counts cannot exceed password length"
}
```

## TypeScript Support

Full TypeScript support with type definitions included:

```typescript
import { check, generateStrongPassword } from 'password-strength-generator';

interface PasswordResult {
    strength: string;
    score: number;
    suggestion?: string;
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Steps to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Author

ErenayFC

- GitHub: [@ErenayFC](https://github.com/ErenayFC)
- Website: [ErenayDev.com.tr](https://erenaydev.com.tr)

## Support

If you found this project helpful, please give it a ⭐!
