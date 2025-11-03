/**
 * Utility functions for handling ISBN conversions between ISBN-10 and ISBN-13
 */

export function isValidISBN10(isbn: string): boolean {
  // Remove hyphens and spaces, convert to uppercase
  const cleanISBN = isbn.replace(/[-\s]/g, '').toUpperCase();

  // Check if it's exactly 10 characters
  if (cleanISBN.length !== 10) return false;

  // Check if all characters are digits or X (for check digit)
  if (!/^[0-9]{9}[0-9X]$/.test(cleanISBN)) return false;

  // Calculate check digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanISBN[i]) * (10 - i);
  }

  const checkDigit = cleanISBN[9];
  const calculatedCheck = (11 - (sum % 11)) % 11;

  return (calculatedCheck === 10 && checkDigit === 'X') ||
         (calculatedCheck === parseInt(checkDigit));
}

export function isValidISBN13(isbn: string): boolean {
  // Remove hyphens and spaces
  const cleanISBN = isbn.replace(/[-\s]/g, '');

  // Check if it's exactly 13 characters and all digits
  if (cleanISBN.length !== 13 || !/^\d{13}$/.test(cleanISBN)) return false;

  // Check if it starts with 978 or 979
  if (!cleanISBN.startsWith('978') && !cleanISBN.startsWith('979')) return false;

  // Calculate check digit
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const digit = parseInt(cleanISBN[i]);
    sum += i % 2 === 0 ? digit : digit * 3;
  }

  const checkDigit = (10 - (sum % 10)) % 10;
  return checkDigit === parseInt(cleanISBN[12]);
}

export function convertISBN10to13(isbn10: string): string | null {
  const cleanISBN10 = isbn10.replace(/[-\s]/g, '').toUpperCase();

  if (!isValidISBN10(cleanISBN10)) return null;

  // Remove check digit and add 978 prefix
  const isbn13Base = '978' + cleanISBN10.substring(0, 9);

  // Calculate new check digit
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const digit = parseInt(isbn13Base[i]);
    sum += i % 2 === 0 ? digit : digit * 3;
  }

  const checkDigit = (10 - (sum % 10)) % 10;
  return isbn13Base + checkDigit.toString();
}

export function convertISBN13to10(isbn13: string): string | null {
  const cleanISBN13 = isbn13.replace(/[-\s]/g, '');

  if (!isValidISBN13(cleanISBN13)) return null;

  // Only 978 prefix can be converted to ISBN-10
  if (!cleanISBN13.startsWith('978')) return null;

  // Remove 978 prefix and check digit
  const isbn10Base = cleanISBN13.substring(3, 12);

  // Calculate check digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(isbn10Base[i]) * (10 - i);
  }

  const checkDigit = (11 - (sum % 11)) % 11;
  const checkChar = checkDigit === 10 ? 'X' : checkDigit.toString();

  return isbn10Base + checkChar;
}

export function formatISBN(isbn: string): string {
  const cleanISBN = isbn.replace(/[-\s]/g, '');

  if (cleanISBN.length === 10) {
    // Format ISBN-10 as X-XXX-XXXXX-X
    return `${cleanISBN.substring(0, 1)}-${cleanISBN.substring(1, 4)}-${cleanISBN.substring(4, 9)}-${cleanISBN.substring(9)}`;
  } else if (cleanISBN.length === 13) {
    // Format ISBN-13 as XXX-X-XXX-XXXXX-X
    return `${cleanISBN.substring(0, 3)}-${cleanISBN.substring(3, 4)}-${cleanISBN.substring(4, 7)}-${cleanISBN.substring(7, 12)}-${cleanISBN.substring(12)}`;
  }

  return isbn; // Return original if not valid format
}

