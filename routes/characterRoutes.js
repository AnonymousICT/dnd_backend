const router = require('express').Router()
// const auth = require('../middleware/auth')
const Character = require('../models/characterModel')

router.post('/new', async(req, res)=> {
    try {
        let {name, level, race, job, strength, dexterity, constituion, intelligence, wisdom, charisma} = req.body

        const newCharacter = new Character({
            name, 
            level,
            race,
            job,  
            strength,
            dexterity,
            constituion,
            intelligence,
            wisdom,
            charisma
        })

        const savedCharacter = await newCharacter.save()
            res.json(savedCharacter) 
    }catch (err) {
        res.status(500).json({ error: err.message })
    }
})


module.exports = router