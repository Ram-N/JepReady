//Javascript document


//If your App has any Global variables/parameters, ADD them here
// example usage: alert(glob.debugFlag); 
var glob = { 
    mode: "p", //can be (p)ractice, (r)eview, or (t)est
    listID: 0,
    activeListTitle: "Active List",
    solutionVisible: 0,
    reviewed: 0,
    correct:0,
    wrong:0,
    debugFlag : 0, 
}; 

var viewedArray = [];

var omlists = ["5031ec0494d94a742611635f","4ffb717e94d94a744b000796", "4ffb717e94d94a744b000796"];

/**
 * Once we have an access token, fetch a list through the OpenMinds API
 * and start the flashcard app with the list.
 */
function initApp() {    

    createCardElements(); //AppView.js
    createListElements();
    createMenuElements();

    displayAppMenuPage();
    glob.listID = getListIDfromArray(); //in omutils.js 
}


function displayAppMenuPage(){

    var listId;

    var $opt21 = $('#anc21');

    var $opt12 = $('#anc12');
    var $opt22 = $('#anc22');
    var $opt32 = $('#anc32');

    $('#menuPage').show();
    $('#listPage').hide();
    $('#flashcards').hide();
    $('#listTitle').text(glob.activeListTitle);

    glob.solutionVisible= 0;
    resetScores();
    initViewedArray();
    glob.reviewed = 0;

    $opt21.click(function() {
	displayListPage();
    });

    listId = glob.listID;

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


function updateActiveList(list){
    
    glob.activeListTitle = list.title;

}


function displayListPage(){

    var $backbutton = $('#l_button');
    var $opt11 = $('#lopt11');
    var $opt21 = $('#lopt21');
    var $opt31 = $('#lopt31');

    $('#listPage').show();
    $('#menuPage').hide();
    $('#flashcards').hide();

    $opt11.click(function() {
	glob.listID = omlists[0];
	getList(glob.listID, function(list) {
	    updateActiveList(list);
	});	    
	displayAppMenuPage();
    });

    $opt21.click(function() {
	glob.listID = omlists[1];
	getList(glob.listID, function(list) {
	    updateActiveList(list);
	});	    
	displayAppMenuPage();
    });

    $opt31.click(function() {
	glob.listID = omlists[2];
	getList(glob.listID, function(list) {
	    updateActiveList(list);
	});	    
	displayAppMenuPage();
    });

    $backbutton.click(function() {
	displayAppMenuPage();
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

    glob.solutionVisible= 0;
    resetScores();
    initViewedArray();
    glob.reviewed = 0;

    console.log("startMain mode", glob.mode);

    if (glob.mode == "t") {
	$score.show();
    }
    else {
	$score.hide();
    }

    function showCurrentFlashcard() {
	var item = list.items[currentIndex]; //we have the item
	$score.text(" Score " + glob.correct + " / " + (glob.reviewed));

	$('#word').text(item.defn); //note that for Jeopardy we switch word and defn. The answer is shown first.
	$('#index').text((currentIndex+1) + '/' + list.items.length);
	$('#defn').hide();
	if (showDefn) {
	    defnHasBeenViewed(currentIndex);
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
		toggleNextElements(currentIndex);
	    }
	    else
	    {
		showDefn=true; //toggling showDefn
		$("#flashcard").flip({direction:'lr', color: '#00f'});
		glob.solutionVisible= 1;
		toggleNextElements(currentIndex);
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
		showRaQuo();
		//toggleNextElements(currentIndex);
	    }
	    else
	    {
		showDefn=true; //toggling showDefn
		$("#flashcard").flip({direction:'rl', color: '#00f'});
		glob.solutionVisible= 1;
		showRaQuo();
	    }
	}
	
	showCurrentFlashcard();
    }


    $('#next').click(showNextFlashcard);
    $('#prev').click(showPrevFlashcard);

    $oknext.click(function(){
	glob.correct++;
	//updateScores(1);
	//alert($oknext.length);
	showNextFlashcard();
    });
    
    $missednext.click(function(){
	glob.wrong++;
	//updateScores(0);
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
	glob.solutionVisible= 0;
	resetScores();
	initViewedArray();
	glob.reviewed = 0;
	displayAppMenuPage();
    });


} //ends function startMainApp
