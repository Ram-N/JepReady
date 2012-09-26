

//var omlists = ["4fe8dd92d6b77f5461000259","4fe11565d6b77f037b000a7a","4ff39c3a94d94a04370000cb","4ffb717e94d94a744b000796", "501a3c9894d94a0dc100052e"];


function updateScores(gotit) {
    var $score = $('#score');

    if (glob.mode == "p" || glob.mode == "r") {
	return;
    }

    if(gotit){
	glob.correct = glob.correct+1;
    }
    else{
	glob.wrong = glob.wrong+1;
    }

    if(glob.reviewed != 0) {
	glob.percentCorrect = Math.round((glob.correct/glob.reviewed)*100);
    }

}


function storeTitle(list){
    omListTitle.push(list.title);
    
// display all values
    for (var i = 0; i < omListTitle.length; i++) {
	console.log(i, omListTitle[i]);
    }
}


function populateOMListTitles(){
    var i;
    for (i=0; i<NUMLISTS; i++){
	getList(omlists[i], function(list) {
	    storeTitle(list); //first arg is the om list object
	});
    }
	console.log("populated Titles");
}

/**
 * choose a list randomly
 */
function getRandomListIDfromArray() {
    var index = $.random(NUMLISTS);
    var listId = omlists[index];
    glob.listID = listId;
    return listId;
}




/**
 * Creates a few elements in the Actual app screen. Attach to the right place
 * This function is called initially, only once.
 * After this call, the elements are controlled with show() and hide() functions
 */
function resetScores() {
    glob.correct = 0;
    glob.wrong = 0;
    glob.reviewed = 0;
    glob.percentCorrect = 0;
    glob.showDefn = false;

}


function defnHasBeenViewed(currentIndex){

    if( viewedArray[currentIndex] == 0) {
	glob.reviewed++;    
	viewedArray[currentIndex] =1;
    }
}

//Initialize viewedArray to be all zeros
function initViewedArray() {
    
    var i;

    glob.reviewed = 0;
    for (i=0; i<100; i++)
    {
	viewedArray[i] = 0;
    }

}

/*
 * Depending on the mode, different sets of Next >> buttons are shown
 * The right/wrong buttons are shown only if defn is also visible
 */

function toggleNextElements(cIndex) {
    var $oknext = $('#small_next');
    var $missednext = $('#missed_next');

    if (glob.mode == "p" || glob.mode == "r" ) {
	return;
    }

    // should not allow scoring if the card has been previously viewed
    if( viewedArray[cIndex] == 1) {
	$('#next').show();
	$oknext.hide();
	$missednext.hide();
	return;
    }


    if (glob.solutionVisible){
	$('#next').hide();
	$oknext.show();
	$missednext.show();
    }
    else{
	$('#next').show();
	$oknext.hide();
	$missednext.hide();
    }

}



/* show the right pointing double angle quotation mark */
function showRaQuo() {

    if (glob.mode == "p" || glob.mode == "r" ) {
	return;
    }

    var $oknext = $('#small_next');
    var $missednext = $('#missed_next');
    
    $('#next').show();
    $oknext.hide();
    $missednext.hide();
}



