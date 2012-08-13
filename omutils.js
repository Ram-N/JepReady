// JavaScript Document

var omlists = ["4fe8dd92d6b77f5461000259","4fe11565d6b77f037b000a7a","4ff39c3a94d94a04370000cb","4ffb717e94d94a744b000796"]


/**
 * choose a list randomly
 */
function getListIDfromArray() {
    var index = $.random(4);
    //console.log(index)
    var listId = omlists[index];
    return listId
}




/**
 * Fetches the given list through the OpenMinds API.
 * @param {String} listId the id of the list to fetch from OpenMinds.
 * @param {Function} success The handler to call after fetching the list. The
 *   JSON list data is passed in as the first argument to the handler.
 */
function getList(listId, success) {
  $.ajax({
    url: API_ROOT + '/0/data/lists/' + listId,
    dataType: 'json',
    data: {
      'sort': 'adaptive',
      },
    headers: {
      'X-OpenMinds-Access-Token': om.accessToken,
      },
    success: success,
  });
}


