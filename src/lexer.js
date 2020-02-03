function lexer(src = '') {
  let pointer = 0
  let firstCall = true
  const length = src.length
  let current = readToken()
  let next = readToken()

  function currentToken() {
    return current
  }

  function advance() {
    current = next
    next = readToken()
    return current
  }

  function lookAhead() {
    return next
  }

  function isDigit(codePoint) {
    if ((codePoint > 47 && codePoint < 58) || codePoint === 46) {
      return true
    } else {
      return false
    }
  }

  function skip() {
    pointer++
    return true
  }

  function readPlus() {
    pointer++
    return { type: 'addition', value: '+' }
  }

  function startToken() {
    return { type: 'start' }
  }

  function readToken() {
    if (firstCall) {
      firstCall = false
      return startToken()
    }

    do {
      switch (src.charCodeAt(pointer)) {
        case 32:
          skip()
          break
        case 43:
          return readPlus()
        case 48:
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
          return readNumbers()
      }
    } while (!isNaN(src.charCodeAt(pointer)))
    return { type: 'end' }
  }

  function readNumbers() {
    const digits = []
    let codePoint = src.charCodeAt(pointer)
    while (pointer <= length && isDigit(codePoint)) {
      digits.push(src.charAt(pointer))
      pointer++
      codePoint = src.charCodeAt(pointer)
    }
    return { type: 'number', value: digits.join('') }
  }

  return {
    lookAhead,
    advance,
    currentToken,
  }
}
module.exports.lexer = lexer
