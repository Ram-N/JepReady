// Configure your App to work with OpenMinds in this file.


// ADD YOUR OPENMINDS APP ID HERE
//var APP_ID = '5021953d94d94a0dc100126f'; //JepReady's AppId
var APP_ID = '5026153494d94a29659aa97f'; //JepReady on GitHub

// SPECIFY URL OF YOUR REDIRECT URL HERE
//var REDIRECT_URI = 'http://localhost/~u163202/JepReady/oauth_redirect.html';
var REDIRECT_URI = 'http://ram-n.github.com/JepReady/oauth_redirect.html';

// The OpenMinds API host. (You don't need to change this)
var API_ROOT = 'http://api.openminds.io';


/*
 * Assumes that there is an ID called '#app'
 */
function init() {
  if (localStorage.getItem('omAccessToken')) {
    console.log("in init. Found omAccessToken");
    om.accessToken = localStorage.getItem('omAccessToken');
    postLogIn();
    $('#logged-out').hide();
  } else {
    console.log("In init. Need to login and get accessToken");
    $('#login').show();
    $('#logout').hide();
    $('#app').hide();
  }
}


/**
 * Logs the user in with OpenMinds and stores the API access token
 * in local storage. If the login is successful, start the flashcard app.
 */
function login() {
    //om.login is an openMinds_connect.js function
    console.log("in login");
    om.logIn({
	appId: APP_ID,
	redirectUri: REDIRECT_URI,
	callback: function(accessToken) {
	    if (accessToken) {
		console.log("calling postLogIn");
		postLogIn();
	    }
	}
    });

}


/**
 * Logs the user out of OpenMinds and clears the access token from
 * local storage. Shows the logged-out view of the page.
 */
function logout() {
  om.logOut(function() {
    $('#app').hide();
    $('#logout').hide();
    $('#logged-out').show();
    $('#login').show();
  });
}

/** No need to change anything about the 3 functions above **/

/**
 * Once we have an access token, we are ready to initiate the main App
 */
function postLogIn() {
    console.log("in postLogIn");
    $('#login').hide();
    $('#logout').show();
    $('#logged-out').hide();
    console.log("in postLogIn");
    initApp();
  }




