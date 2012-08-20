

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

function newDiv(idname) {
    var str = '<div id = "' + idname + '">' + '</div>';
    var $div = $(str);
    return $div;
}




/**
 * Creates a few elements in the Actual app screen. Attach to the right place
 * This function is called initially, only once.
 * After this call, the elements are controlled with show() and hide() functions
 */
function createMenuElements() {

    var $menuPage = $('<div id="menuPage">  </div>');
    var $menuTable = $('<table id="menuTable"> <tbody></tbody> </table>');

    var $appTitle = newDiv("appTitle");
    $appTitle.text("Jeopardy! Trainer");

    var $activeList = newDiv("listTitle");
    $activeList.text(glob.activeListTitle);

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

    $('#menuPage').append($appTitle);
    $('#menuPage').append($activeList);
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


    var $a21 = $('<a id="anc21" href="#"> </a>');
    $cell21.append($a21);
    $a21.text("Select List");

    var $a12 = $('<a id="anc12" href="#"> </a>');
    $cell12.append($a12);
    $a12.text("Practice");

    var $a22 = $('<a id="anc22" href="#"> </a>');
    $cell22.append($a22);
    $a22.text("Rapid Review");

    var $a32 = $('<a id="anc32" href="#"> </a>');
    $cell32.append($a32);
    $a32.text("Self-Test");

}



/**
 * This function is called initially, only once.
 * After this call, the elements are controlled with show() and hide() functions
 */
function createListElements() {

    var $listPage = $('<div id="listPage">  </div>');
    var $listTable = $('<table id="listTable"> <tbody></tbody> </table>');

    var $listPageTitle = newDiv("listPageTitle");
    $listPageTitle.text("Jeopardy List to Review");

    var $row1 = newTableRow("row");
    var $row2 = newTableRow("row");
    var $row3 = newTableRow("row");

    var $cell11 = newTableCell("cell");
    var $cell21 = newTableCell("cell");
    var $cell31 = newTableCell("cell");

    var $backbutton = $('<a id="l_button" href="#" > </a>');
    $backbutton.text("Back to Menu");

    //TODO: make these into function calls

    $('#app').prepend($listPage);
    $listPage.hide();

    $('#listPage').append($listPageTitle);
    $('#listPage').append($listTable);
    $('#listTable').append($backbutton);


    $('#listTable > tbody:last').append($row1);
    $('#listTable > tbody:last').append($row2);
    $('#listTable > tbody:last').append($row3);
    $row1.append($cell11);
    $row2.append($cell21);
    $row3.append($cell31);

    var $a11 = $('<a id="lopt11" href="#"> </a>');
    var $a21 = $('<a id="lopt21" href="#"> </a>');
    var $a31 = $('<a id="lopt31" href="#"> </a>');

    $cell11.append($a11);
    $a11.text("US Presidents Set 1");

    $cell21.append($a21);
    $a21.text("US Presidents Set 2");

    $cell31.append($a31);
    $a31.text("Vice Presidents");



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

    if (glob.mode == "p" || glob.mode == "r") {
	return;
    }

    if(gotit){
	glob.correct = glob.correct+1;
    }
    else{
	glob.wrong = glob.wrong+1;
    }

}



