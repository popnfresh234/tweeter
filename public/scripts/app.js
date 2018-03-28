/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 function createTweetElement(tweet){
  var $tweet = $('<article>').addClass('tweet-article');

  //build header
  var header = $('<header>').addClass('tweet-header')
  .append('<img src="' + tweet.user.avatars.small + '"/>')
  .append('<h4>'+tweet.user.name +'</h4>')
  .append('<h6>' +tweet.user.handle + '</h6>');

  $tweet.append(header);

  //add content
  $tweet.append('<p>' + tweet.content.text + '</p>');

  //build and append
  var footer = $('<footer>').addClass('tweet-footer')
  .append('<p>10 days ago</p>')
  .append('<i class="fas fa-heart icons"></i>')
  .append('<i class="fas fa-retweet icons"></i>')
  .append('<i class="fas fa-flag icons"></i>');

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

function handleTweet(input){
  var errorMsg = $('.tweet-error');
  if ( input.length > 140 ) {
    $(errorMsg).text('Tweet is too long!');
    $(errorMsg).css('visibility', 'visible');
  }else if( input === "" ) {
    $(errorMsg).text('Empty tweet');
    $(errorMsg).css('visibility', 'visible');
  } else {
    errorMsg.css('visibility', 'hidden');
    console.log('Submit!');
  }
}

// Test / driver code (temporary)
$(document).ready( function () {
  loadTweets();
  //Handle new tweets
  $('.new-tweet').find('input').on('click', function (event) {
    event.preventDefault();
    handleTweet($(this).parent().serialize().split('=')[1]);
  });
});
