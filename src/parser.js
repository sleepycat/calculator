const { lexer } = require('./lexer')

function parseNumber({ currentToken, advance }) {
  const node = {
    kind: 'number',
    value: currentToken().value,
  }
  advance()
  return node
}
module.exports.parseNumber = parseNumber

function parseAddition({ currentToken, advance }) {
  const augend = currentToken()
  // advance past the addtion token to get the number on the other side
  advance()
  const addend = advance()
  const node = {
    kind: 'addition',
    children: [augend, addend],
  }
  return node
}
module.exports.parseAddition = parseAddition

function parseExpression({ currentToken, lookAhead, advance }) {
  switch (currentToken().type) {
    case 'number':
      if (lookAhead().type === 'addition') {
        return [
          {
            kind: 'expression',
            children: parseAddition({ currentToken, lookAhead, advance }),
          },
        ]
      } else {
        return [
          {
            kind: 'expression',
            childrend: parseNumber({ currentToken, lookAhead, advance }),
          },
        ]
      }
    default:
      return []
  }
}

module.exports.parseExpression = parseExpression

function parseRoot({ currentToken, lookAhead, advance }) {
  advance()
  return {
    kind: 'root',
    children: parseExpression({ currentToken, lookAhead, advance }),
  }
}

module.exports.parseRoot = parseRoot

function parse(src = '') {
  return parseRoot(lexer(src))
}

module.exports.parse = parse
