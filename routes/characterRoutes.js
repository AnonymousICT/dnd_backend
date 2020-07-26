const router = require('express').Router()
const mongoose = require('mongoose')
const auth = require('../middleware/auth')
const User = require('../models/userModels')
const {Character, sanitizeInput} = require('../models/characterModel')

router.post('/new', async(req, res)=> {
    try {
        let {name, level, race, job, strength, dexterity, constitution, intelligence, wisdom, charisma} = req.body

        const newCharacter = new Character({
            user: User.id,
            name, 
            level,
            race,
            languageChoice,
            traitChoice,
            job,
            profChoice,  
            strength,
            dexterity,
            constitution,
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

// get's all characters
router.get('/', async(req, res) => {
    try {
        const char = await Character.find(req.params.body)
        res.status(200).json(char)
        
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

//return's a user's specific character
router.get('/:id', auth, async (req,res)=> {
    try {
        if(!auth) {
            res.status(400).json({msg: "not authorized to view this document"})
        } 
        else {
            const user = await User.findById(req.user); //fetch user here
            const char = await Character.find({ _id: mongoose.Types.ObjectId(req.params.id), userId: mongoose.Types.ObjectId(user._id)})
            if(char) {
                res.status(200).json(char)
            } else {
                res.status(404).json({msg: `no document found with id ${req.params.id} for user ${user.displayName}`})
            }
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//update's a user's specific character
router.put('/:id', auth, async(req, res) =>{
    try {
        if(!auth) {
            res.status(400).json({msg: "not authorized to view this document"})
        } else {
            sanitizeInput(req.body);
            const mResponse = await Character.updateOne(
                { _id: mongoose.Types.ObjectId(req.params.id), userId: mongoose.Types.ObjectId(req.user)}, 
                req.body);
            res.status(200).json({DocumentsAffected: mResponse.n, Id: req.params.id, changes: req.body});
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.delete(':/id', auth, async(req, res) => {
    try{
        if(!auth){
            res.status(400).json({msg: "not authorized to delete this document"})
        } else {
            Character.findByIdAndDelete(req.body)
                res.status(204)
        }
    } catch (error) {
        res.status(500).json({ error: error.message })

    }
})

module.exports = router