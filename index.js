const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.argv[2]);

client.on('ready', loggedIn);

function loggedIn() {
	console.log('Logged in and ready to go');
}

