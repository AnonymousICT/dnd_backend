const mongoose = require('mongoose')

const characterSchema = new mongoose.Schema({
    name: {type: String},
    level: {type: Number},
    race: {type: String},
    job: {type: String},
    strength: {type: Number},
    dexterity: {type: Number},
    constitution: {type: Number},
    intelligence: {type: Number},
    wisdom: {type: Number},
    charisma: {type: Number},
})

module.exports = Character = mongoose.model('Character', characterSchema)