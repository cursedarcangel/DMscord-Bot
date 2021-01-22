const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

client.login(config.token);

client.on('ready', loggedIn);

function loggedIn() {
	console.log('Logged in and ready to go');
}

client.on('message', message => {
	if (message.content.includes('!roll')) {
		message.channel.send('20!');
	}
});
