// import { login, signup } from "./salt";
const {
  login,
  signup,
  checkPasswordMatch,
  createHashedPasswordWithSalt,
} = require("./salt");
const { createHMACEncryption, checkPasswordMatchHMAC } = require("./hmac");
const {
  checkPasswordMatchSymmteric,
  encryptPassword,
} = require("./symmetric-encrypt");
const generatePair = require("./keypair");

const users = [
  { email: "saad18910@hotmail.com", password: "12345" },
  { email: "saad18910@hotmail.com", password: "12335" },
  { email: "saad18910@hotmail.com", password: "12345" },
  { email: "saad18910@hotmail.com", password: "12345" },
];

function attemptWithHEXSALT() {
  users.forEach((u) => signup(u.email, u.password));

  users.forEach((u) =>
    console.log(`Sign In for User ${u.email}: ${login(u.email, u.password)}`)
  );
}

function main() {
  console.log(
    "Using Salt:",
    checkPasswordMatch("12345", createHashedPasswordWithSalt("12345"))
  );
  console.log(
    "Using HMAC:",
    checkPasswordMatchHMAC("12345", createHMACEncryption("12345"))
  );

  console.log(
    "Using Symmetric Encryption:",
    checkPasswordMatchSymmteric("12345", encryptPassword("12345"))
  );
}

main();

generatePair();
