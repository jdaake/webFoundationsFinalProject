# Overview

I'm going to break down your feedback into four disctinct sections:

1. Layout / Design - Anything with the actual look/feel of the pages or any comments on your file structures.
2. HTML / CSS - Any suggestions for removal of extra tags or re-nesting elements as well as DRY CSS issues
3. Javascript / Functionality - Everything from DRY issues to missing functionality etc.
4. Final thoughts - General wrapup of all the feedback and my thoughts.

Each of these sections will then have a portion for each individual page as well as a section for All Pages. If you have any concerns about the comments or questions as to why I made any specific suggestions don't hesitate to ask!

<!-- ## Layout/Design
Overall solid design work across the site. The only major issues I have are regarding different size screens as you'll see below. Also, it seems
super nitpicky but your front page of a site should always be in the top level folder. This is because when a server loads, if you don't have custom routing (and sometimes even if you do) it defaults to whatever html file is called `index.html` in the top level folder for the site. At this point its accepted best practice even WITH custom rouuting. -->

### All Pages

<!-- * You're importing the js files for ALL of the pages on each page. If you have custom JS for each page this doesn't need to happen. If you want some code repeated on each of them  for example the menu at the top or the feedback form, pull that out to a separate js file like `shared.js` or `menu.js` and then have each page load the page specific AND that custom styling. -->
<!-- * So there are a couple issues with the menu you're currently using. If you drop down to the size where the menu items disappear and are replaced by the hamburger icon clicking the icon doesn't open up the menu. There by making the menu inaccessable at lower screen widths. So this can be accomplished with the following minor adjustments:
    1. Remove the `$("#logoutButton").css('display', 'inherit');` and the `$('#loginButton').css('display', 'inherit');` from the js files adjusting the menu items.
    2. Add the `py-0` class (removes top and bottom padding) and the `text-center` (centers text for mobile menu view) to the `nav` tag.
    3. Remove the `height: 50px` from the css file for the navbar itself.
    4. Add the `mt-0` class (removes top margin) to each of the `li` tags in the nav
    5. Add the `ml-auto` class to the `ul` tag containing the login and logout buttons
    6. Remove the `float-right` classes from the login and logout buttons.
    7. Remove the trailing spaces from the `data-target` and `aria-controls` attributes on the `nav` tag and from the `id` attribute of the div with `id="navbarSupportedContent "` -->
<!-- * So basically what the above does is it keeps the login and logout to the right with the ml-auto on the ul tag (therby not needing the float-right classes). By removing the top and bottom margins and padding it keeps the menu to the same size as it was before (the 50px). By removing the trailing spaces it allows for the dropdown menu button to function. The text-center makes it a cleaner look when the dropdown mobilem menu is open. And finally removing the height: 50px allows for the background to dropdown when the mobile menu opens up. -->
<!-- * You're importing all of your javascript tags at the bottom of your body. This is completely acceptable for the about.js/index.js etc. As a best practice though, load all prereqs such as jQuery, popper, and bootstrap.js in the head. If you wrap your js file in a $(document).ready() you can also load those files (index.js etc) in the head. -->

<!-- - I'll probably mention it again in the js/functionality section but make sure you're not just hiding the login/logout buttons. I would suggest completely removing them in their entirety from the DOM. -->
  <!-- * For the feedback form on all pages I would recommend having the text area line up on the right side with the email input so the end of each box are directly inline. This would help maintain the clean look you have going through the rest of the page.
- Also on the feedback form, from a UX standpoint I would recommend changing "Save Changes" to say "Submit Feedback" and ensure that when the button is clicked it closes the modal. -->

