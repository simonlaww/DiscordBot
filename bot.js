'use strict';
var Discordie = require('discordie');
const snoowrap = require('snoowrap');
var request = require('request');

var client = new Discordie();
const Events = Discordie.Events;

// const Client = require('discord.js').Client;
// const music = require('discord.js-music');

// const client = new Client();
// music(client);

// request.post(
// 	'https://www.reddit.com/api/v1/access_token',
// 	{ 
// 		grant_type: 'refresh_token',
// 		code: 'nXjfsBw9uyqbVdzqzIaoM1VUa3Q',
// 		redirect_uri: 'http://www.simonlaw.herokuapp.com/'
// 	},
// 	function (error, response, body) {
// 		if (!error && response.statusCode == 200) {
//             console.log(body)
//         } else {
//         	console.log(body)
//         }
// 	}
// );

const reddit = new snoowrap({
  userAgent: 'Simon Law',
  clientId: 'INSERT CLIENT ID',
  clientSecret: 'INSERT CIENT SECRET',
  refreshToken: 'INSERT REFRESH TOKEN'
});

const otherRequester = new snoowrap({
  userAgent: 'Simon Law',
  clientId: 'INSERT CLIENT ID',
  clientSecret: 'INSERT CLIENT SECRET',
  username: 'INSERT USERNAME',
  password: 'INSERT PASSWORD'
});

var memes = [];
var gifRecipes = [];
var dogs = [];

otherRequester.getSubreddit('dankmemes').getRandomSubmission().then(result => {
	memes.push({
		title: result.title,
		url: result.url
	});
});

otherRequester.getSubreddit('GifRecipes').getRandomSubmission().then(result => {
	gifRecipes.push({
		title: result.title,
		url: result.url
	});
});

otherRequester.getSubreddit('dogpictures').getRandomSubmission().then(result => {
	dogs.push({
		title: result.title,
		url: result.url
	});
});

client.connect({
	// Usually username and password, but bot only needs token
	token: 'Mjk3NjIyNDc2MjkxMTc4NDk2.C8DfOw.-l1eikzmtlGQvrkppGq0BdNoM14'
});

// client.loginWithToken('Mjk3NjIyNDc2MjkxMTc4NDk2.C8DfOw.-l1eikzmtlGQvrkppGq0BdNoM14')

client.Dispatcher.on(Events.GATEWAY_READY, e => {
	console.log('Connected as: ' + client.User.username);
});


client.Dispatcher.on(Events.MESSAGE_CREATE, e=> {
	if(e.message.content == '!meme') {
		otherRequester.getSubreddit('dankmemes').getRandomSubmission().then(result => {
			memes.push({
				title: result.title,
				url: result.url
			})
		});
		var meme = memes[memes.length-1].title.concat(' ').concat(memes[memes.length-1].url)
		e.message.channel.sendMessage(meme);
	}
	if(e.message.content == '!dogs') {
		otherRequester.getSubreddit('dogpictures').getRandomSubmission().then(result => {
			dogs.push({
				title: result.title,
				url: result.url
			})
		});
		var dog = dogs[dogs.length-1].title.concat(' ').concat(dogs[dogs.length-1].url)
		e.message.channel.sendMessage(dog);
	}
	// var upvotes = 0;
	if(e.message.content == '!food') {
		// while (upvotes == 0) {
		// 	otherRequester.getSubreddit('GifRecipes').getRandomSubmission().then(result => {
		// 		console.log(result.ups);
		// 		if (result.ups > 500) {
		// 			gifRecipes.push({
		// 				title: result.title,
		// 				url: result.url
		// 			});
		// 			upvotes = 1;
		// 			console.log(result.ups);
		// 		} else {
		// 			Promise.resolve();
		// 		}
		// 	});
		// }
		otherRequester.getSubreddit('GifRecipes').getRandomSubmission().then(result => {	
			gifRecipes.push({
				title: result.title,
				url: result.url
			})
		});
		var gif = gifRecipes[gifRecipes.length-1].title.concat(' ').concat(gifRecipes[gifRecipes.length-1].url)

		e.message.channel.sendMessage(gif);
	}
});