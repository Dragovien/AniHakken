module.exports = app => {
  const controller = require("../controllers/search.controller.js")
  var router = require("express").Router()

  router.get("", controller.getAll)
  router.post("/airingAnimes", controller.getAiringAnimes)
  router.post("/search/results", controller.searchAnime)

  app.use('/animes', router)
}