<!-- ### Main Page
* You're running into a couple issues with the box sizing on smaller screen. For the carousel and the div to its left they break on smaller screens. I would suggest removing the `height: 500px` from the .boxLeft css to allow the div to grow. You could also change the `col-5` and `col-7` classes to be `col-md-5` and `col-md-7` then add `col-12` to each of the boxes to allow for the containers to increase in size at lower screen resolutions. If you're doing the above you'll also want to remove the `height: 500px` from the right box as well otherwise it will have a ton of deadspace below it.  -->
<!-- * The three cards at the bottom (although I didn't metion this in the readme) would probably look best at lower resolutions if they were stacked in a column. This could be accomplished by changing some of the `col-` classes on them as well as changing some styling or adding/removing bootstrap classes to the containers.  -->

<!--
### About
* Similar to the Main page, at lower resolutions you should change the layout of the boxLeft and boxRight to have different widths at lower resolutions so they don't appear smashed together.
* I would reccomend the same as above for the comments. At lower resolutions instead of 3 across you could go to 2 across and then finally only 1 per row. This is easily accomplished through the addition of more `col-??` and/or `col-??-??` classes -->

### Library

<!-- * The endpoint select and the rest of the search fields for the different endpoints don't have the same left and right margin leading to an uneven feel. From a strict UI sense I would recommend having a bottom border underneath the endpoint container. -->
<!-- * The div with the `id="searchResults"` has the row and container-fluid classes. This leads to an uneven margin. I would suggest removing both of those and then replacing the justify-content-center with justify-content-between. This would also require you to add the flex-wrap class as well. -->
<!-- * On smaller size screens like the previous suggestions, take a look at adding in different `col-xx-xx` classes.  -->

<!-- ### Login
* Honestly no issues. Looks really good. -->

## HTML / CSS

### All Pages

<!-- - Take a look at some of the classes you have in your css and some of the selectors. You have a lot of repetitive declarations such as all of the queryBox, langBox etc having the same declaration. If you wanted to you could make a custom class or use the d-none class from bootstrap to accomplish that. -->

- There are a lot of overlap with existing bootstrap classes for some of your declarations as well.
  <!-- * When you're using things like `color: rgb(219, 70, 26);` in different selectors (shows up 6x in your CSS) you're probably better off making it a separate class and adding it where it makes the most sense. -->
- If you have a selector that only has one function like adding margin to the top it's usually best practice at a lot of places (although not at considered so some places I've worked) to instead of saying like `.someClass{margin-top: 100px;}` saying `.mt100{margin-top: 100px;}` and then adding that class where you need said class. It can lead to more lines of CSS but definitely helps to make classes more clear in the HTML file itself.
  <!-- * You're using `<br>` tags in your modal body for the feedback on all pages. Try to avoid those tags whenever possible. The same effect can be accomplished via CSS and the use of block elements.
- Also in the modal you have unlinked label tags such as in the following snippet: `<label for="stars">Rate us!</label> <select>...` If you're using a label tag you need to have it "linked" to its corresponding form element. For it to link the `for` attribute has to contain the `id` of the form element it goes with. So in the case of the example above, you should refactor it to: `<label for="stars">Rate us!</label> <select id="stars">...` so the select has an `id` attribute that matches its `label` and vice versa. -->
  <!-- ### Main Page
- No issues specific to the Main Page that I saw only the ones shared across all pages as outlined above. -->
  <!-- ### About
- As mentioned above you have some labels that aren't linked properly to their corresponding form elements. If you have labels best practice is to have them linked.

### Library

- Same as above regarding labels and form elements. -->
  <!-- ### Login
- Same thing with labels and forms. -->

## Javascript / Functionality

<!-- Overall you have the majority of the functionality with clean code. You're missing a few pieces of functionality that I'll outline below.  -->

### All Pages

<!-- - I mention it earlier but I would suggest removing the login or logout buttons when a user is/isn't logged in as opposed to hiding them. This is best practice and while you can do this now a lot of frameworks take the heavy lifting out for you in the future with things like `ngIf` for angular. -->
  <!-- * You have the snippet of code to change what links are visible at the top of each js file. I mention it above but it would probably be best to remove out repeated code to a separate js file with an appropriate name. -->
  <!-- * Your feedback form doesn't long anything to the console and also doesn't close when the "Save Changes" button is clicked. Like I mention above if you rename it "Submit" and it doesn't close on click it can lead to a user thinking it's broken which might cause multiple submissions before they just manually close it.  -->
  <!-- ### Main Page
- No issues (no real JS on this page outside of the shared menu JS) -->
  <!-- ### About
- Lines 127-129 are a repeat of the entire `sortByRatingDescending()` function. These lines of code can be moved to line 177 right before `appendRating()` where you can simply just call the `sortByRatingDescending()` function.
- No other issues. -->
  <!-- ### Library
- At the top of the file you should verify to see if there is a user saved in localStorage and if there isn't set the `window.location.href = 'path to the login file';` This will ensure that if a user isn't logged in they don't have access to the library. As it is I can type in /library/library.html manually and get access to the page. -->
  <!-- * You have a lot of `someSelector.css()` lines of code and some of them are repetitive such as

````javascript
    $('#offsetBox').css('display', 'none');
    $('#ratingBox').css('display', 'none');
    $('#langBox').css('display', 'none');
