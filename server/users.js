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

// if multiple users with the same socket id exists all will be rmeoved
const removeUser = (id) => {
  const players = users.filter((u) => u.id === id);
  players.forEach((p) => {
    const index = users.findIndex((user) => user.id === p.id);

    if (index !== -1) {
      return users.splice(index, 1)[0];
    }
  });
};

// remove all players except for host from a room with pin
const removeAllPlayersInQuiz = (pin) => {
  const players = users.filter((u) => u.pin === pin && u.name !== 'host');
  players.forEach((p) => {
    const index = users.findIndex((user) => user.id === p.id);

    if (index !== -1) {
      return users.splice(index, 1)[0];
    }
  });
};

const updateUserSocketId = ({ socketid, pin, name }) => {
  let user = users.find((u) => u.pin === pin && u.name === name);
  if (user) {
    user.id = socketid;
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
  updateUserSocketId,
  getUser,
  getUserByNameAndPin,
  getUsersInQuiz,
  removeAllPlayersInQuiz,
};
