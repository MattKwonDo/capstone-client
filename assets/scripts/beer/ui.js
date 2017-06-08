'use strict'

const store = require('../store')
const showBeersTemplate = require('../templates/beer.handlebars')
const api = require('./api')

const getBeers = (event) => {
  api.getBeers()
    .then(getBeersSuccess)
    .catch(getBeersFailure)
}

const clearBeerModal = function () {
  $('#beer-brand').val('')
}

const createBeerSuccess = (data) => {
  // console.log('createBeerSuccess')
  $('.list-group').empty()
  $('#createBeer').modal('hide')
  $('.modal-backdrop').remove()
// todo: add animation to the last item in this list
  getBeers()
}

const createBeerFailure = (error) => {
  console.error(error)
}

const updateBeerSuccess = (data) => {
  // store.beer = data.beer
  // console.log('updateBeerSuccess')
  getBeers()
}

const updateBeerFailure = (error) => {
  // console.log('updateBeerSuccess, error = ', error)
  console.error(error)
}

// const getBeersSuccess = (data) => {
//   const showBeersHtml = showBeersTemplate({ beers: data.beers })
//   store.beers = data.beers
//   // console.log('>>>>> store.beers = ', store.beers)
//   $('.list-group').empty()
//   $('#beers-content').html(showBeersHtml)
// }

const getBeersSuccess = (data) => {
  $('#beers-content').hide()
  $('#beers-content-text').hide()
  console.log(data)
  console.log(data.beers)
  console.log(data.beers.length)
  console.log('got beers')
  // if (data.beers.length !== undefined)
  if (data.beers[0] !== undefined) {
    const showBeersHtml = showBeersTemplate({ beers: data.beers })
    store.beers = data.beers
    // console.log('>>>>> store.beers = ', store.beers)
    $('.list-group').empty()
    $('#beers-content').show()
    $('#beers-content').html(showBeersHtml)
    console.log('woah, all the way here')
    // console.log('this: ', this)
    // $(this).last('tr').addClass('animated fadeOutUpBig timing')
    // $('#beers-content').removeClass('animated rollIn')
  } else {
    store.beers = data.beers
    $('#beers-content-text').show()
    // $('#beers-content-text').addClass('animated rollIn')
    $('#beers-content-text').text('you have no beers (╯°□°）╯︵ ┻━┻')
  }
}

const getBeersFailure = (error) => {
  console.error(error)
}

// const getResponsesSuccess = (data) => {
//   // store.user = data.user
//   console.log(data)
//   console.log(data.responses[0])
//   console.log('text:', data.responses[0].text)
//   console.log('title:', data.responses[0].title)
//   console.log('beer_id:', data.responses[0].beer_id)
//   console.log('question_id:', data.responses[0].question_id)
//   console.log('respondent_id:', data.responses[0].respondent_id)
//   const showBeersHtml = showBeersTemplate({ responses: data.responses })
//   // debugger;
//   $('.content').html(showBeersHtml) // .order
//   // $('.errors-create-item').empty()
//   // $('#create-item').show()
//   // $('#spacer1').text('List')
// }
//
// const getResponsesFailure = (error) => {
//   console.error(error)
// }

const getDynamicBeersSuccess = (data) => {
  // store.user = data.user
  // console.log(data)
  // console.log(data.beers[0])
  // console.log('title:', data.beers[0].title)
  // console.log('url:', data.beers[0].url)
  // console.log('_owner:', data.beers[0]._owner)
  // console.log('length:', data.beers[0].length)
  // console.log('length:', data.beers[0].question)
  // const showBeersHtml = showBeersTemplate({ beers: data.beers })
  // debugger;
  // $('.dynamic-content').html(showBeersHtml) // .order
  // $('.errors-create-item').empty()
  // $('#create-item').show()
  // $('#spacer1').text('List')
}

const getDynamicBeersFailure = (error) => {
  console.error(error)
}

const getOneDynamicBeerSuccess = (data) => {
  // store.user = data.user
  // console.log(data)
  // console.log(data.beer)
  $('#default-display-text').text(data.beer.title)
  // $('#beer_id').html(data.beer.id)
  // $('#beer_id').val(data.beer.id)
  $('#create-response').attr('data-id', data.beer.id)
  // console.log('innerHTML: ', $('#create-response').attr('data-id'))
  $('#beer_question').text(data.beer.question)
  // $('#beer_owner').text(data.beer._owner)

  if (data.beer.response_type === 'Number') {
    $('#res-number').show()
    $('#res-string').hide()
    $('#res-boolean').hide()
  }
  if (data.beer.response_type === 'String') {
    $('#res-number').hide()
    $('#res-string').show()
    $('#res-boolean').hide()
  }
  if (data.beer.response_type === 'Boolean') {
    $('#res-number').hide()
    $('#res-string').hide()
    $('#res-boolean').show()
  }
}

const getOneDynamicBeerFailure = (error) => {
  console.error(error)
}

const deleteBeerSuccess = (data) => {
  // store.beer = data.beer
  console.log('deleteBeerSuccess')
  // $('#beers-content').addClass('animated rollIn')
  getBeers()
  // $('#responses-content').hide()
  // $('#responses-content-text').hide()
}

const deleteBeerFailure = (error) => {
  // console.log('deleteBeerFailure, error = ', error)
  console.error(error)
}

module.exports = {
  clearBeerModal,
  createBeerSuccess,
  createBeerFailure,
  updateBeerSuccess,
  updateBeerFailure,
  getBeersSuccess,
  getBeersFailure,
  getDynamicBeersSuccess,
  getDynamicBeersFailure,
  getOneDynamicBeerSuccess,
  getOneDynamicBeerFailure,
  deleteBeerSuccess,
  deleteBeerFailure,
  getBeers
}
