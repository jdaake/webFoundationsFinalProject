$(function () {

  // Local Storage
  if (localStorage.getItem('user')) {
    $('#loginButton').css('display', 'none');
    $('#libraryButton').css('visibility', 'visible');
    // window.location.href = '../library/library.html'
  } else {
    $("#logoutButton").css('display', 'none');
    $('#libraryButton').css('display', 'none');
  }

  // Posting feedback to console
  $('#feedbackButton').on('click', (e) => {
    let name = $('#feedbackName').val();
    let email = $('#feedbackEmail').val();
    let stars = $('#stars').val();
    let feedback = $('#textArea').val();
    console.log(name, email, stars, feedback);
  })
})