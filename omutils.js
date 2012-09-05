// JavaScript Document

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