``` -->
<!-- * If you were to add a single class to all of those such as "searchItems" or whatever you could simply say `$('.searchItems').css('display', 'none')`; -->
<!-- * You're reusing a lot of code between line 75 and 175. Since you're using a .fail for each of the calls my suggestion is as follows:
    1. Instead of the if `.val() === something` then do that `getJSON`, I'd suggest having an if `.val()=== something` then build the query string based off the format for that endpoint.
    2. Then you could have a single .getJSON with whatever string was built for the appropriate endpoint. This would be the URL built custom for search or translate or random.
    3. The only refactoring portion would be that since you'd either need `data` or `data.data` you could simply say `if(Array.isArray(data.data)){appendGif(data.data)}` `else{appendGif(data)}` this would remove upwards of 70 lines of code if properly refactored.
* You're utilizing `alert()` in several places. In production code you pretty much never want to use alerts. Best practice would be to update the DOM in some way. This could be as simple as adding a card to the results container saying "Something went wrong etc etc." -->

<!-- - The translate and random endpoints will ALWAYS return results even if the user types in something like `fajp8o43ljq7avjl` in the search field. The search endpoint will return an empty array if nothing matches the search field though. I would suggest refactoring the code to have feedback to the DOM to say something like "No Results Found Try a Different Search Term" otherwise it can come across as a broken site which can lead to a bad user experience. -->

### Login

<!-- - You have a lot of `someSelector.css()` lines of code and some of them are repetative such as

```javascript
$('#loginSubmit').css('display', 'none');
$('.username').css('display', 'none');
$('.password').css('display', 'none');
``` -->

<!-- - If you were to add a single class to all of those such as "loginStepOne" or whatever you could simply say `$('.loginStepOne').css('display', 'none')`; -->
  <!-- * On lines 45-57 you're looping through all of the USERS array to check each ones password and username. Unfortunately if there's a match you're not stopping the loop. What this means is that the counter for the loop `i` will keep counting up. When you go to save `USERS[i]` in localStorage on line 77 `i` will ALWAYS be equal to the last index of USERS so only the last user will ever be stored. To overcome this you can add a `return;` in place of `verified = true` at line 50. Then you can remove the if statement at around the code on lines 54 and 55 since that code will only be hit if a username and password DON'T match. -->
<!-- - At the top of the file you should verify to see if there is a user saved in localStorage and if there is set the `window.location.href = 'path to the library file';` This will ensure that if a user is logged in they don't see the login form. -->

// <!-- ## Final Thoughts
// * First off these are the big things I noticed when going through the code and functionality. I might have missed things or not fully explained something in here that you want more clarification on. In general I tried to avoid making comments such as `I would have done it X way but Y way is acceptable` as that doesn't really help you learn. I stuck mostly to broken things or best practices.
// * Overall awesome work on this. This was A LOT to take in and I'm well aware of that.
// * Definitely focus on making sure your pages scale with the browser window as that can make or break a sites feel especially with so many things being accessed on smart phones today.
// * I would highly recommend you take a look at some basic tutorials for Angular between now and the start of Sebastian's class.
// * Also focus on refactoring all of the things I mentioned and once you're comfortable in Angular try going back and refactoring this project in angular.
// * You definitely have an aptitude for this and if you keep putting the effort in you have so far you'll do quite well.
// * Feel free to reach out if you have any concerns or thoughts. Also feel free to reach out for feedback if you go through and finish all of the bonus stuff for this or any of the other projects we worked on. -->

// <!-- One thing that I forgot to mention in your feedback is the use of `col-12` wrapping if you want extra padding between col elements. In your library when gifs are added you currently have them at `col-3` so they can fit three across with your spacing for marign. if you wrap the items in a `col-4 d-flex` div and then have the cards themselves be a col-12 it makes for a cleaner look with appropriate padding:

// `<div class="col-4 d-flex"> // <div class="card reviewCard col-12"> // <a class='align-self-center' href='${data[i].images.downsized.url}' target='_blank'><img class="card-img-top align-self-center" src="${data[i].images.downsized.url}" alt=""></a> // <div class="card-body d-flex flex-column"> // <h5 class="card-title-gif d-flex text-center justify-content-center">${data[i].title}</h5> // <h6 class="card-subtitle mb-2 d-flex text-center justify-content-center">Date Added: ${event}</h6> // <h6 class="card-subtitle mb-2 d-flex text-center justify-content-center">Rated: ${data[i].rating}</h6> // <div class="card-body row d-flex justify-content-center"> // <a href="${data[i].url}" target='_blank'class=" btn mt-auto align-self-center button">View Site</a> // </div> // </div> // </div> // </div>` -->
