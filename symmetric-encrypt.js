const { createCipheriv, randomBytes, createDecipheriv } = require("crypto");

const key = randomBytes(32);
const iv = randomBytes(16);

function encryptPassword(password) {
  const cipher = createCipheriv("aes256", key, iv);

  // Encrypt

  const encryptedMessage =
    cipher.update(password, "utf8", "hex") + cipher.final("hex");

  return encryptedMessage;
}

function decryptPassword(password) {
  const decipher = createDecipheriv("aes256", key, iv);
  return decipher.update(password, "hex", "utf-8") + decipher.final("utf-8");
}

function checkPasswordMatchSymmteric(loginPassword, savedPassword) {
  return decryptPassword(savedPassword) === loginPassword;
}

module.exports = {
  encryptPassword,
  decryptPassword,
  checkPasswordMatchSymmteric,
};
