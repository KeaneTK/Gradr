var UserMatchDB = require('../models/UserMatchDB.js');
var UserMatchStub = require('../stubs/UserMatchStub.js');

var userMatchDAO;

var init = function(mode) {
    if (mode == 'stub')
        userMatchDAO = new UserMatchStub();
    else if (mode == 'db')
        userMatchDAO = new UserMatchDB();
}

var addUserMatch = function(liker_id, likee_id, likes) {
    return userMatchDAO.addUserMatch(liker_id, likee_id, likes);
}

var getMatches = function(userID) {
    return userMatchDAO.getMatches(userID);
}

var getPreviouslyRatedIds = function(userID) {
    return userMatchDAO.getPreviouslyRatedIds(userID);
}

module.exports = {
    init: init,
    addUserMatch: addUserMatch,
    getMatches: getMatches,
    getPreviouslyRatedIds: getPreviouslyRatedIds
}