var friends = require("../data/friends");

module.exports = function(app) {
  // Return Friends.js Data (JSON)
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    console.log(req.body.scores);

    // Receive User Info
    var user = req.body;

    // scores parseInt
    for(var i = 0; i < user.scores.length; i++) {
      user.scores[i] = parseInt(user.scores[i]);
    }

    // default friend match is the first friend but result will be whoever has the minimum difference in scores
    var friendFinderIndex = 0;
    var friendFinderIndexMin = 40;

    // totalDifference loop
    for(var i = 0; i < friends.length; i++) {
      var totalDifference = 0;
      for(var j = 0; j < friends[i].scores.length; j++) {
        var difference = Math.abs(user.scores[j] - friends[i].scores[j]);
        totalDifference += difference;
      }

      // new minimum for next iteration comparison
      if(totalDifference < friendFinderIndexMin) {
        friendFinderIndex = i;
        friendFinderIndexMin = totalDifference;
      }
    }

    // Add User to Friend Array
    friends.push(user);

    // Display Match
    res.json(friends[friendFinderIndex]);
  });
};