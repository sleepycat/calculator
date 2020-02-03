const { lexer } = require('../lexer')

describe('lexer', () => {})

describe('lexer', () => {
  it('returns a set of functions to manipulate closured state', () => {
    const { advance, currentToken, lookAhead } = lexer('111')
    // advance past the start token
    advance()
    let second = currentToken()
    expect(second).toEqual({ type: 'number', value: '111' })
  })

  it('consumes the entire string', () => {
    const { advance, currentToken, lookAhead } = lexer('111 222')
    let first = currentToken()
    let second = advance()
    let third = advance()
    let fourth = advance()
    expect(first).toEqual({ type: 'start' })
    expect(second).toEqual({ type: 'number', value: '111' })
    expect(third).toEqual({ type: 'number', value: '222' })
    expect(fourth).toEqual({ type: 'end' })
  })

  describe('advance', () => {
    it('always returns the end token after reaching the end', () => {
      const { advance } = lexer('1')
      expect(advance()).toEqual({ type: 'number', value: '1' })
      expect(advance()).toEqual({ type: 'end' })
      expect(advance()).toEqual({ type: 'end' })
    })
  })

  describe('lookAhead', () => {
    it('returns first token after the start token', () => {
      const { currentToken, lookAhead } = lexer('12')
      expect(lookAhead()).toEqual({ type: 'number', value: '12' })
    })

    it('returns false if the next character is the end of the src string', () => {
      const { advance, lookAhead } = lexer('1')
      // advance past the start token
      advance()
      expect(lookAhead()).toEqual({ type: 'end' })
    })
  })
})
