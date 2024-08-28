import appPackage from '../../package.json'

export default {
  decryptSessionDetails (sessionKey, storeOnSession = true) {
    if (sessionKey) {
      const decryptString = this.decryptString()
      const encryptString = this.encryptString()
      const encryptSessionKey = encryptString(sessionKey)
      if (storeOnSession && sessionStorage[encryptSessionKey]) {
        const decryptSessionVal = this.decryptString(sessionStorage[encryptSessionKey])
        return decryptSessionVal
      } else if (!storeOnSession && localStorage[encryptSessionKey]) {
        return decryptString(localStorage[encryptSessionKey])
      } else {
        return ''
      }
    } else {
      return ''
    }
  },
  encryptAndStoreSessionDetails (sessionKey, data, storeOnSession = true) {
    if (sessionKey) {
      const encryptString = this.encryptString()
      const encryptedKey = encryptString(sessionKey)
      const encryptedData = encryptString(data)
      if (storeOnSession) {
        sessionStorage.setItem(encryptedKey, encryptedData)
      } else {
        localStorage.setItem(encryptedKey, encryptedData)
      }
    }
  },
  decryptString () {
    const privateKey = `${appPackage.name}-Storage-Enc-key`
    const textToChars = (text) => text.split('').map((c) => c.charCodeAt(0))
    const applyPrivateKeyToChar = (code) => textToChars(privateKey).reduce((a, b) => a ^ b, code)
    return (encoded) => encoded.match(/.{1,2}/g)
      .map((hex) => parseInt(hex, 16))
      .map(applyPrivateKeyToChar)
      .map((charCode) => String.fromCharCode(charCode))
      .join('')
  },
  encryptString () {
    const privateKey = `${appPackage.name}-Storage-Enc-key`
    const textToChars = (text) => text.split('').map((c) => c.charCodeAt(0))
    const byteHex = (n) => ('0' + Number(n).toString(16)).substr(-2)
    const applyPrivateKeyToChar = (code) => textToChars(privateKey).reduce((a, b) => a ^ b, code)
    return (text) => text.split('')
      .map(textToChars)
      .map(applyPrivateKeyToChar)
      .map(byteHex)
      .join('')
  },
  parseJwt (token) {
    if (!token) {
      return {}
    }
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
    return JSON.parse(jsonPayload)
  },
  test (a) {
    console.log('asdadad')
  }
}
