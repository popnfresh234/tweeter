/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 const tweetData = {
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
};

// <article class="tweet-article">
//   <header class="tweet-header">
//     <img src="/images/smiley.png"/>
//     <h4>Bill Fields</h4>
//     <h6>@MrFields</h6>
//   </header>
//   <p>Little tweet here</p>
//   <footer class=tweet-footer>
//     <p>10 days ago</p>
//     <i class="fas fa-heart icons"></i>
//     <i class="fas fa-retweet icons"></i>
//     <i class="fas fa-flag icons"></i>
//   </footer>
// </article>

function createTweetElement(tweet){
  let $tweet = $("<article>").addClass("tweet-article");

  //build header
  let header = $("<header>").addClass("tweet-header");
  header.append('<img src="/images/smiley.png"/>');
  header.append('<h4>Bill Fields</h4>');
  header.append('<h6>@MrFields</h6>');
  $tweet.append(header);
  $tweet.append('<p>Little tweet here</p>');

  let footer = $("<footer>").addClass("tweet-footer");
  footer.append('<p>10 days ago</p>');
  footer.append('<i class="fas fa-heart icons"></i>');
  footer.append('<i class="fas fa-retweet icons"></i>');
  footer.append('<i class="fas fa-flag icons"></i>');
  $tweet.append(footer);

  return $tweet;
}



// Test / driver code (temporary)
$(document).ready(function(){
  for (var i = 0; i < 10; i ++){
    var $tweet = createTweetElement(tweetData);
    $('#tweets-section').append($tweet);
  }
});
