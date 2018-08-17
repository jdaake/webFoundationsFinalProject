$(function () {

  // Global variables
  let searchResults;
  let searchString;
  let jsonClass;

  // Local Storage
  if (localStorage.getItem('user') === null) {
    window.location.href = '../login/login.html';
  }

  // Endpoint display
  $('#endpoint').on('change', function () {

    // Search endoint
    if ($(this).val() == 'search') {
      $(this).addClass('search').removeClass('translate random');
      $('#searchQuery').css('border', '1px solid lightgray');
      displaySearchBox();
    }
    // Translate endpoint
    if ($(this).val() == 'translate') {
      $(this).addClass('translate').removeClass('search random');
      $('#searchQuery').css('border', '1px solid lightgray');
      displayTranslateBox();
    }
    // Random endpoint
    if ($(this).val() == 'random') {
      $(this).addClass('random').removeClass('translate search');
      $('#searchTag').css('border', '1px solid lightgray');
      displayRandomBox();
    }
  });

  // Display Search option
  displaySearchBox = () => {
    $('.searchItems').css('display', 'inherit');
    $('.notSearch').css('display', 'none');
  };

  // Display Translate option
  displayTranslateBox = () => {
    $('.translateItems').css('display', 'inherit');
    $('.notTranslate').css('display', 'none');
  };

  // Display Random option
  displayRandomBox = () => {
    $('.randomItems').css('display', 'inherit');
    $('.notRandom').css('display', 'none');
  };

  // Search Request
  $('#searchSearchButton').on('click', (e) => {
    e.preventDefault();

    // Reset borders on required fields
    $('#searchQuery').css('border', '1px solid lightgray');
    $('#searchTag').css('border', '1px solid lightgray');

    // getJSON Function
    getJSON = (endpoint, searchString) => {
      $.getJSON(`https://api.giphy.com/v1/gifs/${endpoint}?api_key=bRKQsfkBVYaGT5PT3sq4F46o5xO1VFHT&${searchString}`, (data) => {
        // Check to see if response is an array.
        if (Array.isArray(data.data)) {
          searchResults = data.data;
          // Set select index.
          $('#sortSelect').prop('selectedIndex', 0);
          appendGif(searchResults);
        } else {
          appendGif(data);
        }
      });
    };

    if ($('#endpoint').hasClass('search')) {
      if ($('#searchQuery').val() !== '') {
        endpoint = 'search';
        searchString = `q=${$('#searchQuery').val()}&limit=${$('#searchLimit').val()}&offset=${$('#searchOffset').val()}&rating=${$('#searchRating').val()}&lang=${$('#searchLang').val()}`;
        getJSON(endpoint, searchString);
      } else if ($('#searchQuery').val() == '') {
        $('#searchQuery').css('border', '2px solid red');
      }
    } else if ($('#endpoint').hasClass('translate')) {
      if ($('#searchQuery').val() !== '') {
        endpoint = 'translate';
        searchString = `s=${$('#searchQuery').val()}`;
        getJSON(endpoint, searchString);
      } else if ($('#searchQuery').val() == '') {
        $('#searchQuery').css('border', '2px solid red');
      }
    } else if ($('#endpoint').hasClass('random')) {
      if ($('#searchTag').val() !== '') {
        endpoint = 'random';
        searchString = `tag=${$('#searchTag').val()}&rating=${$('#searchRating').val()}`;
        getJSON(endpoint, searchString);
      } else if ($('#searchTag').val() == '') {
        $('#searchTag').css('border', '2px solid red');
      }
    }
  });

  // Append data
  appendGif = (data) => {
    // Clear results
    $('#searchResults').empty();
    // Add border
    $('.bottomBorder').css('border-bottom', '5px inset lightgray');

    // Add sort options if Search endpoint is used.
    if ($('#endpoint').hasClass('search')) {
      $('#selectFilter').css('display', 'inherit');
    } else {
      $('#selectFilter').css('display', 'none');
    }

    // Card if no information is returned.
    if (data == '') {
      $('#selectFilter').css('display', 'none');
      $('#searchResults').append(`
      <div class="col-lg-4 col-md-6 d-flex">
        <div class="card reviewCard col-lg-12">
        <div class="card-body d-flex flex-column">
        <h1 class ='card-title d-flex text-center justify-content-center brandColor'>Oops...Something went wrong.</h1>
        <h5 class="card-text d-flex text-center">No information was returned. Please try another search string.</h5>
        </div>
        </div>
        </div>`);
    } else {
      // Loop through JSON data and create GIF card.
      for (var i in data) {

        // Convert date and time
        var event = new Date(data[i].import_datetime);
        event = event.toLocaleString('en-US', {
          timeZone: 'UTC'
        });
        event = event.split(',')[0];

        // Append GIF cards
        $('#searchResults').append(`
      <div class="col-lg-4 col-md-6 d-flex">
        <div class="card reviewCard col-lg-12">
        <a class='align-self-center' href='${data[i].images.downsized.url}' target='_blank'><img class="card-img-top align-self-center" src='${data[i].images.downsized.url}' alt="GIF image"></a>
        <div class="card-body d-flex flex-column">
        <h5 class="card-title-gif d-flex text-center justify-content-center brandColor">${data[i].title}</h5>
        <h6 class="card-subtitle mb-2 d-flex text-center justify-content-center">Date Added: ${event}</h6>
        <h6 class="card-subtitle mb-2 d-flex text-center justify-content-center">Rated: ${data[i].rating}</h6>
        <div class="card-body row d-flex justify-content-center">
        <a href="${data[i].url}" target='_blank' class=" btn mt-auto align-self-center button">View Site</a>
        </div>
        </div>
        </div>
        </div>`);
      }
    }
  };

  // Select sort function
  $('#sortSelect').on('change', function () {
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
  });

  // Sorting functions

  // Sort A to Z
  titleAscending = () => {
    searchResults.sort((a, b) => {
      return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
    });
  };

  // Sort Z to A
  titleDescending = () => {
    searchResults.sort((a, b) => {
      return a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1;
    });
  };

  // Sort by Rating Ascending
  ratingAscending = () => {
    searchResults.sort((a, b) => {
      return a.rating.toLowerCase() > b.rating.toLowerCase() ? 1 : -1;
    });
  };

  // Sort by Rating descending
  ratingDescending = () => {
    searchResults.sort((a, b) => {
      return a.rating.toLowerCase() > b.rating.toLowerCase() ? -1 : 1;
    });
  };

  // Sort by Oldest Date
  dateOldestGif = () => {
    searchResults.sort((a, b) => {
      return new Date(a.import_datetime) > new Date(b.import_datetime) ? 1 : -1;
    });
  };

  // Sort by Newest Date
  dateNewestGif = () => {
    searchResults.sort((a, b) => {
      return new Date(a.import_datetime) > new Date(b.import_datetime) ? -1 : 1;
    });
  };

  // Ready Close
});
//