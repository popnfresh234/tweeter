/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from tweets.json
const data = [
{
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
},
{
  "user": {
    "name": "Descartes",
    "avatars": {
      "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
      "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
      "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
    },
    "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
  ];


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

function renderTweets(tweets){
  tweets.forEach(function(tweet){
    var $tweet = createTweetElement(tweet);
    $('#tweets-section').append($tweet);
  });
}

// Test / driver code (temporary)
$(document).ready(function(){
  renderTweets(data);
  $('.new-tweet').find('input').on('click', function(event){
    event.preventDefault();
  });

});
