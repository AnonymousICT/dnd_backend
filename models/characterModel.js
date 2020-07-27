const mongoose = require('mongoose')
const Schema = mongoose.Schema

const characterSchema = new mongoose.Schema({
    userId: {type: Schema.Types.ObjectId},
    name: {type: String},
    level: {type: Number},
    race: {type: String},
    languageChoice: {type: String},
    traitChoice: {type:String},
    job: {type: String},
    profChoice: {type: Array},
    strength: {type: Number},
    dexterity: {type: Number},
    constitution: {type: Number},
    intelligence: {type: Number},
    wisdom: {type: Number},
    charisma: {type: Number},
})

const immutableElements = [
    "_id", "userId", "race",
]

module.exports = {
    Character: mongoose.model('Character', characterSchema),
    sanitizeInput: (dictOfChanges) => {
        Object.keys(dictOfChanges).forEach(key => {
            if(immutableElements.filter((ie) => ie === key).length > 0) {
                delete dictOfChanges[key];
            }
        })
    }
}