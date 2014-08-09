if(Meteor.isClient){
  Template.leaderboard.player = function(){ 
    return PlayersList.find({}, {sort: {score: -1, name: 1}});
  }

  Template.leaderboard.selectedClass = function() {
    var selectedPlayer = Session.get("selectedPlayer");
    var playerId = this._id;
    if (selectedPlayer === playerId) {
      return 'selected';
    }
  }

  Template.leaderboard.showSelectedPlayer = function() {
    var selectedPlayer = Session.get("selectedPlayer");
    return PlayersList.findOne(selectedPlayer);
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
    },
    'click #decrement': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(
        {_id: selectedPlayer},
        {$inc: {score: -5}}
      );
    },
    'click #remove': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.remove(selectedPlayer);
    }

  }); 

  Template.addPlayerForm.events({
    'submit form': function(theEvent, theTemplate) {
      theEvent.preventDefault();
      var playerNameVar = theTemplate.find("#playerName").value; 
      PlayersList.insert({
        name: playerNameVar,
        score: 0
      })
    }
  });
}

if(Meteor.isServer){ 
}

PlayersList = new Meteor.Collection('players');

