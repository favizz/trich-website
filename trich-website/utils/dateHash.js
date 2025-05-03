// utils/dateHash.ts
import CryptoJS from 'crypto-js'

// Derive a 256-bit key from today's date (YYYY-MM-DD)
function getDateKey() {
  const today = new Date().toISOString().slice(0, 10)      // e.g. "2025-04-23"
  return CryptoJS.SHA256(today)                           // 32-byte key
}

// Use a constant 16-byte IV (you can randomize this too, but then
// you'd need to transmit it alongside the ciphertext)
const IV = CryptoJS.enc.Hex.parse('00000000000000000000000000000000')

/**
 * Encrypts a plaintext string into a URL-safe cipher based on today's date.
 * @param query Plaintext to encrypt (e.g. 'w62jI0Zzbk')
 * @returns Encrypted string, safe for use as a URL param
 */
export function hashQuery(query) {
  const key = getDateKey()
  const encrypted = CryptoJS.AES.encrypt(query, key, { iv: IV })
  return encodeURIComponent(encrypted.toString())         // e.g. "U2FsdGVkX1%2B..."
}

/**
 * Decrypts a date-based cipher back into the original plaintext.
 * Must be called on the same date used to encrypt.
 * @param hash URL-encoded cipher string
 * @returns Decrypted plaintext
 */
export function unhashQuery(hash) {
  const key = getDateKey()
  const cipherText = decodeURIComponent(hash)
  const bytes = CryptoJS.AES.decrypt(cipherText, key, { iv: IV })
  return bytes.toString(CryptoJS.enc.Utf8)
}