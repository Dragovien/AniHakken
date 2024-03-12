const { Op } = require("sequelize")
const { searchAnimeQuery, getAiringAnimeQuery } = require("../queries/search.queries")

exports.getAll = async (req, res) => {
  try {
  } catch (error) {
    console.log(error)
  }
}

exports.getAiringAnimes = async (req, res) => {
  try {
    const { url, options } = getAiringAnimeQuery(req, res)

    let response = await fetch(url, options)
    let results = await response.json()

    // console.log(results.data)

    return res.status(200).send(results.data.Page)

  } catch (error) {
    console.log(error)
  }
}

exports.searchAnime = async (req, res) => {
  try {
    const { url, options } = searchAnimeQuery(req, res)

    let response = await fetch(url, options)
    let results = await response.json()

    return res.status(200).send(results.data.Page)

  } catch (error) {
    console.log(error)
  }
}