$(function () {

  // JSON users
  const userReviews = [{
      "name": "Dragan Perković",
      "rating": 2,
      "reviewDate": "03/12/2018",
      "comments": "They didn't have enough bear gifs. What's the point if they don't have enough bears?!?!"
    },
    {
      "name": "Frank Metzger",
      "rating": 3,
      "reviewDate": "03/02/2018",
      "comments": "Does exactly what it says it will do so good job!"
    },
    {
      "name": "Corinne Quessy",
      "rating": 5,
      "reviewDate": "05/21/2018",
      "comments": "All the cats I could ever want best site EVER!!!!!!"
    },
    {
      "name": "Hannah Harvey",
      "rating": 3,
      "reviewDate": "05/30/2018",
      "comments": "Highly reccomended if you need a ton of gifs."
    },
    {
      "name": "Kayla Bannan",
      "rating": 5,
      "reviewDate": "06/21/18",
      "comments": "What are you waiting for!?!? Sign up now!!!"
    },
    {
      "name": "Tyrone H. Singleton",
      "rating": 3,
      "reviewDate": "04/01/18",
      "comments": "It's ok I guess if this is your thing."
    },
    {
      "name": "Nazario Esposito",
      "rating": 1,
      "reviewDate": "06/30/2018",
      "comments": "I signed up without reading the terms and conditions and didn't realize I would have to pay for this. What the heck!?!"
    },
    {
      "name": "Edvin Nordström",
      "rating": 4,
      "reviewDate": "07/15/2018",
      "comments": "Easy to use, highly recommended."
    },
    {
      "name": "Anisa Lind",
      "rating": 2,
      "reviewDate": "04/15/18",
      "comments": "Dumb...."
    },
    {
      "name": "Linda Genovesi",
      "rating": 5,
      "reviewDate": "01/12/18",
      "comments": "Great site. Perfect 5/7"
    },
    {
      "name": "Gail S. Brown",
      "rating": 4,
      "reviewDate": "02/25/18",
      "comments": "4/5 stars"
    },
    {
      "name": "Lauren Hayes",
      "rating": 4,
      "reviewDate": "06/06/18",
      "comments": "Just renewed my membership, tots worth it!"
    },
    {
      "name": "Hanne Madsen",
      "rating": 4,
      "reviewDate": "08/01/18",
      "comments": "Love this site!"
    },
    {
      "name": "Steve Grabowski",
      "rating": 5,
      "reviewDate": "02/02/18",
      "comments": "It's a library for gifs just like the advertisement. I mean what else did you want from it?"
    },
    {
      "name": "Reginald J. Farnsworth",
      "rating": 1,
      "reviewDate": "06/18/18",
      "comments": "This isn't the XBOX remote I ordered! What the frick?"
    },
  ];

  // Split names
  let mapNames = userReviews.map((firstName) => {
    firstName.name = firstName.name.split(' ')[0];
    return firstName;
  });

  // Filter ratings
  let ratings = userReviews.filter((stars) => {
    return stars.rating > 2;
  });

  // Sort by the number of stars - Descending
  sortByRatingDescending = () => {
    ratings.sort((a, b) => {
      return b.rating - a.rating;
    });
  };

  // Sort by the number of stars - Ascending
  sortByRatingAscending = () => {
    ratings.sort((a, b) => {
      return a.rating - b.rating;
    });
  };

  // Sort by review date - Descending
  sortByDateDescending = () => {
    ratings.sort((a, b) => {
      return new Date(a.reviewDate) > new Date(b.reviewDate) ? -1 : 1;
    });
  };
  // Sort by review date - Aescending
  sortByDateAscending = () => {
    ratings.sort((a, b) => {
      return new Date(a.reviewDate) > new Date(b.reviewDate) ? 1 : -1;
    });
  };

  // Default Append Review
  appendRating = () => {
    for (var i in ratings) {
      $('#reviews').append(`<div class="card reviewCard col-lg-3 col-md-4 col-sm-12">
  <div class="card-body d-flex flex-column">
    <h5 class="card-title brandColor">${ratings[i].rating} stars</h5>
    <h6 class="card-subtitle mb-2 text-muted">${ratings[i].name} | ${ratings[i].reviewDate}</h6>
    <p class="card-text">${ratings[i].comments}</p>
  </div>
</div>`);
    }
  };

  // Change Sort By function

  $('#select').on('change', function () {

    $('#reviews').empty();

    if ($(this).val() == 'highestRating') {
      sortByRatingDescending();
    } else if ($(this).val() == 'lowestRating') {
      sortByRatingAscending();
    } else if ($(this).val() == 'mostRecent') {
      sortByDateDescending();
    } else if ($(this).val() == 'oldest') {
      sortByDateAscending();
    }
    appendRating();
  });
  sortByRatingDescending();
  appendRating();


  // Ready closure
});
// Ready closure