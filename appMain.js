// ADD YOUR OPENMINDS APP ID HERE
var APP_ID = '5021953d94d94a0dc100126f'; //JepReady's AppId
//var APP_ID = '5026153494d94a29659aa97f'; //JepReady on GitHub

// SPECIFY URL OF YOUR REDIRECT URL HERE
var REDIRECT_URI = 'http://localhost/~u163202/JepReady/oauth_redirect.html';
//var REDIRECT_URI = 'http://ram-n.github.com/JepReady/oauth_redirect.html';

// The OpenMinds API host. (You don't need to change this)
var API_ROOT = 'http://api.openminds.io';


var glob = { 
    mode: "p",
    debug_flag : 1, 
    debug_cards : 0
}; // usage: alert(glob.debug_flag); 



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

    var listId = getListIDfromArray(); //in omutils.js 


    createCardElements();

    displayAppMainPage();

    console.log("mode", glob.mode);

    $(window).keydown(function(e) {
	if (e.keyCode == 39) {
	    getList(listId, function(list) {
		startMainApp(list);
	    });	    
	}	     
    });

}


function displayAppMainPage(){

    var $menuPage = $('<div id="menuPage">  </div>');

    //TODO: make these into function calls
    var $ropt1 = $('<a id="r-option" href="#" ></a>');
    var $ropt2 = $('<a id="r-option" href="#" ></a>');

    var $lopt1 = $('<a id="l-option" href="#" > </a>');
    var $lopt2 = $('<a id="l-option" href="#" > </a>');

    var $br = $('<br> </br>');

    $('#app').show();
    $('#flashcards').hide();

    $('#app').prepend($menuPage);
    $('#menuPage').append($ropt1);
    $('#menuPage').append($ropt2);

    $('#menuPage').append($lopt1);
    $('#menuPage').append($lopt2);
    
    $ropt1.text("Practice");
    $ropt2.text("Self-test");

    $lopt1.text("Select List");
    $lopt2.text(" ");

    var listId = getListIDfromArray(); //in omutils.js 
    
/*    $('#r-option').click(getList(listId, function(list){
	startMainApp(list);
    }));
*/

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
 * Creates a few elements in the Actual app screen. Attach to the right place
 * This function is called initially, only once.
 * After this call, the elements are controlled with show() and hide() functions
 */
function createCardElements() {


    var $oknext = $('<a id="small_next" href="#">&#10003;</a>'); //check mark
    var $missednext = $('<a id="missed_next" href="#">&#10006;</a>'); //heavy cross
    var $backbutton = $('<a id="button" href="#" > </a>');

    $backbutton.text("Back to Main");
    $('#flashcards').append($oknext);
    $('#flashcards').append($missednext);
    $('#flashcards').append($backbutton);


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


    console.log("startMain mode", glob.mode);

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
      //showDefn =  (showDefn) ? false : true; //toggling showDefn
      if (showDefn) {
	  showDefn=false; //toggling showDefn
	  $("#flashcard").flip({direction:'lr', color: '#00f'});
      }
      else
      {
	  showDefn=true; //toggling showDefn
	  $("#flashcard").flip({direction:'lr', color: '#5B90F6'});
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
	  $("#flashcard").flip({direction:'rl', color: '#00f'});
      }
      else
      {
	  showDefn=true; //toggling showDefn
	  $("#flashcard").flip({direction:'rl', color: '#5B90F6'});
      }
      showCurrentFlashcard();
  }



    $('#word').click(function() {
            alert("word clicked!");
        });
    $('#next').click(showNextFlashcard);
    $('#prev').click(showPrevFlashcard);

    $oknext.click(showNextFlashcard);
    $missednext.click(showNextFlashcard);


    $backbutton.click(function() {
	$('#flashcards').hide();
	$('#menuPage').show();
    });


    $(window).keydown(function(e) {
	if (e.keyCode == 39) {
	    showNextFlashcard();
	} else if (e.keyCode ==37) {
	    showPrevFlashcard();
	}
    });



    if (glob.mode == "t") {
	$('#next').hide();
	$oknext.show();
	$missednext.show();
    }
    if (glob.mode == "p") {
	$('#next').show();
	//$('#small_next').hide();
	$oknext.hide();
	$missednext.hide();
    }

    $('#menuPage').hide();
    $('#flashcards').show();

    // Render the list title and show the first flashcard.
    $('#title').text(list.title);
    $('#app').show();

    showCurrentFlashcard();

} //ends function startMainApp
