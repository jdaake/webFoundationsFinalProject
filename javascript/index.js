$(function() {

// Local Storage
if (localStorage.getItem('user')) {
  $('#loginButton').css('display', 'none');
  $("#logoutButton").css('display', 'inherit');
  $('#libraryButton').css('visibility', 'visible');
}
else {
  $("#logoutButton").css('display', 'none');
  $('#loginButton').css('display', 'inherit');
  $('#libraryButton').css('display', 'none');
}

// Logout button function
$('#logoutButton').on('click', function(){
  event.preventDefault();
  localStorage.clear();
  location.href = 'index.html'
})

  // Ready function close
})
// Ready funciton close
