var app = require('../main.js');
var request = require('supertest');
var assert = require('assertthat'); // View README for documentation https://github.com/thenativeweb/assertthat
var api = require('../routes/api.js');
var stubUser = require('../stub_models/StubUser.js');
var stubLikes = require('../stub_models/StubUserMatches.js');
//////////////////////////////////////////
// ALL API TESTS SHOULD GO IN THIS FILE // 
//////////////////////////////////////////

describe('api', function() {
          api.injectUser(stubUser);
          api.injectLikes(stubLikes);
    // This is just a description, not the actual route the test will use
    describe('GET /api/getUser', function() {
        it('requests a user from the api', function(done) {
            request(app)
            .get('/api/getUser?user=mattmcmurray') // change to one of the users actually in the test db data
            .expect(200) 
            .expect('Content-Type', 'application/json; charset=utf-8') // self explanatory
            .end(function(err, res) {
                if (err) done(err); // exit if there's an error
                assert.that(res.body.user).is.not.null(); // assert the key 'user' is in the json response
                assert.that(res.body.user.username).is.equalTo("mattmcmurray");
                assert.that(res.body.user.firstname).is.equalTo("matt");
                assert.that(res.body.user.lastname).is.equalTo("mcmurray");
                done();
            });
        });

        it('requests a non-existant user from the api', function(done) {
            request(app)
            .get('/api/getUser?user=MichaelMcDoesntExist')
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end(function(err, res) {
                if(err) done(err);
                assert.that(res.body.user).is.null();
                done();
            });
        });
    });

    describe('POST /NewUser', function() {
        it('creates a new user', function(done) {
            request(app)
            .post('/api/NewUser')
            .type('form')
            .send({'username': 'TestingUsername', 'password': 'password', 'confirmPassword': 'password'})
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end(function(err, res) {
                if(err) done(err);
                assert.that(res.body.message).is.not.null();
                assert.that(res.body.message).is.equalTo('New user created');
                assert.that(res.body.url).is.equalTo('/');
                done();
            });
        });
    });

    describe('POST /ProfileUpdate', function() {
        it('updates a user profile', function(done) {
            request(app)
            .post('/api/ProfileUpdate')
            .send({'username': 'mattmcmurray', 'firstname': 'matt', 'lastname': 'mcmurray', 'city': 'Brandon', 'country': 'Canada', 'school': 'Red River College', 'courses': 'Distributed Systems', 'generalDescription': '', 'helpDescription': '', 'dateOfBirth': null})
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end(function(err, res) {
                if(err) done(err);
                assert.that(res.body.message).is.not.null();
                assert.that(res.body.message).is.equalTo('User profile updated');
                assert.that(res.body.url).is.equalTo('/');

                request(app)
                .get('/api/getUser?user=mattmcmurray') // change to one of the users actually in the test db data
                .expect(200) 
                .expect('Content-Type', 'application/json; charset=utf-8') // self explanatory
                .end(function(err, res) {
                    if (err) done(err); // exit if there's an error
                    assert.that(res.body.user).is.not.null(); // assert the key 'user' is in the json response
                    assert.that(res.body.user.username).is.equalTo("mattmcmurray");
                    assert.that(res.body.user.firstname).is.equalTo("matt");
                    assert.that(res.body.user.lastname).is.equalTo("mcmurray");
                    assert.that(res.body.user.city).is.equalTo("Brandon");
                    done();
                });
            });
        });
    });

   /* describe('POST /login', function() {
        it('logins in a user', function(done) {
            request(app)
            .post('/api/login')
            .send({'username': 'mattmcmurray', 'password': 'kraus'})
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end(function(err, res) {
                if(err) done(err);
                assert.that(res.body.user).is.not.null();
                assert.that(res.body.user.username).is.equalTo('KeaneKraus');
                assert.that(res.body.url).is.equalTo('/main');
                done();
            });
        });

        it('fails logins in a user because of username', function(done) {
            request(app)
            .post('/api/login')
            .send({'username': 'MichaelMcDoesntExist', 'password': 'kraus'})
            .expect(500)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end(function(err, res) {
                if(err) done(err);
                assert.that(res.body.message).is.not.null();
                assert.that(res.body.message).is.equalTo('Oops! Something went wrong. Invalid username/password.');
                done();
            });
        });

        it('fails logins in a user because of password', function(done) {
            request(app)
            .post('/api/login')
            .send({'username': 'mattmcmurray', 'password': 'this password'})
            .expect(500)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end(function(err, res) {
                if(err) done(err);
                assert.that(res.body.message).is.not.null();
                assert.that(res.body.message).is.equalTo('Oops! Something went wrong. Invalid username/password.');
                done();
            });
        });
    });*/

    describe('GET /randomUser', function() {
        it('gets a random user', function(done) {
            request(app)
            .get('/api/randomUser')
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end(function(err, res) {
                if(err) done(err);
                assert.that(res.body.username).is.not.null();
                assert.that(res.body.userID).is.not.null();
                done();
            });
        });
    });

    describe ('GET /api/getPotentialMatches', function() {
        it('requests a list of users that are a match for a provided userID', function(done) {
            request(app)
            .get('/api/getPotentialMatches')
            .send({'userId': 111})
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end(function(err, res) {
                if (err) done(err); // exit if there's an error
                assert.that(res.body.matches).is.not.null();
                assert.that(res.body.matches.length).is.equalTo(1);
                assert.that(res.body.matches[0].id).is.not.null();
                assert.that(res.body.matches[0].id).is.equalTo(222);
                done();
            });
        });
        it('requests a list of matches when none exist', function(done) {
            request(app)
            .get('/api/getPotentialMatches')
            .send({userId: 3})
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end(function(err, res) {
                if(err) done(err);
                assert.that(res.body.matches).is.not.null();
                assert.that(res.body.matches.length).is.equalTo(0);
                done();
            });
        });
    });
});