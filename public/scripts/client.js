/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "/images/avatar1.png"
        ,
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
        "avatars": "/images/avatar2.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      $('.feeds').append(createTweetElement(tweet));
    }
  };

  const createTweetElement = function (tweets) {
    let $tweet = $('<article>').addClass('tweets');
  
    //create header element
    let $user = $('<div>').append($('<img>').attr('src', tweets.user.avatars), $('<h2>').text(tweets.user.name))
    let $handle = ($('<a>').attr('href', '/')).append($('<p>').text(tweets.user.handle));
    let $header = $('<header>').append($user, $handle);
  
  
    // create content element
    let $content = $('<div>').addClass('tweet').append($('<p>').text(tweets.content.text));
  
    // create footer elements  
    let $dateAndLikes = $('<div>').append($('<p>').text(moment(tweets.created_at).fromNow()), $('<p>').attr('id', 'likeCounter').text('0 likes'));
    let $symbols = $('<div>').append($('<i>').addClass('fa-solid fa-heart').attr('id', 'like'), $('<i>').addClass('fa-solid fa-retweet').attr('id', 'retweet'), $('<i>').addClass('fa-solid fa-flag').attr('id', 'flag'))
    let $footer = $('<footer>').append($dateAndLikes, $symbols);
  
    return $tweet.append($header, $content, $footer);
  };

  renderTweets(data);
});



