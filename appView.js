//Javascript document
//Your app's "View" related functions and utilities go in this file.


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


//Display the App's "home page
function displayAppMenuPage(){
    $('#menuPage').show();
    $('#listPage').hide();
    $('#flashcards').hide();

    $('#listTitle').text(glob.activeListTitle);

    glob.solutionVisible= 0;
    resetScores();
    initViewedArray();
    glob.reviewed = 0;
}


/* The list elements are created in the function createListElements()
 * This function displays those elements, when invoked.
 */

function displayListPage(){
    $('#listPage').show();
    $('#menuPage').hide();
    $('#flashcards').hide();

    displayListTitles();
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

    var $omlogo = $('<img src="images/om_logo.jpg" height="25" align=left align=bottom> </img');
    $('#main').append($omlogo);


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

    var $a11 = $('<a id="lopt11" href="#"> </a> <br>');
    var $a21 = $('<a id="lopt21" href="#"> </a> <br>');
    var $a31 = $('<a id="lopt31" href="#"> </a> <br>');

    $cell11.append($a11);
    $cell11.append($a21);
    $cell11.append($a31);

}


function displayListTitles(){

    var $a11 = $('#lopt11');
    var $a21 = $('#lopt21');
    var $a31 = $('#lopt31');

    $a11.text(omListTitle[0]);
    $a21.text(omListTitle[1]);
    $a31.text(omListTitle[2]);

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

    $backbutton.text("Back to Menu");
    $('#flashcards').append($oknext);
    $('#flashcards').append($missednext);
    $('#flashcards').append($score);
    $('#flashcards').append($backbutton);


    $oknext.hide();
    $missednext.hide();
    $score.hide();
}




//Display the cards.
function showCurrentFlashcard() {

    var $defn = $('#defn');
    var $question = $('#word');
    var $score = $('#score');

    var item = glob.list.items[glob.currentIndex]; //we have the item
    $score.text("Score " + glob.correct + "/" + glob.reviewed + " ("+ glob.percentCorrect + "%)");
        $question.text(item.defn); //note that for Jeopardy we switch word and defn. The answer is shown first.
    $('#index').text((glob.currentIndex+1) + '/' + glob.list.items.length);
    $defn.text(item.word);
    $question.show();
    $defn.hide();
    if (glob.showDefn) {
	defnHasBeenViewed(glob.currentIndex);
	$defn.show();
    }
}


function showNextFlashcard() {

    var $defn = $('#defn');
    var $question = $('#word'); 
    var $flashcard = $("#flashcard");
   
    if(glob.mode == "r") {
	glob.currentIndex = (glob.currentIndex + 1) % glob.list.items.length;
	$defn.hide();
	$question.show();	    
    }
    else { //mode is p or t
	if (glob.showDefn) { //display next card
	    glob.currentIndex = (glob.currentIndex + 1) % glob.list.items.length;
	}
	//showDefn =  (showDefn) ? false : true; //toggling showDefn
	if (glob.showDefn) {
	    glob.showDefn=false; //toggling showDefn
	    $flashcard.flip({direction:'lr', color: '#5B90F6'});
	    glob.solutionVisible= 0;
	    toggleNextElements(glob.currentIndex);
	}
	else
	{
	    glob.showDefn=true; //toggling showDefn
	    $flashcard.flip({direction:'lr', color: '#00f'});
	    glob.solutionVisible= 1;
	    toggleNextElements(glob.currentIndex);
	}
    }
    
    showCurrentFlashcard();
}    


function showPrevFlashcard() {
    var $flashcard = $("#flashcard");
    var $defn = $('#defn');
    var $question = $('#word');
    
    if(glob.mode == "r") {
	glob.currentIndex = (glob.currentIndex == 0) ? glob.list.items.length - 1 : glob.currentIndex - 1; //wrap around
	$defn.hide();
	$question.show();	    
    }
    else {
	if (glob.showDefn !=1) { // display prev card
	    glob.currentIndex = (glob.currentIndex == 0) ? glob.list.items.length - 1 : glob.currentIndex - 1; //wrap around
	}
	
	if (glob.showDefn) {
	    glob.showDefn=false; //toggling showDefn
	    $flashcard.flip({direction:'rl', color: '#5B90F6'});
	    glob.solutionVisible= 0;
	    showRaQuo();
	    //toggleNextElements(currentIndex);
	}
	else
	{
	    glob.showDefn=true; //toggling showDefn
	    $flashcard.flip({direction:'rl', color: '#00f'});
	    glob.solutionVisible= 1;
	    showRaQuo();
	}
    }	   
    showCurrentFlashcard();
}


