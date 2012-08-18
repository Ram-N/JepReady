//Javascript document


//If your App has any Global variables/parameters, ADD them here
// example usage: alert(glob.debugFlag); 
var glob = { 
    mode: "p", //can be (p)ractice, (r)eview, or (t)est
    solutionVisible: 0,
    reviewed: 0,
    correct:0,
    wrong:0,
    debugFlag : 0, 
}; 

var viewedArray = [];


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
    var $opt12 = $('#anc12');
    var $opt22 = $('#anc22');
    var $opt32 = $('#anc32');

    $('#menuPage').show();
    $('#flashcards').hide();

    $opt12.click(function() {
	glob.mode = "p";
	getList(listId, function(list) {
	    startMainApp(list);
	});	    
    });

    $opt22.click(function() {
	glob.mode = "r";
	getList(listId, function(list) {
	    startMainApp(list);
	});	    
    });
    
    $opt32.click(function() {
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

    glob.solutionVisible= 0
    resetScores();
    initViewedArray();
    glob.reviewed = 0

    console.log("startMain mode", glob.mode);

    if (glob.mode == "t") {
	$score.show();
    }
    else {
	$score.hide();
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

	if(glob.mode == "r") {
	    currentIndex = (currentIndex + 1) % list.items.length;
	}
	else { //mode is p or t
	    if (showDefn) { //display next card
		currentIndex = (currentIndex + 1) % list.items.length;
	    }
	    //showDefn =  (showDefn) ? false : true; //toggling showDefn
	    if (showDefn) {
		showDefn=false; //toggling showDefn
		$("#flashcard").flip({direction:'lr', color: '#5B90F6'});
		glob.solutionVisible= 0;
		toggleNextElements();
	    }
	    else
	    {
		showDefn=true; //toggling showDefn
		$("#flashcard").flip({direction:'lr', color: '#00f'});
		glob.solutionVisible= 1;
		toggleNextElements();
	    }
	}

	showCurrentFlashcard();
    }

    function showPrevFlashcard() {

	if(glob.mode == "r") {
	    currentIndex = (currentIndex == 0) ? list.items.length - 1 : currentIndex - 1; //wrap around
	}
	else {
	    if (showDefn !=1) { // display prev card
		currentIndex = (currentIndex == 0) ? list.items.length - 1 : currentIndex - 1; //wrap around
	    }

	    if (showDefn) {
		showDefn=false; //toggling showDefn
		$("#flashcard").flip({direction:'rl', color: '#5B90F6'});
		glob.solutionVisible= 0;
		toggleNextElements();
	    }
	    else
	    {
		showDefn=true; //toggling showDefn
		$("#flashcard").flip({direction:'rl', color: '#00f'});
		glob.solutionVisible= 1;
		//toggleNextElements(); No scoring when looking at prev options
	    }
	}
	
	showCurrentFlashcard();
    }


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

    $backbutton.click(function() {
	displayAppMenuPage();
    });


} //ends function startMainApp
