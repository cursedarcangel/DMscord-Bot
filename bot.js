const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const init = require('./initiativeTracker/initiative');
const dice = require('./diceRoller/roll');
const help = require('./help');

//logging in the bot
client.login(config.token);

client.on('ready', loggedIn);

//making sure we are logged in
function loggedIn() {
	console.log('Logged in');
}

init.initiative(client);

dice.roll(client);

help.helpMe(client);
