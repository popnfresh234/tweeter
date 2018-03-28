
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

 function createTweetElement(tweet){
  var $tweet = $('<article>').addClass('tweet-article');

  //build header
  var header = $('<header>').addClass('tweet-header')
  .append('<img src="' + tweet.user.avatars.small + '"/>')
  .append('<h4>' + tweet.user.name +'</h4>')
  .append('<h6>' + tweet.user.handle + '</h6>');

  $tweet.append(header);

  //add content
  $tweet.append('<p>' + escape(tweet.content.text) + '</p>');

  //build and append
  var footer = $('<footer>').addClass('tweet-footer')
  .append('<p>' + moment(tweet.created_at).fromNow() + '</p>')
  .append('<i class="fas fa-heart icons"></i>')
  .append('<i class="fas fa-retweet icons"></i>')
  .append('<i class="fas fa-flag icons"></i>');

  $tweet.append(footer);

  return $tweet;
}

function renderTweets (tweets) {
  tweets.forEach((tweet) => {
    var $tweet = createTweetElement (tweet);
    $('#tweets-section').prepend ($tweet);
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

function postTweet (tweet) {
  $.ajax({
    url: '/tweets',
    method: 'POST',
    data: tweet,
    dataType: 'text',
    success: function (){
     loadTweets();
    }
  });
}

function handleTweet(tweet){
  var input = tweet.split('=')[1];
  var errorMsg = $('.tweet-error');
  if ( input.length > 140 ) {
    $(errorMsg).text('Tweet is too long!');
    $(errorMsg).css('visibility', 'visible');
  }else if( input === "" ) {
    $(errorMsg).text('Empty tweet');
    $(errorMsg).css('visibility', 'visible');
  } else {
    errorMsg.css('visibility', 'hidden');
    postTweet(tweet);
  }
}

// Test / driver code (temporary)
$( function () {
  loadTweets();
  console.log(moment().startOf('hour').fromNow());
  //Handle new tweets
  $('.new-tweet').find('input').on('click', function (event) {
    event.preventDefault();
    handleTweet($(this).parent().serialize());
  });

  $('a').on('click', function (event) {
    event.preventDefault();
    var id = $(this).attr('href');
    if (id === 'compose') {
      $('.new-tweet').slideToggle('slow', function(){
        $('.new-tweet').find('textarea').focus();
      });
    }
  });
});
