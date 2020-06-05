const md5Hex = require('md5-hex')

function calcResponse (data) {
  const getMD5Hex = str => md5Hex(Buffer.from(str))
  const a1 = `${data.username}:${data.realm}:${data.secret}`
  const a2 = `${data.method.toUpperCase()}:${data.uri}`
  const ha1 = getMD5Hex(a1)
  const ha2 = getMD5Hex(a2)

  if (data.qop !== null && data.qop === 'auth') {
    return getMD5Hex(`${ha1}:${data.nonce}:${data.nc}:${data.cnonce}:${data.qop}:${ha2}`)
  }

  return getMD5Hex(`${ha1}:${data.nonce}:${ha2}`)
}

module.exports = calcResponse
