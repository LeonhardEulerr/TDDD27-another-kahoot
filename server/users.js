const users = [];

const addUser = ({ id, name, pin }) => {
  const userExists = users.find(
    (user) => user.pin === pin && user.name === name
  );

  if (userExists) {
    return { error: 'This name is already taken' };
  }

  const user = { id, name, pin };
  users.push(user);
  console.log(users);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => {
  return users.find((user) => user.id === id);
};

const getUserByNameAndPin = (name, pin) => {
  return users.find((user) => user.name === name && user.pin === pin);
};

const getUsersInQuiz = (pin) => {
  return users.filter((user) => user.pin === pin);
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUserByNameAndPin,
  getUsersInQuiz,
};
