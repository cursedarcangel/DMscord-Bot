const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const init = require('./initiative');
const dice = require('./roll');

//logging in the bot
client.login(config.token);

client.on('ready', loggedIn);

//making sure we are logged in
function loggedIn() {
	console.log('Logged in');
}

init.initiative(client);

dice.roll(client);
