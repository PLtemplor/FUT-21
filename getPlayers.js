const fetch = require('node-fetch');
const PlayersService = require('./services/players');

var ObjectID = require('mongodb').ObjectID;
populateDB();



function populateDB () {
  fetch('https://www.easports.com/fifa/ultimate-team/api/fut/item?page=1')
    .then((resp) => resp.json())
    .then(function(data) {
      const playersService = new PlayersService();
      let pages =  data['totalPages'];
      console.log(pages);
      for (let i = 0; i < parseInt(pages); i++) {

        fetch(`https://www.easports.com/fifa/ultimate-team/api/fut/item?page=${i}`)
          .then((resp) => resp.json())
          .then(function(data) {
            let itemsPlayerObj = data["items"];

            for (let j = 0; j < itemsPlayerObj.length; j++) {
              let playerObj = itemsPlayerObj[j]
              let player = {};

              player["nombreJugadorSchema"] = playerObj['firstName'] + " " +  playerObj['lastName'];
              player["posicionSchema"] = playerObj['position'];
              player["equipoSchema"] = playerObj['club']['name'];
              player["nacionalidadSchema"] = playerObj['nation']['name'];


              const createdMovieId = playersService.createPlayer(player);
          }

      })
      .catch(function(err) {
        console.error(err);
      });
}

console.log('response.body =', data['totalPages']);

})
.catch(function(err) {
  console.error(err);
});

}
