import { readFileSync } from 'fs';
import { publicEncrypt, privateDecrypt, constants } from 'crypto';
import { join } from 'node:path';

const publicKey = readFileSync(
  join(__dirname, '../config/public_key.pem'),
  'utf8'
);

const privateKey = readFileSync(
  join(__dirname, '../config/private_key.pem'),
  'utf8'
);

export class CryptoUtil {
  static encrypt(data: string): string {
    const buffer = Buffer.from(data, 'utf8');
    const encrypted = publicEncrypt(
      {
        key: publicKey,
        padding: constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
      },
      buffer
    );
    return encrypted.toString('base64');
  }

  static decrypt(cipherText: string): string {
    const buffer = Buffer.from(cipherText, 'base64');
    const decrypted = privateDecrypt(
      {
        key: privateKey,
        padding: constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
      },
      buffer
    );
    return decrypted.toString('utf8');
  }
}
