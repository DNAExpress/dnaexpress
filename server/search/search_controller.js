var api_router = require('./../data/api_requests/api_router.js');

module.exports = {
  handleSearch: function handleSearch(req, res) {
    console.log('made it to handleSearch!')
    // api_router.askYelp(req, res);
  }

  // things to do
    // get in search (handleSearch)
    // parse users search input
    // determine from input what to ask yelp for
        // logic logic logic (for mvp, this doesnt really need logic)
    // make api request to yelp and get response
        // this will use content of ./../data/api_requests/
            // these must be readjusted to return a response here
            // rather than immediately sending Yelps res to the client
    // choose which responses to send back to the client
        // logic logic logic
    // send the selected options / resp back to the client
}

// search categories for MVP: Location, (3) Food Genres, Veg (y/n), by rating

