$(document).ready(function() {

  // *** Load and Render Tweets ***

  const createTweetElement = function(tweets) {
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
    
    // Append header, content, and footer into the tweet article
    return $tweet.append($header, $content, $footer);
  };
  
  const renderTweets = function(tweets) {
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
  
  // call the function to load tweets when the page loads
  loadTweets();
  
  const postTweet = () => {
    // if text area is empty
    if (!$('#tweet-text').val().trim()) {
      $('#invalid').text('You cannot post an empty tweet!').show();
      $('#tweet-text').val(''),focus();
      setTimeout(() => {
        $('#invalid').text('');
        $('#invalid').hide();
      }, 2000);

      // if text area exceeds 140 characters
    } else if ($('#tweet-text').val().length > 140) {
      $('#invalid').text('Your tweet is too long!').show();
      $('#tweet-text').focus();
      setTimeout(() => {
        $('#invalid').text('');
        $('#invalid').hide();
      }, 2000)
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

  // Submit form when pressing enter but prevents it when pressing shift
  $('#tweet-text').keydown((event) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      postTweet();
    }
  });

  $('.compose').click(function() {
    $('.new-tweet').slideToggle('fast');
    $('.new-tweet textarea').focus();
  });

  $('.top-toogle').click(function() {
    $(document).off("scroll");
    $("html, body").stop(true, false).animate({ scrollTop: "0" }, () => {
      $(document).scroll(topScroll);
    });
    $('.new-tweet textarea').focus();
  });

});


