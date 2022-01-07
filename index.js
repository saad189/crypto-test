const { checkPasswordMatch, createHashedPasswordWithSalt } = require("./salt");
const { createHMACEncryption, checkPasswordMatchHMAC } = require("./hmac");
const {
  checkPasswordMatchSymmteric,
  encryptPassword,
} = require("./symmetric-encrypt");

const fs = require("fs");

const generatePair = require("./keypair");

const prompt = require("prompt-sync")({ sigint: true });

let users = [];
const userFileName = "userInfo.txt";

function simpleReadFileAsync(filePath) {
  try {
    const data = fs.readFileSync(filePath, { encoding: "utf-8", flag: "r" });
    if (data) {
      users = JSON.parse(data);
    }
  } catch (error) {
    fs.writeFile(filePath, "[]", (err) => {
      if (err) console.error(err);
      console.log("Created Empty File");
    });
  }
}

function WriteDataToFile() {
  fs.writeFile("userInfo.txt", JSON.stringify(users), (err) => {
    if (err) console.error(err);
    console.log("Written Data to File");
  });
}

function InitialInformation(continued) {
  console.log("\n");
  if (!continued) {
    console.log("Hello, This is Password Comparison Program!");
  }

  console.log("Please Select an option by pressing its respective number:");
  const options = [
    "Create a User",
    "See All User Information",
    "Login A User",
    "Test Algorithm Speed",
    "Exit the Program!",
  ];
  options.forEach((o, i) => console.log(`${i + 1}. ${o}`));
}

function StartProgram() {
  console.clear();
  simpleReadFileAsync(userFileName);
  let inputNumber;

  while (inputNumber != 5) {
    InitialInformation(inputNumber);
    inputNumber = prompt();
    SelectOptions(Number(inputNumber));
  }
}

function SelectOptions(selected) {
  switch (selected) {
    case 1:
      TakeUserInfo();
      break;
    case 2:
      DisplayAllUserInfo();
      break;
    case 3:
      LoginUser();
      break;
    case 4:
      console.log("Not Implemented Yet!");
      break;
    case 5:
      WriteDataToFile();
    default:
      break;
  }
}

function TakeUserInfo() {
  console.log("Creating User!");

  let name = prompt(`Enter User's Name:`);
  let email = prompt(`Enter User's Email:`);
  let password = prompt(`Enter User's Password:`);
  console.log(`Choose Selected Algorithm to Encrypt the Password:`);
  let selectedAlgo;

  while (
    !selectedAlgo ||
    Number(selectedAlgo) < 0 ||
    Number(selectedAlgo) > 3
  ) {
    AlgoChoicesInfo();
    selectedAlgo = prompt();
  }

  CreateUser(name, email, password, selectedAlgo);
}

function AlgoChoicesInfo() {
  options = ["Hashing + SALT", "HMAC", "Symmetric-Encrypt"];
  options.forEach((o, i) => console.log(`${i + 1}. ${o}`));
}

function CreateUser(name, email, password, selectedAlgo) {
  users.push({
    name,
    email,
    password: encryptWithAlgo(password, Number(selectedAlgo)),
    selectedAlgo,
  });
  console.log(`User Added: ${name}`);
}

function DisplayAllUserInfo() {
  console.log("Displaying User Information!");
  users.forEach((u, i) =>
    console.log(
      `${i + 1}: Name: ${u.name}, Email: ${u.email}, Password: ${
        u.password
      }, Selected Algorithm: ${u.selectedAlgo}`
    )
  );
}

function LoginUser() {
  let email = prompt(`Enter User's Email:`);
  let password = prompt(`Enter User's Password:`);

  console.log(
    checkUserLogin(email, password)
      ? "User Logged In Successfully"
      : "Login Failed :("
  );
}

function checkUserLogin(email, Password) {
  const user = users.find((u) => u.email === email);
  return comparePasswords(Password, user.password, Number(user.selectedAlgo));
}

function encryptWithAlgo(password, selectedAlgo) {
  let newPassword;
  switch (selectedAlgo) {
    case 1:
      newPassword = createHashedPasswordWithSalt(password);
      break;
    case 2:
      newPassword = createHMACEncryption(password);
      break;
    case 3:
      newPassword = encryptPassword(password);
      break;
    default:
  }
  return newPassword;
}
function comparePasswords(loginPassword, savedPassword, selectedAlgo) {
  let match;
  switch (selectedAlgo) {
    case 1:
      match = checkPasswordMatch(loginPassword, savedPassword);
      break;
    case 2:
      match = checkPasswordMatchHMAC(loginPassword, savedPassword);
      break;
    case 3:
      match = checkPasswordMatchSymmteric(loginPassword, savedPassword);
      break;
    default:
  }
  return match;
}
StartProgram();
