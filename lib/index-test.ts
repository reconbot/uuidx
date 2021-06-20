import { UUIDBaseX } from './'
import { expect } from 'chai'

describe('UUIDBaseX', () => {
  describe('.urlSafe', () =>{
    it('makes a url safe uuid v4', () => {
      const uuidx = UUIDBaseX.urlSafe()
      const id = uuidx.v4()
      expect(id).to.match(/^[0-9A-Za-z\-_]+$/)
    })
    it('encodes/decodes', () => {
      const uuidx = UUIDBaseX.urlSafe()
      const uuid = '2a21ff3d-8927-4be8-9770-fcdb19973f71'

      const id = uuidx.fromUUID(uuid)
      expect(id).to.equal('G8vYZyitbW9tM_dIpBPZN')

      const output = uuidx.toUUID(id)
      expect(output).to.equal(uuid)
    })
  })
  describe('custom alphabet', () => {
    it('encodes/decodes', () => {
      const uuidx = new UUIDBaseX('abcd')
      const uuid = 'de305d54-75b4-431b-adb2-eb6b9e546014'

      const id = uuidx.fromUUID(uuid)
      expect(id).to.equal('dbdcadaabbdbbbbabdbbcdbabaadabcdccdbcdacdccdbccdcbdcbbbabcaaabba')

      const output = uuidx.toUUID(id)
      expect(output).to.equal(uuid)
    })
    it('throws on a bad alphabet', () => {
      expect(() => new UUIDBaseX('aaaa')).to.throw('a is ambiguous')
      expect(() => new UUIDBaseX('dbdcadaabbdbbbbabdbbcdbabaadabcdccdbcdacdccdbccdcbdcbbbabcaaabbadbdcadaabbdbbbbabdbbcdbabaadabcdccdbcdacdccdbccdcbdcbbbabcaaabbadbdcadaabbdbbbbabdbbcdbabaadabcdccdbcdacdccdbccdcbdcbbbabcaaabbadbdcadaabbdbbbbabdbbcdbabaadabcdccdbcdacdccdbccdcbdcbbbabcaaab4')).to.throw('Alphabet too long')
    })
  })
  describe('encoding/decoding', () => {
    it('should match decoded UUID to original UUID', () => {
      const uuidx = UUIDBaseX.urlSafe()
      const uuid = 'de305d54-75b4-431b-adb2-eb6b9e546014'

      const id = uuidx.fromUUID(uuid)
      const output = uuidx.toUUID(id)

      expect(output).to.equal(uuid)
    })
    it('throws with invalid encoded input', () => {
      const uuidx = UUIDBaseX.urlSafe()
      expect(() => uuidx.toUUID('')).to.throw('Invalid encoded UUID')
      expect(() => uuidx.toUUID('a')).to.throw('Invalid encoded UUID')
      expect(() => uuidx.toUUID('!@#$%')).to.throw('Invalid encoded UUID')
      expect(() => uuidx.toUUID('askldjhfalksjdhfkasjdhfsdflkjshshs')).to.throw('Invalid encoded UUID')
    })
    it('throws with invalid uuid input', () => {
      const uuidx = UUIDBaseX.urlSafe()
      expect(() => uuidx.fromUUID('00000000-0000-0000-0000-00000000000000')).to.throw('Invalid UUID')
      expect(() => uuidx.fromUUID('a')).to.throw('Invalid UUID')
      expect(() => uuidx.fromUUID('!@#$%')).to.throw('Invalid UUID')
      expect(() => uuidx.fromUUID('askldjhfalksjdhfkasjdhfsdflkjshshs')).to.throw('Invalid UUID')
    })
    it('works when I mess around', () => {
      const fixtures = [
        ['0000000000000000', '00000000-0000-0000-0000-000000000000'],
        ['6Hlh__w97uVhPZVt-jlUn', '06ad547f-fe02-477b-9473-f7977e4d5e17'],
        ['2k5jawq-54eGDlRnLv60Fi', '941532a0-6be1-443a-a9d5-d57bdf180a52'],
        ['2WxHzMrZZ9h8uwyAAq6kAe', 'ba86b8f0-6fdf-4944-87a0-8a491a19490e'],
        ['3_____________________', 'ffffffff-ffff-ffff-ffff-ffffffffffff'],
      ]
      const uuidx = UUIDBaseX.urlSafe()
      for (const [encodedUUID, uuid] of fixtures) {
        expect(uuidx.fromUUID(uuid)).to.equal(encodedUUID)
        expect(uuidx.toUUID(encodedUUID)).to.equal(uuid)
      }
    })
  })
})
