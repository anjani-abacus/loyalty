import CryptoJS from 'react-native-crypto-js';

// Define the CryptoServiceProvider class
class CryptoServiceProvider {
  constructor() {}

  encryptData(payload) {
    return CryptoJS.AES.encrypt(JSON.stringify(payload), 'vikas', {
      format: this.CryptoJSAesJson,
    }).toString();
  }

  decryptData(payload) {
    return JSON.parse(
      CryptoJS.AES.decrypt(payload, 'vikas', {
        format: this.CryptoJSAesJson,
      }).toString(CryptoJS.enc.Utf8),
    );
  }

  CryptoJSAesJson = {
    stringify: function (cipherParams) {
      let j = {ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)};
      if (cipherParams.iv){ j.iv = cipherParams.iv.toString();}
      if (cipherParams.salt){ j.s = cipherParams.salt.toString();}
      return JSON.stringify(j);
    },
    parse: function (jsonStr) {
      let j = JSON.parse(jsonStr);
      let cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Base64.parse(j.ct),
      });
      if (j.iv){ cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv);}
      if (j.s) {cipherParams.salt = CryptoJS.enc.Hex.parse(j.s);}
      return cipherParams;
    },
  };
}

// Export the service as a singleton instance
const cryptoService = new CryptoServiceProvider();
export default cryptoService;
