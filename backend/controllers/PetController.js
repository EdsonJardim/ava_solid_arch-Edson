const Pet = require('../models/Pet')

const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class PetController {

  static async create(req, res) {

    const { name, age, weight, color } = req.body

    const images = []

    req.files.forEach((image) => {
      images.push(image.filename)
    })

    if (!name) {
      return res.status(422).json({
        message: 'O nome é obrigatório!',
      })
    }

    if (!age) {
      return res.status(422).json({
        message: 'A idade é obrigatória!',
      })
    }

    if (!weight) {
      return res.status(422).json({
        message: 'O peso é obrigatório!',
      })
    }

    if (!color) {
      return res.status(422).json({
        message: 'A cor é obrigatória!',
      })
    }

    if (images.length === 0) {
      return res.status(422).json({
        message: 'A imagem é obrigatória!',
      })
    }

    const token = getToken(req)

    const user = await getUserByToken(token)

    const pet = new Pet({
      name,
      age,
      weight,
      color,
      images,
      available: true,

      user: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
      },
    })

    try {

      const newPet = await pet.save()

      res.status(201).json({
        message: 'Pet cadastrado com sucesso!',
        newPet,
      })

    } catch (error) {

      res.status(500).json({
        message: error,
      })

    }

  }

}

