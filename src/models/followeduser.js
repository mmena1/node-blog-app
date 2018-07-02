'use strict';
module.exports = (sequelize, DataTypes) => {
  var FollowedUser = sequelize.define('FollowedUser', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  FollowedUser.associate = function(models) {
    // associations can be defined here
  };
  return FollowedUser;
};