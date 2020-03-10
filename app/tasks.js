const express = require('express');

const auth = require('../middleware/auth');
const Task = require('../models/Task');

const router = express.Router();

router.get('/', auth, async (req,res) => {
    try {
        const tasks = await Task.find({user: req.user._id});
        return res.send(tasks);
    } catch (error) {
        res.status.send(error)
    }

});
router.post('/', auth, async (req,res) => {
    const task = new Task(req.body);
    const user = req.user;
    task.user = user._id;
    try {
        await task.save();
        return res.send(task)
    } catch (error) {
        res.status(400).send(error)
    }
});
router.put('/:id', auth, async (req,res) => {
    const updated = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    };
    try {
        const task = await Task.findOne({_id: req.params.id, user: req.user._id});
        if(!task) {
            res.status(400).send({error: "Wrong Id"})
        } else {
            await Task.updateOne({_id: req.params.id},{$set: updated});
            return res.send({message: "Edited"});
        }

    } catch(error) {
        res.status(400).send(error)
    }
});
router.delete('/:id', auth, async (req, res) => {
   try {
       const task = await Task.findOne({_id: req.params.id, user: req.user._id});
       if (!task) {
           res.status(400).send({error: "Wrong Id"})
       } else {
           await Task.deleteOne({_id: req.params.id});
           return res.send({message: 'Deleted'})
       }
   } catch (error) {
       res.status(400).send(error)
   }
});




module.exports = router;