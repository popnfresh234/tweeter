
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 var loggedInUser;

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

function handleLoginState(){
  if (loggedInUser){
    $('#compose-menu').css('visibility', 'visible');
    $('.header-login').hide();
    $('.header').after('<span id="user-name" class="header-login">' + loggedInUser + '</span>');
    $('#nav-bar #logout-menu').css('visibility', 'visible');
  } else {
    $('.header-login').show();
    $('#logout-menu').css('visibility', 'hidden');
    $('#user-name').remove();
    $('#compose-menu').css('visibility', 'hidden');
  }
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
    success: function ({tweets, username}, status) {
      loggedInUser = username;
      handleLoginState();
      renderTweets(tweets);
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
  } else if ( input === "" ) {
    $(errorMsg).text('Empty tweet');
    $(errorMsg).css('visibility', 'visible');
  } else {
    errorMsg.css('visibility', 'hidden');
    //clear out data and rest counter
    $('.new-tweet span').last().text('140');
    $('.new-tweet textarea').val('');
    postTweet(tweet);
  }
}

// Test / driver code (temporary)
$( function () {
  loadTweets();
  //Handle new tweets
  $('.new-tweet').find('input').on('click', function (event) {
    event.preventDefault();
    handleTweet($(this).parent().serialize());
  });

  //Handle clicks on nav menu
  $('.nav-menu a').on('click', function (event) {
    event.preventDefault();
    var id = $(this).attr('href');
    if (id === 'compose') {
      $('.new-tweet').slideToggle('slow', function(){
        $('.new-tweet').find('textarea').focus();
      });
    }

    if (id === 'logout'){
      $.ajax({
        url: '/tweets/logout',
        method: 'POST',
        success: function (){
          loggedInUser = "";
          handleLoginState();
        }
      });
    }
  });
});
