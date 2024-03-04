module.exports = app => {
  const controller = require("../controllers/search.controller.js")
  var router = require("express").Router()

  router.post("", controller.getAll)
  router.post("/results", controller.searchAnime)

  app.use('/search', router)
}