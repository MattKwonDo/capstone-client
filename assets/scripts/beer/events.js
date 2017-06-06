'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')
// const authUi = require('../auth/ui')
const store = require('../store')

const onCreateBeer = function (event) {
  console.log('create beer ran')
  event.preventDefault()
  const data = getFormFields(this)
  api.createBeer(data)
  .then(function (data) {
    ui.createBeerSuccess(data)
    $('#createBeer').modal('hide')
  })
  .catch(ui.createBeerFailure)
  // Clear out existing text in modal text boxes when there is a failure
  // source: http://stackoverflow.com/questions/31022950/how-clear-bootstrap-modal-on-hide
  $('#createBeer').on('hidden.bs.modal', function () {
    $(this).find('input,textarea,select').val('').end()
  })
  ui.clearBeerModal()
  onGetBeers()
  // console.log('++++ onCreateBeer(), token = ', store.user.token)
}

const onUpdateBeer = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  // console.log('>>>>>>>>onUpdateBeer: data = ', data)
  api.updateBeer(data)
  .then(function (data) {
    ui.updateBeerSuccess(data)
    $('#updateBeer').modal('hide')
  })
  .catch(ui.updateBeerFailure)
  // Clear out existing text in modal text boxes when there is a failure
  // source: http://stackoverflow.com/questions/31022950/how-clear-bootstrap-modal-on-hide
  $('#updateBeer').on('hidden.bs.modal', function () {
    $(this).find('input,textarea,select').val('').end()
  })
  ui.clearBeerModal()
  onGetBeers()
}

const updateItem = function () {
  event.preventDefault()
  const id = $(this).attr('data-id')
  // console.log('updateItem() : id is: ' + id)
  populateUpdateForm(id)
}

const populateUpdateForm = function (id) {
  const beer = findBeerById(id)
  // console.log('>> beer.title is ', beer.title)
  $('#beerId').val(beer.id)
  $('#beer-brand-update').val(beer.brand)
  $('#beer-name-update').val(beer.name)
  $('#beer-style-update').val(beer.style)
  onShowUpdateBeer()
}

const findBeerById = function (idToCompare) {
  let result
  let i
  for (i in store.beers) {
    const id = store.beers[i].id
    if (id === idToCompare) {
      return store.beers[i]
    }
  }
  result
}

const onShowUpdateBeer = function () {
  $('#updateBeer').modal('show')
}

function getParameterByName () {
  // print url
  // console.log(window.location.href)
  // true or false, there are parameters as indicated by a "?"
  // console.log(window.location.href.split('?')[1] === undefined)
  if (window.location.href.split('?')[1] === undefined) {
    return ''
  } else {
    const arr = $.map(window.location.href.split('?')[1].split('&'), function (e, i) {
      return e.split('=')[1]
    })
    // console.log('array: ', arr)
    // console.log('beer_id: ', arr[1])
    // console.log('parameters, will load Respondent Page')
    return arr
  }
}
// Give the parameter a variable name, to be passed to index.js
const dynamicContent = getParameterByName()

const deleteItem = function () {
  event.preventDefault()
  const id = $(this).attr('data-id')
  // createTask($(this).closest('div').data('id'), prompt('Enter the task name', ''))
  $('#beers-content').removeClass('animated rollIn')
  $(this).closest('tr').addClass('animated fadeOutUpBig timing') // .slideUp(300).delay(800)
  // console.log('deleteItem() : id is: ' + id)
  api.deleteBeer(id)
    .then(ui.deleteBeerSuccess)
    .catch(ui.deleteBeerFailure)
    // .then(onGetBeers()) // moved this to ui
}

const onGetBeers = (event) => {
  api.getBeers()
    .then(ui.getBeersSuccess)
    .catch(ui.getBeersFailure)
}

const addHandlers = () => {
  $('#create-beer').on('submit', onCreateBeer)
  $('#update-beer').on('submit', onUpdateBeer)
  $(document).on('click', '.update-beer', updateItem)
  $(document).on('click', '#get-beer-button', onGetBeers)
  $(document).on('click', '.remove-beer', deleteItem)
}

module.exports = {
  addHandlers,
  dynamicContent,
  onGetBeers
}
