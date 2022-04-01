$(document).ready(function () {

// *** Load and Render Tweets ***

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
  
  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      $('.feeds').prepend(createTweetElement(tweet));
    }
  };
  
  // *** Form Submit new tweet to database ***

  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    }).done((tweet) => {
      $('.feeds').empty();
      renderTweets(tweet);
    })
  }
  
  loadTweets();
  
  const postTweet = () => {
    if (!$('#tweet-text').val().trim()) {
      $('#invalid').text('You cannot post an empty tweet!');
      $('#invalid').css({'border': '2px solid red'}).show();
      $('#tweet-text').val(''),focus();
    } else if ($('#tweet-text').val().length > 140) {
      $('#invalid').text('Your tweet is too long!');
      $('#error').css({'border': '2px solid red'}).show();
      $('#tweet-text').focus();
    } else {     
      $.ajax({
        data: $('form').serialize(),
        url: '/tweets',
        method: 'POST'
      }).done((tweet) => {
        loadTweets();
        $('#tweet-text').val('');
        $('#tweet-text').focus();
        $('#counter').val(140);
      });
    }
  }

  $('form').on('submit', (event) => {
    // prevent refresh
    event.preventDefault();
    postTweet();
  })

  $('#tweet-text').keydown((event) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      postTweet();
    }
  });
});


