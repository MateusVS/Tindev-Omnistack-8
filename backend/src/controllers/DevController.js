//Arquivo responsável pela CRUD dos Devs
const axios = require('axios')

const Dev = require('../models/Dev')

module.exports = {
    async index(req, res) {

        const { user } = req.headers

        const loggedDev = await Dev.findById(user)


        // Exclui da listagem o proprio usuario e  os users que ja estão na lista de likes e dislikes 
        const users = await Dev.find({
            $and: [ // aplica o && nos 3 filtros
                { _id: { $ne: user } }, //$ne - "not equal" = desigualdade
                { _id: { $nin: loggedDev.likes } }, //$nin - "not in"
                { _id: { $nin: loggedDev.dislikes } },
            ],
        })

        return res.json(users)
    },

    async store(req, res) {

        const { username } = req.body

        const userExists = await Dev.findOne({ user: username })

        if (userExists) {
            return res.json(userExists)
        }

        const response = await axios.get(`https://api.github.com/users/${username}`)
            //.data é onde o axios armazena os dados

        const { name, bio, avatar_url: avatar } = response.data

        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        })

        return res.json(dev)
    }
}