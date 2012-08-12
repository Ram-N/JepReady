// ADD YOUR OPENMINDS APP ID HERE
//var APP_ID = '5021953d94d94a0dc100126f'; //JepReady's AppId
var APP_ID = '5026153494d94a29659aa97f'; //JepReady on GitHub


// SPECIFY URL OF YOUR REDIRECT URL HERE
//var REDIRECT_URI = 'http://localhost/~u163202/JepReady/oauth_redirect.html';
var REDIRECT_URI = 'http://ram-n.github.com/JepReady/oauth_redirect.html';

// The OpenMinds API host. (You don't need to change this)
var API_ROOT = 'http://api.openminds.io';

// ID of the list to fetch through the OpenMinds API.
//We will be changing this to get multiple lists
var DEFAULT_LIST_ID = '4fe11565d6b77f037b000a7a';

/*
 *
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
  om.logIn({
    appId: APP_ID,
    redirectUri: REDIRECT_URI,
    callback: function(accessToken) {
      if (accessToken) {
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
 * Once we have an access token, fetch a list through the OpenMinds API
 * and start the flashcard app with the list.
 */
function postLogIn() {
  $('#login').hide();
  $('#logout').show();
  $('#logged-out').hide();
  getList(DEFAULT_LIST_ID, function(list) {
    startMainApp(list);
  });
}


/**
 * Fetches the given list through the OpenMinds API.
 * @param {String} listId the id of the list to fetch from OpenMinds.
 * @param {Function} success The handler to call after fetching the list. The
 *   JSON list data is passed in as the first argument to the handler.
 */
function getList(listId, success) {
  $.ajax({
    url: API_ROOT + '/0/data/lists/' + listId,
    dataType: 'json',
    data: {
      'sort': 'adaptive',
      },
    headers: {
      'X-OpenMinds-Access-Token': om.accessToken,
      },
    success: success,
  });
}


/**
 * Starts the main app using the given OpenMinds list.
 */
function startMainApp(list) {
  var currentIndex = 0; 
  var showDefn = false;

  function showCurrentFlashcard() {
    var item = list.items[currentIndex]; //we have the item
    $('#word').text(item.word);
    $('#index').text((currentIndex+1) + '/' + list.items.length);
    $('#defn').hide();
    if (showDefn) {
	$('#defn').text(item.defn);
	$('#defn').show();
      }
  }

  function showNextFlashcard() {
      if (showDefn) { //display next card
	  currentIndex = (currentIndex + 1) % list.items.length;
      }
      showDefn =  (showDefn) ? false : true; //toggling showDefn
      showCurrentFlashcard();
  }

  function showPrevFlashcard() {
      if (showDefn !=1) { // display prev card
	  currentIndex = (currentIndex == 0) ? list.items.length - 1 : currentIndex - 1; //wrap around
      }
      showDefn =  (showDefn) ? false : true; //toggling showDefn
      showCurrentFlashcard();
  }



  $('#next').click(showNextFlashcard);
  $('#prev').click(showPrevFlashcard);
  $(window).keydown(function(e) {
    if (e.keyCode == 39) {
      showNextFlashcard();
    } else if (e.keyCode ==37) {
      showPrevFlashcard();
    }
  });

  // Render the list title and show the first flashcard.
  $('#title').text(list.title);
  $('#app').show();
  showCurrentFlashcard();

} //ends function startMainApp
