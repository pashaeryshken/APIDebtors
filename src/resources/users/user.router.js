const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getOneUser(req.params.id);
  console.log(user)
  // map user fields to exclude secret fields like "password"

  res.json(User.toResponse(user));
});
router.route('/').post(async (req, res) => {
  const user = await usersService.createUser(req.body);
  // map user fields to exclude secret fields like "password"
  res.json(User.toResponse(user));
});
router.route('/:id').put(async (req, res) => {
  const user = await usersService.putUser(req.params.id, req.body);

  // map user fields to exclude secret fields like "password"
  res.json(User.toResponse(user));
});
router.route('/:id').delete(async (req, res) => {
  const users = await usersService.deleteUser();
  // map user fields to exclude secret fields like "password"
  res.json();
});

module.exports = router;
