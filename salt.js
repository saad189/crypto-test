const { scryptSync, randomBytes, timingSafeEqual } = require("crypto");
const users = [];
function signup(email, password) {
  const salt = randomBytes(16).toString("hex");
  const hashedPassword = scryptSync(password, salt, 64).toString("hex");
  const user = { email, password: `${salt}:${hashedPassword}` };
  users.push(user);

  return user;
}

function login(email, password) {
  const user = users.find((u) => u.email === email);
  const [salt, key] = user.password.split(":");
  const hashedBuffer = scryptSync(password, salt, 64);
  /**
   * Timing Attack, Identify time taken to perform
   * op, to identify the kind of algo being used
   */

  const keyBuffer = Buffer.from(key, "hex");
  const match = timingSafeEqual(hashedBuffer, keyBuffer);

  return match ? "login succesful!" : "login failed!";
}

module.exports = { login, signup };
