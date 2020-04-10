const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const createUser = (body) => usersRepo.createUser(body);
const getOneUser = (id) => usersRepo.getOneUser(id);
const putUser = (id,body) => usersRepo.putUser(id,body);
const deleteUser = (id) => usersRepo.deleteUser(id);

module.exports = { getAll, createUser, getOneUser, putUser, deleteUser};
