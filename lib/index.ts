import {v4 as uuidv4, V4Options } from 'uuid'
import baseX, { BaseConverter } from 'base-x'

const base62 = baseX('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
const base64 = baseX('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_')

/**
 * Base-XX UUID Encoder / Decoder
 */
export class UUIDBaseX {
  public base: baseX.BaseConverter

  /**
   * Makes a UUIDBaseX setup with the base62 alphabet a-z, A-Z, and 0-9
   */
  static base62(): UUIDBaseX {
    return new UUIDBaseX(base62)
  }

  /**
   * Makes a UUIDBaseX setup with the base64 alphabet a-z, A-Z, 0-9, _, and -. The UUIDs made with these will be a little shorter but uglier than base62.
   */
  static base64(): UUIDBaseX {
    return new UUIDBaseX(base64)
  }

  /**
   * Makes a UUIDBaseX setup with the full urlSafe alphabet
   */
  static urlSafe(): UUIDBaseX {
    return UUIDBaseX.base64()
  }

  /**
   * Creates a UUIDBaseX object
   *
   * @param alphabet takes a string that includes the unique characters you want to use in your encoding. Or a [BaseConverter object from base-X](https://github.com/cryptocoinjs/base-x)
   */
  constructor(alphabet: string | BaseConverter) {
    this.base = typeof alphabet === 'string' ? baseX(alphabet) : alphabet
  }

  /**
   * Create a version 4 (random) UUID in your alphabet
   * @param options The options from [`uuid`'s v4 method](https://github.com/uuidjs/uuid#uuidv4options-buffer-offset)
   */
  v4(options?: V4Options): string {
    const uuid = uuidv4(options, Buffer.alloc(16))
    return this.base.encode(uuid)
  }

  /**
   * Takes an encoded UUID and returns a UUID as regular people know them
   *
   * Throws if it's not a valid encoded uuid
   * @param input an encodedUUID
   */
  toUUID(input: string): string {
    const res = this.decode(input)
    if (res.length !== 16) {
      throw new Error('Invalid encoded UUID')
    }
    const hex = res.toString('hex')
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
  }

  /**
   * Takes an UUID and returns an encoded UUID as with the alphabet you've provided
   *
   * Throws if it's not a valid encoded uuid
   * @param input a regular ole UUID
   */
  fromUUID(input: string): string {
    const data = Buffer.from(input.replace(/-/g, ''), 'hex')
    if (data.length !== 16) {
      throw new Error('Invalid UUID')
    }
    return this.base.encode(data)
  }

  /**
   * If you really want to call this it will give you a buffer of the data from the encoded UUID
   */
  private decode(input: string): Buffer {
    try {
      return this.base.decode(input)
    } catch (error) {
      if (error instanceof Error && error.message.startsWith('Non-base')) {
        throw new Error('Invalid encoded UUID')
      }
      throw error
    }
  }
}
