const fs = require("fs");
const { faker } = require("@faker-js/faker");

// Function to generate a fake user
function generateUser() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  return {};
}

// Function to generate a list of fake users
function generateUsers(count) {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push(generateUser());
  }
  return users;
}

// Number of fake users to generate
const numberOfUsers = 25; // Change this as needed

// Generate the list of fake users
const userList = generateUsers(numberOfUsers);

// Write the list of users to a JSON file
const jsonFileName = "../data/fakeUsers.json";
fs.writeFileSync(jsonFileName, JSON.stringify(userList, null, 2));

console.log(
  `Generated ${numberOfUsers} fake users and saved to ${jsonFileName}`
);
