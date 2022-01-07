const { createHmac } = require("crypto");

const algo = "sha256";
const encoding = "base64";
const key = "secret-sad-key!";

function createHMACEncryption(password) {
  const hmac = createHmac(algo, key).update(password).digest(encoding);
  return hmac;
}

function checkPasswordMatchHMAC(loginPassword, savedPassword) {
  return savedPassword === createHMACEncryption(loginPassword);
}

module.exports = { createHMACEncryption, checkPasswordMatchHMAC };
