

//var omlists = ["4fe8dd92d6b77f5461000259","4fe11565d6b77f037b000a7a","4ff39c3a94d94a04370000cb","4ffb717e94d94a744b000796", "501a3c9894d94a0dc100052e"];




/**
 * choose a list randomly
 */
function getListIDfromArray() {
    var index = $.random(1);
    //console.log(index)
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

function toggleNextElements(currentIndex) {

    if (glob.mode == "p" || glob.mode == "r" ) {
	return;
    }

    // should not allow scoring if the card has been previously viewed
    if( viewedArray[currentIndex] == 1) {
	return;
    }

    var $oknext = $('#small_next');
    var $missednext = $('#missed_next');

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



