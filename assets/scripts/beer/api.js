'use strict'

const config = require('../config')
const store = require('../store')

const createBeer = (data) => {
  // console.log('createBeer(), token = ', store.user.token)
  // console.log('createBeer(), data = ', data)
  return $.ajax({
    url: config.apiOrigin + '/beers',
    method: 'POST',
    data: data,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const getBeers = function () {
  // console.log('getBeers(), token = ', store.user.token)
  return $.ajax({
    url: config.apiOrigin + '/beers',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateBeer = (data) => {
  // console.log('updateBeer(), token = ', store.user.token)
  // console.log('updateBeer(), data = ', data)
  return $.ajax({
    url: config.apiOrigin + '/beers/' + data.beer.id,
    method: 'PATCH',
    data: data,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const deleteBeer = (id) => {
  // console.log('deleteBeer(), token = ', store.user.token)
  return $.ajax({
    url: config.apiOrigin + '/beers/' + id,
    method: 'DELETE',
    // data: data,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const getDynamicBeers = function () {
  return $.ajax({
    url: config.apiOrigin + '/beers',
    method: 'GET' // ,
    // headers: {
    //   Authorization: 'Token token=' + 'abc'
    // }
  })
}

const getOneDynamicBeer = (beerId) => {
  return $.ajax({
    url: config.apiOrigin + '/beers/' + beerId,
    method: 'GET' // ,
    // data: beerId // ,
    // headers: {
    //   Authorization: 'Token token=' + 'abc'
    // }
  })
}

// Exported since used in other code like events.js
module.exports = {
  createBeer,
  getBeers,
  updateBeer,
  deleteBeer,
  // getResponses,
  getDynamicBeers,
  getOneDynamicBeer
}
