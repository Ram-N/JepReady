

//var omlists = ["4fe8dd92d6b77f5461000259","4fe11565d6b77f037b000a7a","4ff39c3a94d94a04370000cb","4ffb717e94d94a744b000796", "501a3c9894d94a0dc100052e"];
var omlists = ["502dea8a94d94a7426116048"];

/**
 * choose a list randomly
 */
function getListIDfromArray() {
    var index = $.random(1);
    //console.log(index)
    var listId = omlists[index];
    return listId
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


function cardHasBeenViewed(currentIndex){

    if( viewedArray[currentIndex] == 0) {
	glob.reviewed++;    
	viewedArray[currentIndex] =1;
    }
}

//Initialize viewedArray to be all zeros
function initViewedArray() {
    
    var i;
    for (i=0; i<100; i++)
    {
	viewedArray[i] = 0;
    }

}