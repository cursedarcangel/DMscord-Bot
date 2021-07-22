const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const init = require('./initiativeTracker/initiative');
const dice = require('./diceRoller/roll');
const help = require('./help');
const magic = require('./magicItemTracker/magicTrack');
const stats = require('./statBlockTracker/statTracker');
const sR20 = require('./searchR20/sr20');

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

magic.magicItemTracker(client);

stats.statTracker(client);

sR20.sr20(client);
