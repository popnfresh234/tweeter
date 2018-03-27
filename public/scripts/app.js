/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function createTweetElement(tweet){
  var $tweet = $('<article>').addClass('tweet-article');

  //build header
  var header = $('<header>').addClass('tweet-header');
  header.append('<img src="' + tweet.user.avatars.small + '"/>');
  header.append('<h4>'+tweet.user.name +'</h4>');
  header.append('<h6>' +tweet.user.handle + '</h6>');
  $tweet.append(header);

  //add content
  $tweet.append('<p>' + tweet.content.text + '</p>');

  //build and append
  var footer = $('<footer>').addClass('tweet-footer');
  footer.append('<p>10 days ago</p>');
  footer.append('<i class="fas fa-heart icons"></i>');
  footer.append('<i class="fas fa-retweet icons"></i>');
  footer.append('<i class="fas fa-flag icons"></i>');
  $tweet.append(footer);

  return $tweet;
}

function renderTweets (tweets) {
  tweets.forEach(function (tweet) {
    var $tweet = createTweetElement (tweet);
    $('#tweets-section').append ($tweet);
  });
}

function loadTweets () {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    success: function (jsonTweets) {
      renderTweets(jsonTweets);
    }
  });
}

// Test / driver code (temporary)
$(document).ready( function () {
  loadTweets();
  $('.new-tweet').find('input').on('click', function (event) {
    event.preventDefault();
    console.log($(this).parent().serialize());
  });
});
