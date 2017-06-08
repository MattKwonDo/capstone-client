'use strict'

const store = require('../store.js')
const beerEvents = require('../beer/events')

// const resetPwValidation = function () {
//   const message = document.getElementById('confirmMessage')
//   const pass2 = document.getElementById('password2')
//   pass2.style.backgroundColor = ''
//   message.style.color = ''
//   message.innerHTML = ''
// }

const signUpSuccess = (data) => {
  console.log(data)
  // $('.form-control').val('')
  $('#signUpModal').modal('hide')
  // $('.modal-backdrop').remove()
  // $('#signUpModal').remove()

  $('#signInModal').modal('show')
  // $('.header-message').show().html('Congratulations, you have a new account.')
  // $('.sign-in-msg').html('Log in.')

  // $('#sign-up').trigger('reset')

  // $('#signUpSuccessModal').modal('show')
  // resetPwValidation()
}

const signUpFailure = (error) => {
  $('.form-control').val('')

  $('#signUpError').show().html('Something\'s wrong. Try again.')
  setTimeout(function () {
    $('#signUpError').fadeOut(900)
  }, 1000)
  $('#sign-up').trigger('reset')
  console.error('SignUp failed ran data is:', error)
  // $('#signUpFailureModal').modal('show')
}

const signInSuccess = (data) => {
  store.user = data.user
  // $('#signInModal').modal('toggle')
  $('#signInModal').modal('hide')
  $('.modal-backdrop').remove()

  // $('.modal-backdrop').modal('toggle')
  // $('#signInModal').close()
  // console.log('sign in token = ', data.user.token)
  $('#signUpModal').hide()
  // $('#title-message').html('Beer Tracker')
  // $('.nav-message').hide()
  $('#ChangePasswordSuccess').hide()
  $('#change-password').trigger('reset')
  // $('.nav-btns').show()

// hide main page buttons
  $('.page-load-view').hide()
  $('.sign-in-view').show()

  // $('.page-load-view').addClass('fadeOut')
  // setTimeout(function () {
  //   $('.page-load-view').hide().fadeOut(3000)
  // }, 1000)

// show sign in page buttons
  $('#beer-content-container').addClass('fadeOut').show()
  // setTimeout(function () {
  //   $('#beer-content-container').show().fadeIn(3000)
  // }, 1000)

  // $('#default-content').toggle()
  $('.create-a-beer').show()
  $('.update-a-beer').show()
  $('.get-beers').show()
  $('#beer-list-table').show()
  $('#get-beer-button').show()
  $('#add-beer-button').show()
  $('#beers-content').addClass('animated rollIn')
  beerEvents.onGetBeers()
}

const signInFailure = (error) => {
  $('.form-control').val('')
  $('#signInError').show().html('Something\'s wrong with your login. Try again.')
  setTimeout(function () {
    $('#signInError').fadeOut(700)
  }, 1000)
  $('#sign-in').trigger('reset')
  console.error('signInFailure(), error: ', error)
}

const signOutSuccess = () => {
  console.log('signed out success')
  store.user = null
  $('.form-control').val('')
  $('#confirm-logout').modal('hide')
  $('.nav-btns').hide()
  $('#signUpModal').hide()
  $('#signUpModal').trigger('reset')
  $('#signInModal').trigger('reset')
  // $('#signInModal').show()
  $('#beer-list-table').hide()
  $('#get-beer-button').hide()
  $('#add-beer-button').hide()
  $('.list-group').empty()

// show main page buttons
  // $('.nav-btns').show()
  $('.sign-in-view').hide()
  $('.page-load-view').show()

  // $('#confirm-logout').remove()
}

const signOutFailure = (error) => {
  $('.form-control').val('')
  $('#change-password').trigger('reset')
  console.error('signOutFailure ran:', error)
}

const changePasswordSuccess = () => {
  $('.form-control').val('')
  $('#ChangePasswordError').hide()
  $('#ChangePasswordSuccess').show().html('Password changed! Close Screen to continue.')
  $('#change-password').trigger('reset')
  $('.form-group-pw').hide()
  // $('.list-group').empty()
}

const changePasswordFailure = (error) => {
  $('.form-control').val('')
  $('#ChangePasswordError').show().html('Check your password and try again.')
  setTimeout(function () {
    $('#ChangePasswordError').fadeOut(700)
  }, 1000)
  $('#change-password').trigger('reset')
  console.error('changePasswordFailure ran:', error)
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  changePasswordSuccess,
  changePasswordFailure
}
