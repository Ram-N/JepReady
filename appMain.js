// ADD YOUR OPENMINDS APP ID HERE
var APP_ID = '5021953d94d94a0dc100126f'; //JepReady's AppId
//var APP_ID = '5026153494d94a29659aa97f'; //JepReady on GitHub

// SPECIFY URL OF YOUR REDIRECT URL HERE
var REDIRECT_URI = 'http://localhost/~u163202/JepReady/oauth_redirect.html';
//var REDIRECT_URI = 'http://ram-n.github.com/JepReady/oauth_redirect.html';

// The OpenMinds API host. (You don't need to change this)
var API_ROOT = 'http://api.openminds.io';


//Global Parameters here
// example usage: alert(glob.debug_flag); 
var glob = { 
    mode: "p",
    solution_visible: 0,
    reviewed: 0,
    correct:0,
    wrong:0,
    debug_flag : 0, 
}; 

var viewedArray = [];

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



/**
 * Once we have an access token, fetch a list through the OpenMinds API
 * and start the flashcard app with the list.
 */
function initApp() {    

    createCardElements(); //AppView.js
    createMenuElements();
    displayAppMenuPage();
    console.log("mode", glob.mode);
}


function displayAppMenuPage(){


    var listId = getListIDfromArray(); //in omutils.js 
    var $ropt1 = $('#r-option');
    var $ropt2 = $('#r2');

    $('#menuPage').show();
    $('#flashcards').hide();

    $ropt1.click(function() {
	glob.mode = "p";
	getList(listId, function(list) {
	    startMainApp(list);
	});	    

    });

    $ropt2.click(function() {
	glob.mode = "t";
	getList(listId, function(list) {
	    startMainApp(list);
	});	    

    });

}


/**
 * Starts the main app using the given OpenMinds list.
 */
function startMainApp(list) {

    var currentIndex = 0; 
    var showDefn = false;

    var $oknext = $('#small_next');
    var $missednext = $('#missed_next');
    var $backbutton = $('#button');
    var     $score = $('#score');

    glob.solution_visible= 0
    resetScores();
    initViewedArray();
    glob.reviewed = 0

    console.log("startMain mode", glob.mode);

    if (glob.mode == "t") {
	$score.show();
    }

    function showCurrentFlashcard() {
	var item = list.items[currentIndex]; //we have the item
	cardHasBeenViewed(currentIndex);
	$score.text(" Score " + glob.correct + " / " + (glob.reviewed-1));

	$('#word').text(item.defn); //note that for Jeopardy we switch word and defn. The answer is shown first.
	$('#index').text((currentIndex+1) + '/' + list.items.length);
	$('#defn').hide();
	if (showDefn) {
	    $('#defn').text(item.word);
	    $('#defn').show();
	}
    }

  function showNextFlashcard() {
      if (showDefn) { //display next card
	  currentIndex = (currentIndex + 1) % list.items.length;
      }
      //showDefn =  (showDefn) ? false : true; //toggling showDefn
      if (showDefn) {
	  showDefn=false; //toggling showDefn
	  $("#flashcard").flip({direction:'lr', color: '#5B90F6'});
	  glob.solution_visible= 0;
	  toggleNextElements();
      }
      else
      {
	  showDefn=true; //toggling showDefn
	  $("#flashcard").flip({direction:'lr', color: '#00f'});
	  glob.solution_visible= 1;
	  toggleNextElements();
      }
      showCurrentFlashcard();
  }

  function showPrevFlashcard() {
      if (showDefn !=1) { // display prev card
	  currentIndex = (currentIndex == 0) ? list.items.length - 1 : currentIndex - 1; //wrap around
      }
      //      showDefn =  (showDefn) ? false : true; //toggling showDefn

      if (showDefn) {
	  showDefn=false; //toggling showDefn
	  $("#flashcard").flip({direction:'rl', color: '#5B90F6'});
	  glob.solution_visible= 0;
	  toggleNextElements();
      }
      else
      {
	  showDefn=true; //toggling showDefn
	  $("#flashcard").flip({direction:'rl', color: '#00f'});
	  glob.solution_visible= 1;
	  //toggleNextElements(); No scoring when looking at prev options
      }
      showCurrentFlashcard();
  }



    $('#word').click(function() {
            alert("word clicked!");
        });
    $('#next').click(showNextFlashcard);
    $('#prev').click(showPrevFlashcard);

    $oknext.click(function(){
	updateScores(1);
	showNextFlashcard();
    });
    
    $missednext.click(function(){
	updateScores(0);
	showNextFlashcard();
    });


    $backbutton.click(function() {
	displayAppMenuPage();
    });


    $(window).keydown(function(e) {
	if (e.keyCode == 39) {
	    showNextFlashcard();
	} else if (e.keyCode ==37) {
	    showPrevFlashcard();
	}
    });


    // Render the list title and show the first flashcard.
    $('#menuPage').hide();
    $('#flashcards').show();
    $('#title').text(list.title);
    $('#app').show();


    showCurrentFlashcard();

} //ends function startMainApp
