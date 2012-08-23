//Javascript document


//If your App has any Global variables/parameters, ADD them here
// example usage: alert(glob.debugFlag); 
var glob = { 
    mode: "p", //can be (p)ractice, (r)eview, or (t)est
    listID: "4ffb717e94d94a744b000796", //default list
    list: {},
    activeListTitle: "Active List",
    solutionVisible: 0, //boolean 0/1 to know whether solution is being shown
    reviewed: 0, //number of cards that the user has seen. The denominator
    correct:0,
    wrong:0,
    debugFlag : 0, 
    currentIndex:0,
    showDefn: false,
}; 

var viewedArray = [];

var omlists = [
    "5031ec0494d94a742611635f", "5031ec0494d94a742611635f", "5031ec0494d94a742611635f"];


/**
 * Once we have an access token, fetch a list through the OpenMinds API
 * and start the flashcard app with the list.
 */
function initApp() {    

    createCardElements(); //AppView.js
    createListElements();
    createMenuElements();

    bindClickEvents();

    glob.listID = getListIDfromArray(); //in omutils.js 
    displayAppMenuPage();

}



/*
 * These binding are performed once per session.
 */
function bindClickEvents(){

    var listId;
    var $opt21 = $('#anc21');
    var $opt12 = $('#anc12');
    var $opt22 = $('#anc22');
    var $opt32 = $('#anc32');
    
    $opt21.click(function() {
	displayListPage();
    });

    $opt12.click(function() {
	glob.mode = "p";
	getList(glob.listID, function(list) {
	    initReviewMode();
	    glob.list = list;
	    startCardsReview(list);
	});	    
    });

    $opt22.click(function() {
	glob.mode = "r";
	getList(glob.listID, function(list) {
	    initReviewMode();
	    glob.list = list;
	    startCardsReview(list);
	});	    
    });
    
    $opt32.click(function() {
	glob.mode = "t";
	getList(glob.listID, function(list) {
	    initReviewMode();
	    glob.list = list;
	    startCardsReview(list);
	});
    });


    $('#next').click(function() {
	showNextFlashcard();
    });

    $('#prev').click(function() {
	showPrevFlashcard();
    });

    var $oknext = $('#small_next');
    var $missednext = $('#missed_next');

    $oknext.bind('click', function() {
	//alert(glob.correct +  " matches " + $oknext.length);
	glob.correct++;
	//updateScores(1);
	//alert($oknext.length);
	//$next.triggerHandler('click');
	showNextFlashcard();
    });

    $missednext.click(function(){
	glob.wrong++;
	//updateScores(0);	
	showNextFlashcard();
    });




    var $lBackbutton = $('#l_button');
    $lBackbutton.click(function() {
	displayAppMenuPage();
    });

    var $backbutton = $('#button');
    $backbutton.click(function() {
	glob.solutionVisible= 0;
	resetScores();
	initViewedArray();
	glob.reviewed = 0;
	glob.correct = 0;
	displayAppMenuPage();
    });



    var $lopt11 = $('#lopt11');
    var $lopt21 = $('#lopt21');
    var $lopt31 = $('#lopt31');

    $lopt11.click(function() {
	glob.listID = omlists[0];
	getList(glob.listID, function(list) {
	    updateActiveList(list);
	});	    
	displayAppMenuPage();
    });

    $lopt21.click(function() {
	glob.listID = omlists[1];
	getList(glob.listID, function(list) {
	    updateActiveList(list);
	});	    
	displayAppMenuPage();
    });

    $lopt31.click(function() {
	glob.listID = omlists[2];
	getList(glob.listID, function(list) {
	    updateActiveList(list);
	});
	displayAppMenuPage();
    });


    // some key bindings
    $(window).keydown(function(e) {
	if (e.keyCode == 39) {
	    showNextFlashcard();
	} else if (e.keyCode ==37) {
	    showPrevFlashcard();
	}

	if (e.keyCode == 38 && (glob.mode == "r")) {  //up arrow
	    //displayDefinition();
	    $defn.show();
	    $question.slideUp();	    
	}
    });






}

/* depending on the mode that the user selects
 * r t or p
 * the flashcards and buttons are initialized accordingly.
 * This is helpful when user switches from one mode to another
 */

function initReviewMode(){

    var $oknext = $('#small_next');
    var $missednext = $('#missed_next');
    var $score = $('#score');
    var $defn = $('#defn');
    var $question = $('#word');
    var $next = $('#next');
    var $prev = $('#prev');

    if (glob.mode == "t") {
	$score.show();
	$next.show()
	$prev.show();
	$oknext.hide();
	$missednext.hide();
    }

    if (glob.mode == "r") {
	$score.hide();
	$next.show()
	$oknext.hide();
	$missednext.hide();
	$prev.show();
	$defn.hide();
	$question.show();	    
    }

    if (glob.mode == "p") {
	$score.hide();
	$next.show()
	$oknext.hide();
	$missednext.hide();
	$prev.show();
    }

    
}


function updateActiveList(list){
    
    glob.activeListTitle = list.title;
    $('#listTitle').text(glob.activeListTitle);
}



/**
 * Starts the main app using the given OpenMinds list.
 */

function startCardsReview(list) {

    glob.solutionVisible= 0;
    resetScores();
    initViewedArray();
    glob.reviewed = 0;
    glob.correct = 0;
    glob.currentIndex = 0;
    
    console.log("startCardsReview mode", glob.mode);


    // Render the list title and show the first flashcard.
    $('#menuPage').hide();
    $('#flashcards').show();
    $('#title').text(glob.list.title);
    
    showCurrentFlashcard();


} //ends function startCardsReview




