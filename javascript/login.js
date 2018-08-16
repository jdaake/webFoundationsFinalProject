$(function () {

  if (localStorage.getItem('user')) {
    window.location.href = '../library/library.html';
  }

  const USERS = [{
      email: "steveg@example.com",
      password: "PaSsWoRd",
      birthday: "2000-09-30 00:00:00",
      role: "basic"
    },
    {
      email: "hanneM@example.com",
      password: "hanneRules!",
      birthday: "1980-04-15 00:00:00",
      role: "basic"
    },
    {
      email: "lindaG@example.com",
      password: "lg014589",
      birthday: "2012-01-03 00:00:00",
      role: "admin"
    },
    {
      email: "nEsposito@example.it",
      password: "pswd1234",
      birthday: "1975-03-23 00:00:00",
      role: "advanced"
    },
    {
      email: "daakejl@gmail.com",
      password: "password",
      birthday: "1985-11-12 00:00:00",
      role: "admin"
    },
    {
      email: "draganP@example.hr",
      password: "volimbaku",
      birthday: "1995-06-06 00:00:00",
      role: "advanced"
    }
  ]


  // Verify email and password and store in localStorage
  let verified = false

  $("#loginSubmit").on('click', (e) => {
    event.preventDefault();
    for (i in USERS) {
      if ($('#emailAddress').val() === USERS[i].email && $('#pass').val() === USERS[i].password) {
        twoFactAuth();
        return;
      }
    }
    for (i in USERS) {
      if ($('#emailAddress').val() !== USERS[i].email && $('#pass').val() !== USERS[i].password) {
        $('#loginBox').css('display', 'none');
        $('#error').fadeIn(500).css('display', 'inherit');
      }
    }
  })

  // Two-factor authentication function
  let code;

  twoFactAuth = () => {
    code = Math.floor(Math.random() * 900000) + 100000;
    $('#loginSubmit').prop('disabled', true);
    $('.login').css('display', 'none');
    $('.twoFactAuth').css('display', 'inherit');
    console.log(code)
  }

  // Submit code function
  $('#codeSubmitButton').on('click', (e) => {
    event.preventDefault();
    if ($('#auth').val() == code) {
      localStorage.setItem('user', JSON.stringify(USERS[i]));
      location.href = '../library/library.html'
    } else {
      $('#loginBox').css('display', 'none');
      $('#codeError').fadeIn(500).css('display', 'inherit');
      verified = false
    }
  })

  // Try Again button
  $('.tryAgain').on('click', (e) => {
    $('#pass').val('');
    $('#emailAddress').val('');
    $('#auth').val('');
    $('#loginSubmit').prop('disabled', false);
    $('#error').css('display', 'none')
    $('#codeError').css('display', 'none');
    $('#loginBox').fadeIn(500).css('display', 'inherit');
    $('#loginSubmit').css('display', 'inherit');
    $('.username').css('display', 'inherit');
    $('.password').css('display', 'inherit');
    $('.twoFactAuth').css('display', 'none');
    $('#codeSubmitButton').css('display', 'none');
    verified = false
  })

  // Cancel button
  $('.loginCancel').on('click', (e) => {
    event.preventDefault();
    location.href = '../index.html'
  })

  // Ready Close
})
//