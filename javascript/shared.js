$(function () {

  // Local Storage
  if (localStorage.getItem('user')) {
    $('.navLogout').append(`<li id="logoutButton" class="nav-item mt-0">
        <a class="nav-link navFont" href="#">Logout</a>
        </li>`);
    $('.navLibrary').append(` <li class="nav-item mt-0">
        <a id="libraryButton" class="nav-link navFont" href="../library/library.html">Library</a>
        </li>`);
  } else {
    $('.navLogin').append(`<li id="loginButton" class="nav-item mt-0">
        <a class = "nav-link navFont"
        href = "../login/login.html"> Login </a> 
        </li>`);
    $('.navLibrary').remove('#libraryButton');
  }

  // Logout button function
  $('#logoutButton').on('click', (e) => {
    event.preventDefault();
    localStorage.clear();
    location.href = '../login/login.html';
  });

  // Posting feedback to console
  $('#feedbackButton').on('click', (e) => {
    let name = $('#feedbackName').val();
    let email = $('#feedbackEmail').val();
    let stars = $('#stars').val();
    let feedback = $('#textArea').val();
    console.log(name, email, stars, feedback);
  });
});