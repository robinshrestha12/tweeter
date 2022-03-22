/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
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
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]
const renderTweets = function(tweets) {
// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
for(const tweet of tweets){
  console.log(tweet.user.name);
  $tweetData=createTweetElement(tweet);
  $("#tweets-container").append($tweetData);
}
}
const createTweetElement = function(tweetData) { 
  /* Your code for creating the tweet element */
  const avatar = tweetData.user.avatars;
  const name= tweetData.user.name;
  const handle=tweetData.user.handle;
  const textinput=tweetData.content.text;
  const time=tweetData.created_at;
  let $tweet = `<article class="tweets">
  <header>
    <div class="tweetuser">
    <img class="tweeticon" tweet image src = "${avatar}"></img> 
    <div>${name}</div>
    </div>
    <div >${handle}</div>
  </header>                 
    <div class="tweetTextOld">${textinput}</div> 
    <footer>            
      <output name="days" class="days" for="tweet-text">${time}</output>
      <div class="icons">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>  
    </footer>
   </article>`;
  console.log($tweet);
  return $tweet;
}
$(document).ready(function(){
  renderTweets(data);
});
  