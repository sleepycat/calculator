const { parse, parseNumber } = require('../parser')
const { lexer } = require('../lexer')

describe('parseNumber', () => {
  it('returns and ast node', () => {
    let fns = lexer('111')
    fns.advance()
    let p = parseNumber(fns)
    expect(p).toEqual({ kind: 'number', value: '111' })
  })
})

describe('parse', () => {
  it('produces an AST' () => {
    let ast = parse('1 + 1')
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
