var Sequelize = require("sequelize");
var connection = require("../database.js");
var bcrypt = require("bcrypt")

UserConnection = connection.define('users', {
	username: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

UserConnection.sync()


var getUser = function(username) {
	return UserConnection.findOne({
		where:{
			username: username
		}
	});
}

var createUser = function(credentials) {
	bcrypt.genSalt(10, function(err, salt){
		bcrypt.hash(credentials.password, salt, function(err,hash){
			UserConnection.create({
				username: credentials.username,
				password: hash
			});
		});
	});
	return UserConnection.findOne({
		where:{
			username: credentials.username
		}
	});
}

var getRandom = function() {
	return UserConnection.findAll().then(function(users){
		return users[Math.floor(Math.random() * users.length)];var rand = users[Math.floor(Math.random() * users.length)];
	});
}


module.exports = {
	getUser: getUser,
	createUser: createUser,
	getRandom: getRandom
}