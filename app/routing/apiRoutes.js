var friendsMatch = require('../data/friends.js');

module.exports = function (app) {

	app.get('api/friends', function(req, res) {
		var newFriend = req.body;

		for (var i = 0; i < newFriend.answers.length; i++) {
			if (newFriend.answers [i] == "1 (Strongly Disagree)") {
				newFriend.answers[i] = 1;
			} else if (newFriend.answers[i] == "5 (Strongly Agree)") {
				newFriend.answers[i] = 5;
			} else {
				newFriend.answers [i] == parseInt (newFriend.answers[i])
			}
		}

		var differencesArray = [];

		for(var i = 0; i < friendsMatch.length; i++) {
			var compare = friendsMatch[i];
			var totalDifference = 0;

			for (var j = 0; j < compare.answers.length; j++) {
				var differenceScoreOne = Math.abs(compare.answers[j] - newFriend.answers[j]);
				totalDifference += differenceScoreOne;
			}

			differencesArray[i] = totalDifference;
		}

		var bestMatchNum = differencesArray[0];
		var bestMatchIndex = 0

		for(var i = 1; i <differencesArray.length; i++) {
			if (differencesArray[i] < bestMatchNum) {
				bestMatchNum = differencesArray[i];
				bestMatchIndex = i;
			}
		}
		friendsMatch.push(newFriend);
		res.json(friendsMatch[bestMatchIndex]);
	})
}