const User = require('./user.model')

let users = [];

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return users;
};

const getOneUser = async (id) => {
  // TODO: mock implementation. should be replaced during task development
  return users.filter( (user) => user.id === id)[0];
};

const createUser = async (body) => {
  const user = new User(body);
  users.push(user);
  return user;
}

const putUser = async (id,body) => {
  users.map( (user) => {
      if (user.id === id){
        for (let key in body){
          user[key] = body[key]
        }
      }
  });
  return  users.filter( (user) => user.id === id)[0];
}

const deleteUser = async (id) => {
  users = users.filter( (user) => user.id !== id)
  return null;
}

module.exports = { getAll, getOneUser, createUser, putUser, deleteUser };
