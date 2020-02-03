const { parse, parseNumber } = require('../parser')
const { lexer } = require('../lexer')

describe('parseNumber', () => {
  it('returns and ast node', () => {
    const fns = lexer('111')
    fns.advance()
    const p = parseNumber(fns)
    expect(p).toEqual({ kind: 'number', value: '111' })
  })
})

describe('parse', () => {
  it('produces an AST', () => {
    const ast = parse('1 + 1')
    expect(ast).toEqual({
      kind: 'root',
      children: [
        {
          kind: 'expression',
          children: {
            kind: 'addition',
            children: [
              {
                type: 'number',
                value: '1',
              },
              {
                type: 'number',
                value: '1',
              },
            ],
          },
        },
      ],
    })
  })
})
