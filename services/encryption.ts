
const iv = new Uint8Array(12); // Initialization vector.

async function getKey(secret: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const hash = await crypto.subtle.digest('SHA-256', keyData);
  return crypto.subtle.importKey('raw', hash, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
}

const encrypt = async (data: string, key: string): Promise<string> => {
  const cryptoKey = await getKey(key);
  const encodedData = new TextEncoder().encode(data);
  const encryptedData = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    cryptoKey,
    encodedData
  );
  
  const buffer = new Uint8Array(encryptedData);
  return btoa(String.fromCharCode.apply(null, Array.from(buffer)));
};

const decrypt = async (encryptedData: string, key: string): Promise<string> => {
  const cryptoKey = await getKey(key);
  const buffer = new Uint8Array(Array.from(atob(encryptedData), c => c.charCodeAt(0)));
  const decryptedData = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    cryptoKey,
    buffer
  );

  return new TextDecoder().decode(decryptedData);
};

const encryptionService = {
  encrypt,
  decrypt,
};

export default encryptionService;
