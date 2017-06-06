'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const authEvents = require('./auth/events.js')
// on document ready return beers
const beerEvents = require('./beer/events.js')
// if do dynamicContent:
  // const api = require('./beer/api')
  // const ui = require('./beer/ui')

// for secret keys:
// const MessageVerifier = require('lib/wiring/message-verifier')
// const googlePlacesKey = process.env.SECRET_PLACES_API_KEY
const googlePlacesKeyPrint = function () {
  console.log('secure-places-token', process.env.SECRET_PLACES_API_KEY)
}
// const googleJavascriptKey = new MessageVerifier('secure-javascript-token', process.env.SECRET_JAVASCRIPT_API_KEY)
const googleJavascriptKeyPrint = function () {
  console.log('secure-javascript-token', process.env.SECRET_JAVASCRIPT_API_KEY)
}

$(() => {
  googlePlacesKeyPrint()
  googleJavascriptKeyPrint()
  setAPIOrigin(location, config)
  $('.form-control').val('')
  $('#add-task-modal').on('hidden.bs.modal', function () {
    $(this).find('input,textarea,select').val('').end()
  })
  $('#changePasswordModal').on('hidden.bs.modal', function () {
    $(this).find('input,textarea,select').val('').end()
    $('#ChangePasswordError').hide()
    $('#ChangePasswordSuccess').hide()
    $('.form-group-pw').show()
  })
  $('#signUpModal').on('hidden.bs.modal', function () {
    $(this).find('input,textarea,select').val('').end()
    $('#signInError').hide()
  })
  $('#signInModal').on('hidden.bs.modal', function () {
    $(this).find('input,textarea,select').val('').end()
    $('#signUpError').hide()
    $('#signUpSuccess').hide()
  })
  $('#createBeer').on('hidden.bs.modal', function () {
    $(this).find('input,textarea,select').val('').end()
  })

  authEvents.addHandlers()
  beerEvents.addHandlers()
  $('.form-control').val('')  // This clears out all the form input fields when the document is first loaded
  $('#signUpModal').hide()
  $('.nav-btns').hide()
  $('.create-a-beer').hide()
  $('.update-a-beer').hide()
  $('.get-beers').hide()
})

// query parameters from URL
// $(document).ready(function () {
//   $('input:radio').attr('checked', false)
//   $('input[typed="radio"]').removeAttr('checked')
// // Check if the URL parameter is apples
//   const dc = beerEvents.dynamicContent
//   // console.log(dc)
//   if (dc[0] === 'respondents' && dc[1] !== undefined) { // Check if the URL parameter is bananas
//     $('#respondents').show()
//     api.getOneDynamicBeer(dc[1])
//       .then(ui.getOneDynamicBeerSuccess)
//       .catch(ui.getOneDynamicBeerFailure)
//     // Check if the URL parmeter is empty or not defined, display default content
//   } else {
//     $('#default-content').show()
//   }
// })

$(document).ready(function () {
  $('#respondents').bind('keypress', function (event) {
    if (event.keyCode === 13) {
      return false
    }
  })
})
