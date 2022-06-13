var Twitter = require('twitter');
var config = require('./config.js')
var T = new Twitter(config);

//Search and Favorite Tweets
var params = {
    q: '#ConnectInMedicine',
    count: 50,
    result_type: 'All',
    lang: 'en'
}

T.get('search/tweets', params, function(err, data, response){
    if(!err){
        //Magic
        for(let i=0; i<data.statuses.length; i++){
            let id = {id: data.statuses[i].id_str}

            T.post('favorites/create', id, function(err, response){
                if(err){
                    console.log(err.message);
                }
                else{
                    let username = response.user.screen_name;
                    let tweetId = response.id_str;
                    console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`);
                }
            });
        }

        for (let i = 0; i < data.statuses.length; i++) {
            var retweetId = data.statuses[i].id_str;
            T.post('statuses/retweet/' + retweetId, function (err, response) {
             if (err) {
              console.log(err);
              console.log('Problem when retweeting. Possibly already retweeted this tweet!');
             } else if (response) {
              console.log(`Retweeeted ${response.user.screen_name} with status ${retweetId}`);
             }
            });
           }
    }
    else{
        console.log(err);
    }

})

// RETWEET BOT ==========================