export function getISBNFormats(isbn: string): { isbn10: string | null; isbn13: string | null } {
  const cleanISBN = isbn.replace(/[-\s]/g, '');

  if (cleanISBN.length === 10) {
    const isbn13 = convertISBN10to13(cleanISBN);
    return {
      isbn10: isValidISBN10(cleanISBN) ? cleanISBN : null,
      isbn13: isbn13
    };
  } else if (cleanISBN.length === 13) {
    const isbn10 = convertISBN13to10(cleanISBN);
    return {
      isbn10: isbn10,
      isbn13: isValidISBN13(cleanISBN) ? cleanISBN : null
    };
  }

  return { isbn10: null, isbn13: null };
}

/**
 * Validates and normalizes an ISBN value for use in structured data
 * Returns null if ISBN is invalid or placeholder text
 */
export function normalizeISBN(isbn: string | undefined | null): string | null {
  if (!isbn || typeof isbn !== 'string') return null;
  
  // Check for placeholder/invalid values
  const lowerISBN = isbn.toLowerCase().trim();
  if (lowerISBN === 'coming soon' || lowerISBN === 'tbd' || lowerISBN === 'n/a' || lowerISBN === '') {
    return null;
  }
  
  // Convert to uppercase first to preserve both lowercase and uppercase 'x' as 'X'
  // Then remove any non-digit characters except X
  const cleanISBN = isbn.toUpperCase().replace(/[^0-9X]/g, '');
  
  // Validate ISBN-10
  if (cleanISBN.length === 10 && isValidISBN10(cleanISBN)) {
    return cleanISBN;
  }
  
  // Validate ISBN-13
  if (cleanISBN.length === 13 && isValidISBN13(cleanISBN)) {
    return cleanISBN;
  }
  
  return null;
}

/**
 * Gets a valid ISBN-13 for GTIN (converts ISBN-10 to ISBN-13 if needed)
 * Returns null if ISBN is invalid
 */
export function getValidGTIN13(isbn: string | undefined | null): string | null {
  const normalized = normalizeISBN(isbn);
  if (!normalized) return null;
  
  // If already ISBN-13, return it
  if (normalized.length === 13 && isValidISBN13(normalized)) {
    return normalized;
  }
  
  // If ISBN-10, convert to ISBN-13
  if (normalized.length === 10 && isValidISBN10(normalized)) {
    return convertISBN10to13(normalized);
  }
  
  return null;
}

/**
 * Gets a valid SKU value
 * Prefers ISBN-13, falls back to formatted book ID
 */
export function getValidSKU(isbn: string | undefined | null, bookId: string): string {
  // Try to get valid ISBN-13 first (preferred for SKU)
  const gtin13 = getValidGTIN13(isbn);
  if (gtin13) {
    return gtin13;
  }
  
  // Fallback to normalized ISBN-13 if ISBN-10 exists
  const normalized = normalizeISBN(isbn);
  if (normalized && normalized.length === 10) {
    const converted = convertISBN10to13(normalized);
    if (converted) return converted;
  }
  
  // If ISBN-13 exists but wasn't valid, try to use it anyway (better than book ID)
  if (normalized && normalized.length === 13) {
    return normalized;
  }
  
  // Final fallback: format book ID as SKU
  // Format: BOOK-{id} where id is sanitized
  const sanitizedId = bookId.replace(/[^a-zA-Z0-9-]/g, '-').toUpperCase();
  return `BOOK-${sanitizedId}`;
}

/**
 * Gets a valid ISBN value for structured data (prefers ISBN-13)
 */
export function getValidISBN(isbn: string | undefined | null): string | null {
  const normalized = normalizeISBN(isbn);
  if (!normalized) return null;
  
  // Prefer ISBN-13 if available
  if (normalized.length === 13 && isValidISBN13(normalized)) {
    return normalized;
  }
  
  // If ISBN-10, convert to ISBN-13
  if (normalized.length === 10 && isValidISBN10(normalized)) {
    const converted = convertISBN10to13(normalized);
    if (converted) return converted;
    // If conversion fails, return original ISBN-10
    return normalized;
  }
  
  // If ISBN-13 exists but fails validation, return null
  return null;
}
