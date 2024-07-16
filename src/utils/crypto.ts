import CryptoJS from "crypto-js";

const CRYPTO_KEY = 'myapp';

/** 
 * 加密
 */
export const encrypt = (msg: string) => {
  return CryptoJS.AES.encrypt(msg, CRYPTO_KEY).toString();
};

/**
 * 解密
 */
export const decrypt = (Ciphertext: string) => {
  const bytes = CryptoJS.AES.decrypt(Ciphertext, CRYPTO_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};