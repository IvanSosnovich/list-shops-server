const { connection, connect, Schema, model, pluralize } = require('mongoose');

pluralize(null);

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

module.exports = {
  connect,
  connection,
  User: model('user', userSchema),
};
