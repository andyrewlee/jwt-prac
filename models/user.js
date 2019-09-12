'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    encryptedPassword: DataTypes.STRING
  }, { tableName: 'users', underscored: true });

  return User;
};