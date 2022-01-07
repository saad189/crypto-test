const { generateKeyPairSync } = require("crypto");

function generatePair() {
  const { privateKey, publicKey } = generateKeyPairSync("rsa", {
    modulusLength: 2048, //length of key in bits
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  });

  console.log(privateKey, publicKey);
}

module.exports = generatePair;
