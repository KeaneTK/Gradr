var date = new Date();
var newUserName = date.toUTCString(); // ensures a unique username
var newUserPass = 'hunter2';

var desc = "Lorem ipsum etc etc etc etc";
var help = "I am bad at math, please help me.";
var school = "Univeristy of Manitoba";
var firstname = "Joe";
var lastname = "Schmoe";
var city = "Winnipeg";
var country = "Canada";
var courses = "COMP 1010, CHEM 1300, & Intro to Batman";
var birthMonth = "Apr";
var birthDate = "01";
var birthYear = "1993";

var appURL = 'http://localhost';

module.exports = {

	before : function(browser) {
		// Create an account to be able to access main page
		browser
			.useXpath()
			.url(appURL + '/signup')
			.waitForElementVisible('/html/body/div[3]/form', 1000)
			.assert.elementPresent('//*[@id="registerButton"]')
			.assert.elementPresent('//*[@id="cancelButton"]')
			.setValue('//*[@id="username"]', newUserName)
			.setValue('//*[@id="password"]', newUserPass)
			.setValue('//*[@id="confirmPassword"]', newUserPass)
			.click('//*[@id="registerButton"]')
			.waitForElementVisible('/html/body/div[3]/form', 1000) // redirect to login page
	},

	'Click like & dislike buttons' : function(browser) {
		browser
			.url(appURL) 
			.waitForElementVisible('/html/body', 10000)
			.setValue('//*[@id="username"]', newUserName)
			.setValue('//*[@id="password"]', newUserPass)
			.click('//*[@id="login-form"]/button')
			.waitForElementVisible('//*[@id="userCard"]', 10000)
			// Assert that a new user profile is pulled up after hitting 'like' button
			.getText('//*[@id="userFullName"]', function(user1) {
				browser
					.click('//*[@id="likeButton"]')
					.pause(3000) // allow time for AJAX to complete
					.getText('//*[@id="userFullName"]', function(user2) {
						this.assert.notEqual(user1.value, user2.value);
				})
			})
			// Assert that a new user profile is pulled up after hitting 'dislike' button
			.getText('//*[@id="userFullName"]', function(user1) {
				browser
					.click('//*[@id="dislikeButton"]')
					.pause(3000) // allow time for AJAX to complete
					.getText('//*[@id="userFullName"]', function(user2) {
						this.assert.notEqual(user1.value, user2.value);
				})
			})
			.end()
	},

	'Update user\'s profile' : function(browser) {

		browser
			.url(appURL) 
			.waitForElementVisible('/html/body', 10000)
			.setValue('//*[@id="username"]', newUserName)
			.setValue('//*[@id="password"]', newUserPass)
			.click('//*[@id="login-form"]/button')
			.waitForElementVisible('//*[@id="userCard"]', 10000)
			.url(appURL + '/profile')
			.waitForElementVisible('//*[@id="username"]', 10000)
			.assert.elementPresent('//*[@id="generalDescription"]')
			.assert.elementPresent('//*[@id="helpDescription"]')
			.assert.elementPresent('//*[@id="school"]')
			.assert.elementPresent('//*[@id="firstname"]')
			.assert.elementPresent('//*[@id="lastname"]')
			.assert.elementPresent('//*[@id="city"]')
			.assert.elementPresent('//*[@id="country"]')
			.assert.elementPresent('//*[@id="courses"]')
			.assert.elementPresent('//*[@id="birthMonth"]')
			.assert.elementPresent('//*[@id="birthDate"]')
			.assert.elementPresent('//*[@id="birthYear"]')
			.assert.elementPresent('//*[@id="deleteAccountButton"]')
			.click('//*[@id="editIcon"]')
			.setValue('//*[@id="generalDescription"]', desc)
			.setValue('//*[@id="helpDescription"]', help)
			.setValue('//*[@id="school"]', school)
			.setValue('//*[@id="firstname"]', firstname)
			.setValue('//*[@id="lastname"]', lastname)
			.setValue('//*[@id="city"]', city)
			.setValue('//*[@id="country"]', country)
			.setValue('//*[@id="courses"]', courses)
			.setValue('//*[@id="birthMonth"]', birthMonth)
			.setValue('//*[@id="birthDate"]', birthDate)
			.setValue('//*[@id="birthYear"]', birthYear)
			.execute('scrollTo(0,0)')
			.click('//*[@id="editIcon"]')
			.waitForElementVisible('//*[@id="username"]', 10000)
			.pause(10000)
			.getValue('//*[@id="generalDescription"]', function(found) {
						this.assert.equal(found.value, desc);
			})
			.getValue('//*[@id="helpDescription"]', function(found) {
						this.assert.equal(found.value, help);
			})
			.getValue('//*[@id="school"]', function(found) {
						this.assert.equal(found.value, school);
			})
			.getValue('//*[@id="firstname"]', function(found) {
						this.assert.equal(found.value, firstname);
			})
			.getValue('//*[@id="lastname"]', function(found) {
						this.assert.equal(found.value, lastname);
			})
			.getValue('//*[@id="city"]', function(found) {
						this.assert.equal(found.value, city);
			})
			.getValue('//*[@id="country"]', function(found) {
						this.assert.equal(found.value, country);
			})
			.getValue('//*[@id="courses"]', function(found) {
						this.assert.equal(found.value, courses);
			})
			.getValue('//*[@id="birthMonth"]', function(found) {
						this.assert.equal(found.value, '04');
			})
			.getValue('//*[@id="birthDate"]', function(found) {
						this.assert.equal(found.value, birthDate);
			})
			.getValue('//*[@id="birthYear"]', function(found) {
						this.assert.equal(found.value, birthYear);
			})/*
			.assert.containsText('//*[@id="helpDescription"]', help)
			.assert.containsText('//*[@id="school"]', school)
			.assert.containsText('//*[@id="firstname"]', firstname)
			.assert.containsText('//*[@id="lastname"]', lastname)
			.assert.containsText('//*[@id="city"]', city)
			.assert.containsText('//*[@id="country"]', country)
			.assert.containsText('//*[@id="courses"]', courses)
			.assert.containsText('//*[@id="birthMonth"]', birthMonth)
			.assert.containsText('//*[@id="birthDate"]', birthDate)
			.assert.containsText('//*[@id="birthYear"]', birthYear)*/
			.end();
	}
}