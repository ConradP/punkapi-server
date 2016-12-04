const db = require('punkapi-db')
const toInteger = require('lodash/toInteger')
const isEmpty = require('lodash/isEmpty')
const idFilter = require('../../lib/filters/id')
const schema = require('../../schemas/beer')

function beer (req, res, next) {
  req.checkParams(schema)

  const errors = req.validationErrors()

  if (errors) {
    return next({code: 400})
  }

  const { beerId } = req.params
  const beerIdInt = toInteger(beerId)
  const selectedBeer = idFilter(beerIdInt, db)

  if (isEmpty(selectedBeer)) {
    return next({code: 404, msg: `No beer found that matches the ID ${beerId}`})
  }

  res.status(200)
  res.json(selectedBeer)
};

module.exports = beer
