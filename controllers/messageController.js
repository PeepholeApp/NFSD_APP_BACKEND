const Message = require('../models/Message');

const createMessage = async(req, res) => {
    try{

        const newMessage = Message.create({
            ... req.body,
        })
       res.status(200).json(newMessage)
    }catch(error){
        console.error(error);
        res.status(500).json(error);
    }
};

const getMessages = async(req, res) => {
    const chatId = req.params.chatId;

    try{
        const messages = await Message.find({chatId: chatId})
        res.status(200).json(messages);
    }catch(error){
        console.error(error);
        res.status(500).json(error);
    }
};

module.exports = { createMessage, getMessages };