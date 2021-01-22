const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

//logging in the bot
client.login(config.token);

client.on('ready', loggedIn);

//making sure we are logged in
function loggedIn() {
	console.log('Logged in and ready to go');
}

client.on('message', message => {
	msg = message.content
	let name = message.author.username

	//dice roller
	if (msg.includes('!roll')) {
		let inpt = msg.split('d');
		let roll = inpt[1];
		if (roll.includes('+')) {
			let die = parseInt(roll.split('+')[0]);
			let mod = parseInt(roll.split('+')[1]);

			let dieRoll = Math.floor(Math.random() * die) + 1;
			console.log(dieRoll);
			dieRoll += mod;
			console.log(dieRoll);
			message.channel.send(name + 's roll: ' + dieRoll);
		}
		else if (roll.includes('-')) {
                        let die = parseInt(roll.split('-')[0]);
                        let mod = parseInt(roll.split('-')[1]);
                        
                        let dieRoll = Math.floor(Math.random() * die) + 1;
                        dieRoll -= mod;
                        
                        message.channel.send(name + 's roll: ' + dieRoll);
                }
		else {
			let die = roll;
			let dieRoll = Math.floor(Math.random() * die) + 1;
			message.channel.send(name + 's roll: ' + dieRoll);
		}
	}
});
