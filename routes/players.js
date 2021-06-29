const express = require('express');
const PlayersService = require('../services/players');

const{
  playerIdSchema,
  createPlayerSchema,
  teamsQuerySchema,
  updatePlayerSchema
} = require('../utils/schemas/player')

const validationHandler = require('../utils/middleware/validationHandler')

function moviesApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  const playersService = new PlayersService();

  router.get('/tej', async function(req, res, next) {
    const { tags } = req.query;

    try {
      const movies = await playersService.getMovies({ tags });
      //throw new Error('Errlr getting movies'); esto es para crear un error 

      res.status(200).json({
        data: movies,
        message: 'movies listed'
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:movieId', validationHandler({ movieId: playerIdSchema }, 'params'),  async function(req, res, next) {
    const { movieId } = req.params;

    try {
      const movies = await playersService.getMovie({ movieId });

      res.status(200).json({
        data: movies,
        message: 'movie retrieved'
      });
    } catch (err) {
      next(err);
    }
  });

  router.post('/team', validationHandler(teamsQuerySchema), async function(req, res, next) {
    const { body: teamreq } = req;
    try {
      console.log(teamreq['Name'])
      const createdMovieId = await playersService.getPlayers(teamreq);

      res.status(200).json({
        data: createdMovieId,
        message: 'movie created'
      });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:movieId', validationHandler({ movieId: playerIdSchema }, 'params'), validationHandler(updatePlayerSchema), async function(req, res, next) {
    const { movieId } = req.params;
    const { body: movie } = req;

    try {
      const updatedMovieId = await playersService.updateMovie({
        movieId,
        movie
      });

      res.status(200).json({
        data: updatedMovieId,
        message: 'movie updated'
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:movieId', validationHandler({ movieId: playerIdSchema }, 'params'), async function(req, res, next) {
    const { movieId } = req.params;

    try {
      const deletedMovieId = await playersService.deleteMovie({ movieId });

      res.status(200).json({
        data: deletedMovieId,
        message: 'movie deleted'
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = moviesApi;
