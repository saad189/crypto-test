// import { login, signup } from "./salt";
const { login, signup } = require("./salt");

const users = [
  { email: "saad18910@hotmail.com", password: "12345" },
  { email: "saad18910@hotmail.com", password: "12335" },
  { email: "saad18910@hotmail.com", password: "12345" },
  { email: "saad18910@hotmail.com", password: "12345" },
];

function main() {
  users.forEach((u) => signup(u.email, u.password));

  users.forEach((u) =>
    console.log(`Sign In for User ${u.email}: ${login(u.email, u.password)}`)
  );
}

main();
