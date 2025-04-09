const dynamicImport = new Function("modulePath", "return import(modulePath)");

export async function importEncoding() {
  const encoding = await dynamicImport("@oslojs/encoding");
  return {
    encodeBase32LowerCaseNoPadding: encoding.encodeBase32LowerCaseNoPadding,
    encodeHexLowerCase: encoding.encodeHexLowerCase,
  };
}

export async function importSha256() {
  const crypto = await dynamicImport("@oslojs/crypto/sha2");
  return crypto.sha256;
}

export async function importCryptoUtils() {
  const [encoding, crypto] = await Promise.all([
    dynamicImport("@oslojs/encoding"),
    dynamicImport("@oslojs/crypto/sha2"),
  ]);

  return {
    encodeBase32LowerCaseNoPadding: encoding.encodeBase32LowerCaseNoPadding,
    encodeHexLowerCase: encoding.encodeHexLowerCase,
    sha256: crypto.sha256,
  };
}
