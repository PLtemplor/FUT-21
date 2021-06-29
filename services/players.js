const MongoLib = require('../lib/mongo');

class PlayersService {
  constructor() {
    this.collection = 'players';
    this.mongoDB = new MongoLib();
  }

  async getPlayers(equipoSchema) {
    
    
      const query = equipoSchema && { 'equipoSchema': RegExp(["^", equipoSchema['Name'], "$"].join(""), "i") };
    console.log(query);
    const players = this.mongoDB.getAll(this.collection, query);
    return players || [];
    
  }

  async getPlayer({ playerId }) {
    
    const player = await this.mongoDB.get(this.collection, playerId);
    return player || {};


  }

  async createPlayer(player) {
    const createPlayerId = await this.mongoDB.create(this.collection, player);
    return createPlayerId;
  }

  async updatePlayer({ playerId, player } = {}) {
    const updatedPlayerId = await this.mongoDB.update(
      this.collection,
      playerId,
      player
    );
    return updatedPlayerId;
  }

  async deletePlayer({ playerId }) {
    const deletedPlayerId = await this.mongoDB.delete(this.collection, playerId);
    return deletedPlayerId;
  }
}

module.exports = PlayersService;
