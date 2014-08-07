if(Meteor.isClient){
  Template.leaderboard.player = function(){ 
    return PlayersList.find({});
  }

  Template.leaderboard.selectedClass = function() {
    var selectedPlayer = Session.get("selectedPlayer");
    var playerId = this._id;
    if (selectedPlayer === playerId) {
      return 'selected';
    }
  }

  Template.leaderboard.events({
    'click li.player': function() {
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
      var selectedPlayer = Session.get('selectedPlayer'); 
      console.log(selectedPlayer);
    },
    'click #increment': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(
        {_id: selectedPlayer},
        {$inc: {score: 5}}
      );
    }

  }); 
}

if(Meteor.isServer){ 
}

PlayersList = new Meteor.Collection('players');

