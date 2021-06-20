import { UUIDX } from './'
import { expect } from 'chai'

describe('UUIDX', () => {
  describe('.urlSafe', () =>{
    it('makes a url safe uuid v4', () => {
      const uuidx = UUIDX.urlSafe()
      const id = uuidx.v4()
      expect(id).to.match(/^[0-9A-Za-z\-_]+$/)
    })
    it('encodes/decodes', () => {
      const uuidx = UUIDX.urlSafe()
      const uuid = '2a21ff3d-8927-4be8-9770-fcdb19973f71'

      const id = uuidx.fromUUID(uuid)
      expect(id).to.equal('cmCIjF-AaZbA_WOi6NYjK')

      const output = uuidx.toUUID(id)
      expect(output).to.equal(uuid)
    })
  })
  describe('custom alphabet', () => {
    it('encodes/decodes', () => {
      const uuidx = new UUIDX('abcd')
      const uuid = 'de305d54-75b4-431b-adb2-eb6b9e546014'

      const id = uuidx.fromUUID(uuid)
      expect(id).to.equal('dbdcadaabbdbbbbabdbbcdbabaadabcdccdbcdacdccdbccdcbdcbbbabcaaabba')

      const output = uuidx.toUUID(id)
      expect(output).to.equal(uuid)
    })
    it('throws on a bad alphabet', () => {
      expect(() => new UUIDX('aaaa')).to.throw('a is ambiguous')
      expect(() => new UUIDX('dbdcadaabbdbbbbabdbbcdbabaadabcdccdbcdacdccdbccdcbdcbbbabcaaabbadbdcadaabbdbbbbabdbbcdbabaadabcdccdbcdacdccdbccdcbdcbbbabcaaabbadbdcadaabbdbbbbabdbbcdbabaadabcdccdbcdacdccdbccdcbdcbbbabcaaabbadbdcadaabbdbbbbabdbbcdbabaadabcdccdbcdacdccdbccdcbdcbbbabcaaab4')).to.throw('Alphabet too long')
    })
  })
  describe('encoding/decoding', () => {
    it('should match decoded UUID to original UUID', () => {
      const uuidx = UUIDX.urlSafe()
      const uuid = 'de305d54-75b4-431b-adb2-eb6b9e546014'

      const id = uuidx.fromUUID(uuid)
      const output = uuidx.toUUID(id)

      expect(output).to.equal(uuid)
    })
    it('throws with invalid encoded input', () => {
      const uuidx = UUIDX.urlSafe()
      expect(() => uuidx.toUUID('')).to.throw('Invalid encoded UUID')
      expect(() => uuidx.toUUID('a')).to.throw('Invalid encoded UUID')
      expect(() => uuidx.toUUID('!@#$%')).to.throw('Invalid encoded UUID')
      expect(() => uuidx.toUUID('askldjhfalksjdhfkasjdhfsdflkjshshs')).to.throw('Invalid encoded UUID')
    })
    it('throws with invalid uuid input', () => {
      const uuidx = UUIDX.urlSafe()
      expect(() => uuidx.fromUUID('00000000-0000-0000-0000-00000000000000')).to.throw('Invalid UUID')
      expect(() => uuidx.fromUUID('a')).to.throw('Invalid UUID')
      expect(() => uuidx.fromUUID('!@#$%')).to.throw('Invalid UUID')
      expect(() => uuidx.fromUUID('askldjhfalksjdhfkasjdhfsdflkjshshs')).to.throw('Invalid UUID')
    })
    it('works when I mess around', () => {
      const fixtures = [
        ['MMMMMMMMMMMMMMMM', '00000000-0000-0000-0000-000000000000'],
        ['St2rWWDbyBprYjpAQ02x4', '06ad547f-fe02-477b-9473-f7977e4d5e17'],
        ['d1e0hD7QelwcV2J4zCSMg-', '941532a0-6be1-443a-a9d5-d57bdf180a52'],
        ['dZEtG_8jjbrmBDFHH7S1Hw', 'ba86b8f0-6fdf-4944-87a0-8a491a19490e'],
        ['uWWWWWWWWWWWWWWWWWWWWW', 'ffffffff-ffff-ffff-ffff-ffffffffffff'],
      ]
      const uuidx = UUIDX.urlSafe()
      for (const [encodedUUID, uuid] of fixtures) {
        expect(uuidx.fromUUID(uuid)).to.equal(encodedUUID)
        expect(uuidx.toUUID(encodedUUID)).to.equal(uuid)
      }
    })
  })
})
