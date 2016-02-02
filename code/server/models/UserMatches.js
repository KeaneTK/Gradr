var Sequelize = require("sequelize");
var connection = require("../database.js");
var User = require("./User.js");

UserMatches = connection.define('user_matches', {
    liker_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: User.model,
            key: 'id'
        },
        allowNull: false
    },
    likee_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: User.model,
            key: 'id'
        },
        allowNull: false
    },
    likes: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

UserMatches.sync();

var addUserMatch = function(_liker_id, _likee_id, _likes) {
    UserMatches.findOrCreate({
        where: {
            liker_id: _liker_id,
            likee_id: _likee_id
        },
        defaults: {
            likes: !!_likes
        }
    }).spread(function(result, created) {
        // console.log(result);
        // console.log(created);
    }).catch(function(errors) {
        console.log("ERROR: Sequelize errors occured while adding match for userIDs %d and %d", 
                _liker_id, _likee_id);
    });
};

var getMatches = function(userId) {
    console.log('userID: ' + userId);
    return connection.query(
        'SELECT um2.liker_id as userId FROM user_matches um2 WHERE um2.liker_id IN (SELECT um1.likee_id FROM user_matches um1 WHERE um1.liker_id = :userId AND um1.likes) AND um2.likee_id = :userId AND um2.likes',
        { replacements: { userId: userId }, type: connection.QueryTypes.SELECT } ).then(function(users) {
            var ids = []
            for(var i=0; i < users.length; i++)
            {
                ids[i] = users[i].userId;
            }
            return ids;
    });
}

module.exports = {
    addUserMatch: addUserMatch,
    getMatches: getMatches
};