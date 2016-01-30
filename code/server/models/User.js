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
	}, 
	firstname: {
		type: Sequelize.STRING
	}, 
	lastname: {
		type: Sequelize.STRING
	}, 
	city: {
		type: Sequelize.STRING
	}, 
	country: {
		type: Sequelize.STRING
	}, 
	school: {
		type: Sequelize.STRING
	}, 
	courses: {
		type: Sequelize.STRING
	}, 
	//A string for information not captured by the other fields.
	generalDescription: {
		type: Sequelize.STRING
	}, 
	//A string for describing what courses/subject you are looking for help with
	helpDescription: {
		type: Sequelize.STRING
	}, 
	dateOfBirth: {
		type: Sequelize.DATE
	}
});
//If you get missing column errors, run the commented sync once to rebuild the tables
//UserConnection.sync({force:true})
UserConnection.sync();


var getUser = function(username) {
	return UserConnection.findOne({
		where:{
			username: username
		}
	});
}

var getAllUsers = function() {
	return UserConnection.findAll();
}

var createUser = function(credentials) {
	
	bcrypt.genSalt(10, function(err, salt){
		bcrypt.hash(credentials.password, salt, function(err,hash){
			UserConnection.create({
				username: credentials.username,
				password: hash,
				firstname: '',
				lastname: '',
				city: '',
				country: '',
				school: '',
				courses: '',
				generalDescription: '',
				helpDescription: '',
				dateOfBirth: null
			});
		});
	});
}

var createUserProfile = function(data) {
	UserConnection.update({
		firstname: data.firstname,
		lastname: data.lastname,
		city: data.city,
		country: data.country,
		school: data.school,
		courses: data.courses,
		generalDescription: data.generalDescription,
		helpDescription: data.helpDescription,
		dateOfBirth: data.dateOfBirth
	},
	{
		where: { username: data.username}
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
	getRandom: getRandom,
	getAllUsers: getAllUsers,
	createUserProfile:createUserProfile
}