/*
 * Client-side JS logic goes here
 */
const escapeText = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
 
  for (const tweet of tweets) {
    let $tweetData = createTweetElement(tweet);
    $("#tweets-container").prepend($tweetData);
  }
};
const createTweetElement = function(tweetData) {
  /* code for creating the tweet element */
  const avatar = tweetData.user.avatars;
  const name = tweetData.user.name;
  const handle = tweetData.user.handle;
  const textinput = tweetData.content.text;
  const time = tweetData.created_at;
  let $tweet = `<article class="tweets">
  <header>
    <div class="tweetuser">
    <img class="tweeticon" tweet image src = "${avatar}"></img> 
    <div>${name}</div>
    </div>
    <div >${handle}</div>
  </header>                 
    <div class="tweetTextOld">${escapeText(textinput)}</div> 
    <footer>            
      <output name="days" class="days" for="tweet-text">${timeago.format(time)}</output>
      <div class="icons">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>  
    </footer>
   </article>`;
  return $tweet;
};

//AJAX to fetch (GET) data from server
const loadTweets = function() {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    dataType: 'json',
    success: (tweets) => {
      const $tweets = $('.tweets');
      $tweets.remove();
      renderTweets(tweets);
    },
    error: (err) => {
      console.log(`error: ${err}`);
    }
  });
};

$(document).ready(function() {

  loadTweets();

  const $form = $('#tweet-form');

  $form.on('submit', function(event) {
    event.preventDefault();
    console.log('The form was submitted!');

    //get text input from the form
    $textinput = $(this).closest("form").find("textarea").val();
    $message = $(".errormessage");
    $messagebox = $(".errorbox");
    $messagebox.slideUp();
    //get length of text input
    $texinputlength = $textinput.trim().length;

    if ($textinput === "" || $textinput === null) {
      $message.text("Please insert a tweet text.");
      $messagebox.slideUp(500, function() {
        $(this).css('display', 'flex'); // set display to flex as slide up default is block
      });
    } else if ($texinputlength > 140) {
      $message.text("Tweet can't exceed 140 chars");
      $messagebox.slideUp(500, function() {
        $(this).css('display', 'flex');
      });
    } else {
      //tweet will be posted after validation
      const serializedData = $(this).serialize();
      $.post('/tweets', serializedData, response => {
        console.log(response);
        loadTweets();
        $form[0].reset();      //clearing the form text input value
        $('.counter').val(140); //clearing the form counter value

      });
    }
  });
});




