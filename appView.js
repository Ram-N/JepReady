

function newTableRow(idname) {
    var str = '<tr id = "' + idname + '"> </tr>';
    var $row = $(str);
    return $row;
}

function newTableCell(idname) {
    var str = '<td id = "' + idname + '"> </td>';
    var $cell = $(str);
    return $cell;
}

function newAnchorCell(idname,aname) {
    var str = '<td id = "' + idname + '">' + '<a id ="' + aname + '" href = "#" > </a>' + '</td>';
    var $cell = $(str);
    return $cell;
}

/**
 * Creates a few elements in the Actual app screen. Attach to the right place
 * This function is called initially, only once.
 * After this call, the elements are controlled with show() and hide() functions
 */
function createMenuElements() {

    var $menuPage = $('<div id="menuPage">  </div>');
    var $menuTable = $('<table id="menuTable"> <tbody></tbody> </table>');


    var $row1 = newTableRow("row");
    var $row2 = newTableRow("row");
    var $row3 = newTableRow("row");

    var $cell11 = newTableCell("cell");
    var $cell21 = newTableCell("cell");
    var $cell31 = newTableCell("cell");

    var $cell12 = newTableCell("cell");
    var $cell22 = newTableCell("cell");
    var $cell32 = newTableCell("cell");

    //TODO: make these into function calls

    var $ropt1 = $('<a id="r-option" href="#" ></a>');
    var $ropt2 = $('<a id="r2" href="#" ></a>');

    var $br = $('<br> </br>');

    $('#app').prepend($menuPage);

    $('#menuPage').append($menuTable);
    $('#menuTable > tbody:last').append($row1);
    $('#menuTable > tbody:last').append($row2);
    $('#menuTable > tbody:last').append($row3);
    $row1.append($cell11);
    $row2.append($cell21);
    $row3.append($cell31);
    $row1.append($cell12);
    $row2.append($cell22);
    $row3.append($cell32);

    $cell21.text("Select List");

    $a12 = $('<a id="anc12" href="#"> </a>');
    $cell12.append($a12);
    $a12.text("Practice");

    $a22 = $('<a id="anc22" href="#"> </a>');
    $cell22.append($a22);
    $a22.text("Rapid Review");

    $a32 = $('<a id="anc32" href="#"> </a>');
    $cell32.append($a32);
    $a32.text("Self-Test");

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
    $backbutton.text("Back to Menu");
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


