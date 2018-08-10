$(function() {

  // Local Storage
  if (localStorage.getItem('user')) {
    $('#loginButton').css('display', 'none');
    $("#logoutButton").css('display', 'inherit');
    $('#libraryButton').css('visibility', 'visible');
  } else {
    $("#logoutButton").css('display', 'none');
    $('#loginButton').css('display', 'inherit');
    $('#libraryButton').css('display', 'none');
  }

  // Logout button
  $('#logoutButton').on('click', function() {
    event.preventDefault();
    localStorage.clear();
    location.href = '../login/login.html'
  })

  // Cancel button
  $('.libraryCancelButton').on('click', function() {
    $('#formOptions').empty();
  })

  // Endpoint display
  $('#endpoint').on('change', function() {
    if ($(this).val() == 'search') {
      $('#searchQuery').css('border', '1px solid lightgray');
      displaySearchBox();
    }
    if ($(this).val() == 'translate') {
      $('#searchQuery').css('border', '1px solid lightgray');
      displayTranslateBox();
    }
    if ($(this).val() == 'random') {
      $('#searchTag').css('border', '1px solid lightgray');
      displayRandomBox();
    }
  })

  // Display Search option
  function displaySearchBox() {
    $('#queryBox').css('display', 'inherit').removeClass('translate');
    $('#limitBox').css('display', 'inherit').addClass('search');
    $('#offsetBox').css('display', 'inherit');
    $('#ratingBox').css('display', 'inherit');
    $('#langBox').css('display', 'inherit');
    $('#tagBox').css('display', 'none').removeClass('random');
    $('#formButtons').css('display', 'inherit');
  }

  // Display Translate option
  function displayTranslateBox() {
    $('#selectFilter').css('display', 'none');
    $('#queryBox').css('display', 'inherit').addClass('translate');
    $('#limitBox').css('display', 'none').removeClass('search');
    $('#offsetBox').css('display', 'none');
    $('#ratingBox').css('display', 'none');
    $('#langBox').css('display', 'none');
    $('#tagBox').css('display', 'none').removeClass('random');
    $('#formButtons').css('display', 'inherit');
  }

  // Display Random option
  function displayRandomBox() {
    $('#selectFilter').css('display', 'none');
    $('#queryBox').css('display', 'none').removeClass('translate search');
    $('#limitBox').css('display', 'none').removeClass('search')
    $('#offsetBox').css('display', 'none');
    $('#ratingBox').css('display', 'inherit');
    $('#langBox').css('display', 'none');
    $('#tagBox').css('display', 'inherit').addClass('random');
    $('#formButtons').css('display', 'inherit');
  }

  // Search Request
  $('#searchSearchButton').on('click', function() {
    event.preventDefault();

    // Reset borders on required fields
    $('#searchQuery').css('border', '1px solid lightgray');
    $('#searchTag').css('border', '1px solid lightgray');

    // Reset Sort Select
    $('#sortSelect').prop('selectedIndex', 0);
    // Search Endpoint
    if ($('#limitBox').hasClass('search')) {
      if ($('#searchQuery').val() == '') {
        $('#searchQuery').css('border', '2px solid red');
      } else {
        $('#selectFilter').css('display', 'inherit');
        $.getJSON(`https://api.giphy.com/v1/gifs/search?api_key=bRKQsfkBVYaGT5PT3sq4F46o5xO1VFHT&q=${$('#searchQuery').val()}&limit=${$('#searchLimit').val()}&offset=${$('#searchOffset').val()}&rating=${$('#searchRating').val()}&lang=${$('#searchLang').val()}`, function(data) {
            searchResults = data.data;
            appendGif(searchResults);
          })
          .fail(function(jqXHR) {
            if (jqXHR.status == 404) {
              alert("404 Not Found");
            } else {
              alert("Other non-handled error type");
            }
          });
      }
    }

    // Translate Endpoint
    if ($('#queryBox').hasClass('translate')) {
      if ($('#searchQuery').val() == '') {
        $('#searchQuery').css('border', '2px solid red');
      } else {
        $.getJSON(`https://api.giphy.com/v1/gifs/translate?api_key=bRKQsfkBVYaGT5PT3sq4F46o5xO1VFHT&s=${$('#searchQuery').val()}`, function(data) {
            searchResults = data;
            appendGif(searchResults);
          })
          .fail(function(jqXHR) {
            if (jqXHR.status == 404) {
              alert("404 Not Found");
            } else {
              alert("Other non-handled error type");
            }
          });
      }
    }

    // Random Endpoint
    if ($('#tagBox').hasClass('random')) {
      if ($('#searchTag').val() == '') {
        $('#searchTag').css('border', '2px solid red')
      } else {
        $.getJSON(`https://api.giphy.com/v1/gifs/random?api_key=bRKQsfkBVYaGT5PT3sq4F46o5xO1VFHT&tag=${$('#searchTag').val()}&rating=${$('#searchRating').val()}`, function(data) {
            searchResults = data;
            appendGif(searchResults);
          })
          .fail(function(jqXHR) {
            if (jqXHR.status == 404) {
              alert("404 Not Found");
            } else {
              alert("Other non-handled error type");
            }
          });
      }
    }
  })

  // Append data
  function appendGif(data) {
    $('#searchResults').empty();
    for (i in data) {
      // Convert date and time
      var event = new Date(data[i].import_datetime);
      event = event.toLocaleString('en-US', {
        timeZone: 'UTC'
      })
      event = event.split(',')[0];

      // Append GIF cards
      $('#searchResults').append(`
        <div class="card reviewCard col-3">
        <a class='align-self-center' href='${data[i].images.downsized.url}' target='_blank'><img class="card-img-top align-self-center" src='${data[i].images.downsized.url}' alt="GIF image"></a>
        <div class="card-body d-flex flex-column">
        <h5 class="card-title-gif d-flex text-center justify-content-center">${data[i].title}</h5>
        <h6 class="card-subtitle mb-2 d-flex text-center justify-content-center">Date Added: ${event}</h6>
        <h6 class="card-subtitle mb-2 d-flex text-center justify-content-center">Rated: ${data[i].rating}</h6>
        <div class="card-body row d-flex justify-content-center">
        <a href="${data[i].url}" target='_blank'class=" btn mt-auto align-self-center button">View Site</a>
        </div>
        </div>
        </div>`)
    }
  }

  // Select sort function
  $('#sortSelect').on('change', function() {
    if ($(this).val() == 'titleAscending') {
      titleAscending();
    } else if ($(this).val() == 'titleDescending') {
      titleDescending();
    } else if ($(this).val() == 'ratingAscending') {
      ratingAscending();
    } else if ($(this).val() == 'ratingDescending') {
      ratingDescending();
    } else if ($(this).val() == 'newestGif') {
      dateNewestGif();
    } else if ($(this).val() == 'oldestGif') {
      dateOldestGif();
    }
    appendGif(searchResults);
  })

  // Sorting functions

  // Sort A to Z
  function titleAscending() {
    searchResults.sort(function(a, b) {
      return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
    })
  }

  // Sort Z to A
  function titleDescending() {
    searchResults.sort(function(a, b) {
      return a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1;
    })
  }

  // Sort by Rating Ascending
  function ratingAscending() {
    searchResults.sort(function(a, b) {
      return a.rating.toLowerCase() > b.rating.toLowerCase() ? 1 : -1
    })
  }

  // Sort by Rating descending
  function ratingDescending() {
    searchResults.sort(function(a, b) {
      return a.rating.toLowerCase() > b.rating.toLowerCase() ? -1 : 1
    })
  }

  // Sort by Oldest Date
  function dateOldestGif() {
    searchResults.sort(function(a, b) {
      return new Date(a.import_datetime) > new Date(b.import_datetime) ? 1 : -1
    })
  }

  // Sort by Newest Date
  function dateNewestGif() {
    searchResults.sort(function(a, b) {
      return new Date(a.import_datetime) > new Date(b.import_datetime) ? -1 : 1
    })
  }

  // Sort on click functions - Used for sort buttons.

  // A to Z Click function
  // $('#titleAscending').on('click', function() {
  //   titleAscending();
  //   appendGif(searchResults)
  // })

  // Z to A Click function
  // $('#titleDescending').on('click', function() {
  //   titleDescending();
  //   appendGif(searchResults)
  // })

  // Rating Ascending click function
  // $('#ratingAscending').on('click', function() {
  //   ratingAscending();
  //   appendGif(searchResults)
  // })

  // Rating Descending click function
  // $('#ratingDescending').on('click', function() {
  //   ratingDescending();
  //   appendGif(searchResults)
  // })

  // Oldest date click function
  // $('#oldestGif').on('click', function() {
  //   dateOldestGif();
  //   appendGif(searchResults)
  // })

  // Newest date click function
  // $('#newestGif').on('click', function() {
  //   dateNewestGif();
  //   appendGif(searchResults)
  // })

  // Ready Close
})
//
