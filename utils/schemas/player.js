const joi = require('@hapi/joi');

const playerIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const nombreJugadorSchema = joi.string().max(80);
const posicionSchema = joi.string().max(100);
const equipoSchema = joi.string().max(100);
const nacionalidadSchema = joi.string().max(100);
const page = joi.number().max(100);

const createPlayerSchema = {
    _id: playerIdSchema,
    nombreJugadorSchema: nombreJugadorSchema.required(),
    posicionSchema: posicionSchema.required(),
    equipoSchema: equipoSchema.required(),
    nacionalidadSchema: nacionalidadSchema.required()
};

const teamsQuerySchema = {
    Name: nombreJugadorSchema,
    Page: page
};


const updatePlayerSchema = {
    title: nombreJugadorSchema,
    description: posicionSchema,
    contentRating: equipoSchema,
    tags: nacionalidadSchema
};

module.exports = {
    playerIdSchema,
    createPlayerSchema,
    teamsQuerySchema,
    updatePlayerSchema
}
