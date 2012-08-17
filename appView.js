

/**
 * Creates a few elements in the Actual app screen. Attach to the right place
 * This function is called initially, only once.
 * After this call, the elements are controlled with show() and hide() functions
 */
function createMenuElements() {

    var $menuPage = $('<div id="menuPage">  </div>');

    //TODO: make these into function calls
    var $ropt1 = $('<a id="r-option" href="#" ></a>');
    var $ropt2 = $('<a id="r2" href="#" ></a>');

    var $lopt1 = $('<a id="l-option" href="#" > </a>');
    var $lopt2 = $('<a id="l2" href="#" > </a>');

    var $br = $('<br> </br>');

    $('#app').prepend($menuPage);
    $('#menuPage').append($ropt1);
    $('#menuPage').append($ropt2);

    $('#menuPage').append($lopt1);
    $('#menuPage').append($lopt2);
    
    $ropt1.text("Practice");
    $ropt2.text("Self-test");

    $lopt1.text("Select List");
    $lopt2.text(" ");




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

    var $score = $('<div id="score" > </div>');

    $score.text("Score" + glob.correct + "/" + glob.reviewed);
    $backbutton.text("Back to Main");
    $('#flashcards').append($oknext);
    $('#flashcards').append($missednext);
    $('#flashcards').append($score);
    $('#flashcards').append($backbutton);
    $oknext.hide();
    $missednext.hide();
    $score.hide();
}


function updateScores(gotit) {
    var $score = $('#score');

    if (glob.mode == "p") {
	return;
    }

    if(gotit){
	glob.correct = glob.correct+1;
    }
    else{
	glob.wrong = glob.wrong+1;
    }

}


/*
 * Depending on the mode, different sets of Next >> buttons are shown
 * The right/wrong buttons are shown only if defn is also visible
 */

function toggleNextElements() {

    if (glob.mode == "p") {
	return;
    }

    var $oknext = $('#small_next');
    var $missednext = $('#missed_next');

    if (glob.solution_visible){
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


