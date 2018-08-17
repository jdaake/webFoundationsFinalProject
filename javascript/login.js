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
  ];

  $("#loginSubmit").on('click', (e) => {
    event.preventDefault();
    // Verify email address and password match a user
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
  });

  // Two-factor authentication function
  let code;

  twoFactAuth = () => {
    // Generate a random 6 digit number
    code = Math.floor(Math.random() * 900000) + 100000;
    // Disable login submit button so more codes are not generated.
    $('#loginSubmit').prop('disabled', true);
    // Hide username and password.
    $('.login').css('display', 'none');
    // Display code box
    $('.twoFactAuth').css('display', 'inherit');
    console.log(code);
  };

  // Submit code function
  $('#codeSubmitButton').on('click', (e) => {
    event.preventDefault();
    // Verify input value equals code.
    if ($('#auth').val() == code) {
      localStorage.setItem('user', JSON.stringify(USERS[i]));
      location.href = '../library/library.html';
    } else {
      $('#loginBox').css('display', 'none');
      $('#codeError').fadeIn(500).css('display', 'inherit');
    }
  });

  // Try Again button
  $('.tryAgain').on('click', (e) => {
    // Remove error box
    $('.errorBox').css('display', 'none');
    // Remove code box.
    $('.twoFactAuth').css('display', 'none');
    // Clear email/password/code values.
    $('.input').val('');
    // Bring back login box
    $('#loginBox').fadeIn(500).css('display', 'inherit');
    // Display username and password.
    $('.login').css('display', 'inherit');
    // Enable login submit button.
    $('#loginSubmit').prop('disabled', false);
  });

  // Cancel button
  $('.loginCancel').on('click', (e) => {
    event.preventDefault();
    location.href = '../index.html';
  });

  // Ready Close
});
//